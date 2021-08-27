import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserMiddleware } from './middleware/user.middleware';
import { OktaService } from 'src/services/okta.service';
import { ProfileModule } from './profile/profile.module';
import { RegistrationModule } from './registration/registration.module';
import { PostModule } from './post/post.module';
import mongoose from 'mongoose';

const { MONGO_ADDRESS, MONGO_USERNAME, MONGO_PASSWORD, MONGO_TABLE } = process.env;
const connectionString = `mongodb://${MONGO_ADDRESS}/${MONGO_TABLE}`;

console.log('[db] connecting to:', connectionString)
mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    auth: {
      user: MONGO_USERNAME,
      password: MONGO_PASSWORD
    }
  }
)

@Module({
  providers: [OktaService],
  imports: [ProfileModule, RegistrationModule, PostModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes('*');
  }
}