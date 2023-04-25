import { createUserWordDto } from './dto/createUserWordDto';
import { createUserDto } from './../user/dto/createUserDto';
import { WordsEntity } from './entities/words.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordsEntity)
    private readonly wordsRepository: Repository<WordsEntity>,
  ) {}

  async createUserWord(word: createUserWordDto): Promise<void> {
    const createdWord = this.wordsRepository.create(word);

    await this.wordsRepository.save(createdWord);
  }
}
