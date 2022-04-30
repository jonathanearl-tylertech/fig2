import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private S3: AWS.S3;

  constructor(
    private configService: ConfigService,
  ) {
    var accessKeyId = this.configService.get<string>('S3_KEY');
    var secretAccessKey = this.configService.get<string>('S3_SECRET');
    var endpoint = this.configService.get<string>('S3_ENDPOINT');
    var region = this.configService.get<string>('S3_REGION');
    if (!accessKeyId) console.warn('No S3_KEY');
    if (!secretAccessKey) console.warn('No S3_KEY');
    if (!endpoint) console.warn('No S3_ENDPOINT');
    if (!region) console.warn('No S3_REGION');
    this.S3 = new AWS.S3({
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
      credentials: {
        accessKeyId,
        secretAccessKey
      },
      endpoint,
      region
    });
  }

  createBucket(bucketName: string) {
    const params: AWS.S3.CreateBucketRequest = {
      Bucket: bucketName,
      ACL: 'public-read',
    };

    return new Promise<void>((resolve, reject) => {
      this.S3.createBucket(params, (err) => {
        if (err && err.code === 'BucketAlreadyOwnedByYou') return;

        if (err) reject(err);
        else resolve();
      });
    });
  }

  getSignedUrl(bucketName: string, key: string) {
    return new Promise<string>((resolve, reject) => {
      this.S3.getSignedUrl(
        'putObject',
        {
          Bucket: bucketName,
          Key: key,
        },
        (err, url) => {
          if (err) {
            return reject(err);
          }
          return resolve(url);
        },
      );
    });
  }
}
