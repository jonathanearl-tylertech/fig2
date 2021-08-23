import { Test, TestingModule } from '@nestjs/testing';
import { OktaService } from './okta.service';

describe('OktaService', () => {
  let service: OktaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OktaService],
    }).compile();

    service = module.get<OktaService>(OktaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
