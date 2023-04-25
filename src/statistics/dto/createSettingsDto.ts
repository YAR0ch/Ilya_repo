import { IsNumber, IsString } from 'class-validator';

export class CreateStatisticsDto {
  @IsString()
  userId: string;

  @IsString()
  gameName: string;

  @IsNumber()
  totalWords: number;

  @IsNumber()
  correctPercent: number;

  @IsNumber()
  longestSeries: number;

  @IsString()
  date: string;
}
