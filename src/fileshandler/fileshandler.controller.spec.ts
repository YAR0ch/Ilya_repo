import { Test, TestingModule } from '@nestjs/testing';
import { FileshandlerController } from './fileshandler.controller';

describe('FileshandlerController', () => {
  let controller: FileshandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileshandlerController],
    }).compile();

    controller = module.get<FileshandlerController>(FileshandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
