import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { StorageModule } from 'src/services/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
