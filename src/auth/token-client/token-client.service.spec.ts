import { Test, TestingModule } from '@nestjs/testing';
import { TokenClientService } from './token-client.service';

describe('TokenClientService', () => {
  let service: TokenClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenClientService],
    }).compile();

    service = module.get<TokenClientService>(TokenClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
