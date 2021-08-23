import { Module } from '@nestjs/common';
import { OktaService } from './services/okta.service';

@Module({
  providers: [OktaService],
  exports: [OktaService]
})
export class OktaModule {}
