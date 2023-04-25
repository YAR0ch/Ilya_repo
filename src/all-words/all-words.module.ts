import { AllWordsController } from './all-words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AllWordService } from './all-words.service';
import { WordEntity } from './entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WordEntity])],
  controllers: [AllWordsController],
  providers: [AllWordService],
  exports: [AllWordService],
})
export class AllWordsModule {}
