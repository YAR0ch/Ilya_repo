import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statistics')
export class StatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  gameName: string;

  @Column()
  totalWords: number;

  @Column()
  correctPercent: number;

  @Column()
  longestSeries: number;

  @Column()
  date: string;
}
