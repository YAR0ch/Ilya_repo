import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name?: string;
  @IsString()
  password?: string; //можно сделать обновление отдельно
  @IsString()
  avatarUrl?: string;
  @IsString()
  email?: string;
}
