import { createUserWordDto } from './dto/createUserWordDto';
import { Body, Controller, Post } from '@nestjs/common';
import { WordsService } from './userWords.service';

@Controller('userWords')
export class UserWordsController {
  constructor(private readonly userWordsService: WordsService) {}

  @Post()
  createUserWord(@Body() body: createUserWordDto) {
    return this.userWordsService.createUserWord(body);
  }
}
