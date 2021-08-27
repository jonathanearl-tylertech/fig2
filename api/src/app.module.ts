import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserMiddleware } from './middleware/user.middleware';
import { OktaService } from 'src/services/okta.service';
import { ProfileModule } from './profile/profile.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  providers: [OktaService],
  imports: [ProfileModule, RegistrationModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('*');
  }
}