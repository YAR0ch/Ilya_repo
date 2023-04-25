import { RefreshTokenDto } from './dto/RefreshTokenDto';
import { loginDto } from './dto/loginDto';
import { AuthService } from './auth.service';
import { createUserDto } from '../user/dto/createUserDto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  async singUp(@Body() body: createUserDto) {
    return await this.authService.signUp(body);
  }
  @Post('/signin')
  async signIn(@Body() body: loginDto) {
    return await this.authService.signIn(body);
  }
  @Post('/refresh')
  async refresh(@Body() body: RefreshTokenDto) {
    return await this.authService.refresh(body);
  }
}
