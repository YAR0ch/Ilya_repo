import { FilesModule } from './fileshandler/fileshandler.module';
import { StatisticsModule } from './statistics/statistics.module';
import { AllWordsModule } from './all-words/all-words.module';
import { dataSourceOptions } from './ormconfig';
import {
  Module,
  OnApplicationBootstrap,
  MiddlewareConsumer,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { WordsModule } from './userWords/userWords.module';
import { AllWordService } from './all-words/all-words.service';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddlewareModule } from './middleware/JwtMiddleware/jwt.middleware.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'files'),
    //   exclude: ['*'],
    //   serveStaticOptions: {
    //     index: false,
    //     redirect: false,
    //   },
    // }),
    TypeOrmModule.forRoot(dataSourceOptions),
    FilesModule,
    AuthModule,
    UserModule,
    SettingsModule,
    StatisticsModule,
    WordsModule,
    AllWordsModule,
    JwtMiddlewareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private wordService: AllWordService) {}

  async onApplicationBootstrap() {
    await this.wordService.seedData();
    console.log('Data seeding complete');
  }
}
