import { registerAs } from "@nestjs/config";

export const S3StorageConfig = registerAs('S3Storage', () => ({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION ? process.env.S3_REGION : undefined,
}));