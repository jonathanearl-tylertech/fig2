import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { StorageModule } from 'src/services/storage/storage.module';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [StorageModule, ProfileModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
