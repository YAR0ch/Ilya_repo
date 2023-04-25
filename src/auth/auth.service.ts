import { loginDto } from './dto/loginDto';
import { SettingsService } from './../settings/settings.service';
import { UserService } from './../user/user.service';
import { createUserDto } from '../user/dto/createUserDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/RefreshTokenDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly settingsService: SettingsService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(body: createUserDto): Promise<any> {
    const createdUser = await this.userService.createUser(body);
    const user = await this.userService.getUser(createdUser.email);
    this.settingsService.createSettings(user.id);
    return user.toResponseObject();
  }

  async signIn(body: loginDto) {
    const user = await this.userService.getUser(body.email);
    if (!user.validatePassword(body.password)) {
      throw new HttpException(
        {
          error: 'Password is not correct',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
      }),
      avatarURL: user.avatarUrl,
      name: user.name
    };
  }

  async refresh(dto: RefreshTokenDto) {
    if (!dto.refreshToken) {
      throw new HttpException(
        'refreshToken should not be empty',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const { sub: id, email: email } = await this.jwtService.verifyAsync(
        dto.refreshToken,
      );

      const accessToken = await this.jwtService.signAsync(
        { sub: id, login: email },
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
        },
      );
      const refreshToken = await this.jwtService.signAsync(
        { sub: id, login: email },
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
        },
      );
      return { accessToken, refreshToken };
    } catch (error) {
      if (
        error.name === 'TokenExpiredError' ||
        error.name === 'JsonWebTokenError'
      ) {
        throw new HttpException('Invalid refresh token', HttpStatus.FORBIDDEN);
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
