import { Test, TestingModule } from '@nestjs/testing';
import { MongooseContext } from './mongoose-context';

describe('Mongoose', () => {
  let provider: MongooseContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseContext],
    }).compile();

    provider = module.get<MongooseContext>(MongooseContext);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
