import { Test, TestingModule } from '@nestjs/testing';
import { AllWordService } from './all-words.service';

describe('AllWordsService', () => {
  let service: AllWordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllWordService],
    }).compile();

    service = module.get<AllWordService>(AllWordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
