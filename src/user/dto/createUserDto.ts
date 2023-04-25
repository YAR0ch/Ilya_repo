import { IsEmail, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  name?: string;
}
