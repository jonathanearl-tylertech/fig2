import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseContext } from './db/mongoose-context';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, MongooseContext],
  exports: [ProfileService],
})
export class ProfileModule {}
