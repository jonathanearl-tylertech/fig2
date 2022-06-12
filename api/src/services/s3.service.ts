import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestPresigningArguments } from '@aws-sdk/types';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
  ListObjectsCommand,
  ListObjectsOutput,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private S3: S3Client;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('S3_KEY');
    const secretAccessKey = this.configService.get<string>('S3_SECRET');
    const endpoint = this.configService.get<string>('S3_ENDPOINT');
    const region = this.configService.get<string>('S3_REGION');
    if (!accessKeyId) console.warn('No S3_KEY');
    if (!secretAccessKey) console.warn('No S3_KEY');
    if (!endpoint) console.warn('No S3_ENDPOINT');
    if (!region) console.warn('No S3_REGION');
    this.S3 = new S3Client({
      region,
      forcePathStyle: true,
      credentials: { accessKeyId, secretAccessKey },
      endpoint,
    });
  }

  createPublicBucket = async (bucketName: string) => {
    try {
      const cmd = new CreateBucketCommand({
        Bucket: bucketName,
        ACL: 'public-read',
      });
      await this.S3.send(cmd);
      return true;
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        `cannot createBucket: Bucket:${bucketName}`,
      );
    }
  };

  getFileInfo = async (bucketName: string, key: string) => {
    try {
      const cmd = new ListObjectsCommand({
        Bucket: bucketName,
        Prefix: key,
        MaxKeys: 1,
      });
      const response: ListObjectsOutput = await this.S3.send(cmd);
      if (response.Contents.length == 0) return null;

      return response.Contents[0];
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        `cannot getFileInfo: Bucket:${bucketName} Key:${key}`,
      );
    }
  };

  getSignedUrl = async (bucketName: string, key: string) => {
    try {
      const cmd = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
      });
      const options: RequestPresigningArguments = {
        expiresIn: 60,
      };
      const url = await getSignedUrl(this.S3, cmd, options);
      return url;
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        `cannot getSignedUrl  Bucket:${bucketName} Key:${key}`,
      );
    }
  };
}
