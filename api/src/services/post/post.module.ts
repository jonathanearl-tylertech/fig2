import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { StorageModule } from 'src/services/storage/storage.module';

@Module({
  exports: [PostService],
  imports: [StorageModule],
  providers: [PostService],
})
export class PostModule {}
