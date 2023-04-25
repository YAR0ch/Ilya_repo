import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Енотик' })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    default:
      'http://res.cloudinary.com/nazdac/image/upload/v1616652013/travelAppFolder/dmlfcuvyr79gpkbgg639.jpg',
  })
  avatarUrl: string;

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  toResponseObject() {
    const { name, email } = this;
    return { name, email };
  }
}

export default UserEntity;
