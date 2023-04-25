export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
}

export interface UserResponse {
  name: string;
  email: string;
}

export interface UserSignResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  message: string;
  token: string;
  refreshToken: string;
}

export interface UserLoginResponse {
  token: string;
  refreshToken: string;
  message: string;
}

export interface UserSettings {
  soundVolume: number;
  musicVolume: number;
  wordVolume: number;
  difficultWord: boolean;
  deleteWord: boolean;
  translateWord: boolean;
  translateSentences: boolean;
  theme: string;
}

export interface UserStatistic {
  gameName: string;
  totalWords: number;
  correctPercent: number;
  longestSeries: number;
  date: string;
}

export interface UserWords {
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
