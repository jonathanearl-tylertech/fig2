import { Module } from '@nestjs/common';
import { ProfileService } from './services/profile/profile.service';
import { ProfileController } from './profile.controller';
import { MongooseContext } from './services//mongoose-context/mongoose-context';
import { OktaModule } from 'src/okta/okta.module';

@Module({
  imports: [OktaModule],
  controllers: [ProfileController],
  providers: [ProfileService, MongooseContext],
  exports: [ProfileService]
})
export class ProfileModule {}
