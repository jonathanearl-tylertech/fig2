import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3StorageService } from './S3Storage.service';
import { S3StorageConfig } from './S3StorageConfig';

@Module({
  imports: [ConfigModule.forFeature(S3StorageConfig)],
  providers: [S3StorageService],
  exports: [S3StorageService],
})
export class StorageModule {}
