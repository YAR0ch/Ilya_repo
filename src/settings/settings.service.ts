import { CreateSettingsDto } from './dto/createSettingsDto';
import { SettingsEntity } from './entities/settings.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSettings } from 'src/types/user';
import { UpdateSettingsDto } from './dto/updateSettingsDto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>,
  ) {}

  async createSettings(id: string): Promise<UserSettings> {
    const newSettings = {
      userId: id,
    };
    const createdSettings = await this.settingsRepository.create(newSettings);
    return await this.settingsRepository.save(createdSettings);
  }

  async updateSettings(
    body: UpdateSettingsDto,
    id: string,
  ): Promise<UserSettings> {
    const userSettings = await this.settingsRepository.findOne({
      where: { userId: id },
    });

    if (!userSettings) {
      throw new HttpException(
        {
          error: 'Cant find user with settings',
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const newSettings = {
      soundVolume: body.soundVolume
        ? body.soundVolume
        : userSettings.soundVolume,
      musicVolume: body.musicVolume
        ? body.musicVolume
        : userSettings.musicVolume,
      wordVolume: body.wordVolume ? body.wordVolume : userSettings.wordVolume,
      difficultWord:
        body.difficultWord === null
          ? userSettings.difficultWord
          : body.difficultWord,
      deleteWord:
        body.deleteWord === null ? userSettings.deleteWord : body.deleteWord,
      translateWord:
        body.translateWord === null
          ? userSettings.translateWord
          : body.translateWord,
      translateSentences:
        body.translateSentences === null
          ? userSettings.translateSentences
          : body.translateSentences,
      theme: body.theme ? body.theme : userSettings.theme,
    };

    return await this.settingsRepository.save(newSettings);
  }
}
