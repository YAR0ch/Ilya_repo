import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { WordEntity } from './entities/word.entity';
import * as path from 'path';

@Injectable()
export class AllWordService {
  constructor(
    @InjectRepository(WordEntity)
    private wordRepository: Repository<WordEntity>,
  ) {}

  async seedData(): Promise<void> {
    const jsonData = fs.readFileSync(path.resolve('src', 'allWords.json'));
    const data = JSON.parse(jsonData.toString());

    for (const item of data) {
      const word = new WordEntity();
      word.group = item.group;
      word.page = item.page;
      word.word = item.word;
      word.image = item.image;
      word.audio = item.audio;
      word.audioMeaning = item.audioMeaning;
      word.audioExample = item.audioExample;
      word.textMeaning = item.textMeaning;
      word.textExample = item.textExample;
      word.transcription = item.transcription;
      word.textExampleTranslate = item.textExampleTranslate;
      word.textMeaningTranslate = item.textMeaningTranslate;
      word.wordTranslate = item.wordTranslate;

      await this.wordRepository.save(word);
    }
  }

  async getAllWords(page: number, group: number) {
    try{
      const allWords = await this.wordRepository.find({
        where: {
          page,
          group,
        },
      });
      return allWords;
    }catch(error){
      throw new HttpException(
        {
          error: 'Get all words err',
          status: HttpStatus.NOT_FOUND
        }, HttpStatus.NOT_FOUND
      )
    }
  }
}
