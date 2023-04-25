import { SettingsService } from './settings.service';
import { SettingsEntity } from './entities/settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([SettingsEntity])],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
