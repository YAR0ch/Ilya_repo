export class createUserWordDto {
  userId: string;

  group: number;

  page: number;

  word: string;

  wordTranslate: string;

  transcription: string;

  image: string;

  audio: string;

  audioMeaning: string;

  audioExample: string;

  textMeaning: string;

  textMeaningTranslate: string;

  textExample: string;

  textExampleTranslate: string;

  difficult: boolean;

  deleted: boolean;

  correct: number;

  fail: number;
}
