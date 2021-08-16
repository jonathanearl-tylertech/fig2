export default function (key: string): string {
  const envVar = process.env[key];
  if(envVar === undefined) {
    throw new Error(`[db.ts] Required config is undefined key: ${key}`)
  }
  return envVar;
}