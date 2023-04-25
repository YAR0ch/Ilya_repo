import { Module } from '@nestjs/common';
import { FileshandlerController } from './fileshandler.controller';

@Module({
  imports: [],
  controllers: [FileshandlerController],
  providers: [],
})
export class FilesModule {}
