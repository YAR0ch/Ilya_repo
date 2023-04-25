import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('settings')
export class SettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column({ default: 0 })
  soundVolume: number;

  @Column({ default: 0 })
  musicVolume: number;

  @Column({ default: 50 })
  wordVolume: number;

  @Column({ default: true })
  difficultWord: boolean;

  @Column({ default: true })
  deleteWord: boolean;

  @Column({ default: true })
  translateWord: boolean;

  @Column({ default: true })
  translateSentences: boolean;

  @Column({ default: 'dark' })
  theme: string;
}
