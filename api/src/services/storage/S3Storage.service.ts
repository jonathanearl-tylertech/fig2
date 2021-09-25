import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import AWS from 'aws-sdk';
import { S3StorageConfig } from './S3StorageConfig';
import { IStorage } from './storage.interface';

@Injectable()
export class S3StorageService implements IStorage {
  private S3: AWS.S3;

  constructor(
    @Inject(S3StorageConfig.KEY)
    private s3StorageConfig: ConfigType<typeof S3StorageConfig>,
  ) {
    console.log(s3StorageConfig)
    this.S3 = new AWS.S3({
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
      ...this.s3StorageConfig,
    });
  }

  createBucket(bucketName: string) {
    const params: AWS.S3.CreateBucketRequest = {
      Bucket: bucketName,
      ACL: 'public-read',
    }

    return new Promise<void>((resolve, reject) => {
      this.S3.createBucket(params, (err, data) => {
        if (err && err.code === 'BucketAlreadyOwnedByYou')
          return;
      
        if (err)
          reject(err);
        
        resolve();
      });
    });
  }

  getSignedUrl(bucketName: string, key: string) {
    return new Promise<string>((resolve, reject) => {
      this.S3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: key
      }, (err, url) => {
        if (err) {
          return reject(err);
        }
        return resolve(url);
      });
    });
  }
}