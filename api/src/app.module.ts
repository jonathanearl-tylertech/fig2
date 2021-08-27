import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserMiddleware } from './middleware/user.middleware';
import { OktaService } from 'src/services/okta.service';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';
import { RegistrationController } from './controllers/registration.controller';
import { MongooseContext } from './services/mongoose-context';

@Module({
  controllers: [ProfileController, RegistrationController],
  providers: [ProfileService, OktaService, MongooseContext]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('*');
  }
}