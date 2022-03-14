export interface IStorage {
  createBucket(bucketName: string): Promise<void>;
  getSignedUrl(bucketName: string, key: string): Promise<string>;
}
