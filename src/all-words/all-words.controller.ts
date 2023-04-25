import { UserWords } from './../types/user';
import { AllWordService } from './all-words.service';
import {
  Body,
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { query } from 'express';

@Controller('words')
export class AllWordsController {
  constructor(private readonly allWordsService: AllWordService) {}

  @Get()
  async getAllWords(
    @Query('page') page: number,
    @Query('group') group: number,
  ) {
    if (page >= 0 && group >= 0) {
      return this.allWordsService.getAllWords(page, group);
    } else {
      throw new HttpException(
        {
          error: 'Enter page and group correct',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
