import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('words')
export class WordEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  group: number;

  @Column()
  page: number;

  @Column()
  word: string;

  @Column()
  wordTranslate: string;

  @Column()
  transcription: string;

  @Column()
  image: string;

  @Column()
  audio: string;

  @Column()
  audioMeaning: string;

  @Column()
  audioExample: string;

  @Column()
  textMeaning: string;

  @Column()
  textMeaningTranslate: string;

  @Column()
  textExample: string;

  @Column()
  textExampleTranslate: string;

  @Column({
    default: false,
  })
  difficult: boolean;

  @Column({
    default: false,
  })
  deleted: boolean;

  @Column({
    default: 0,
  })
  correct: number;

  @Column({
    default: 0,
  })
  fail: number;
}
