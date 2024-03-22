import crypto from 'crypto';

export function getEnv() {
  const env = (process.env.ENVIRONMENT as string) || 'DEV';
  return env.toUpperCase();
}

export function aesDecrypt(
  key: string,
  iv: string,
  base64String: string,
  encryptionType: string = 'aes-256-cbc',
): string {
  if (
    base64String === null ||
    typeof base64String === 'undefined' ||
    base64String === ''
  )
    return base64String;

  try {
    const decipher = crypto.createDecipheriv(encryptionType, key, iv);
    const decrypted = decipher.update(base64String, 'base64', 'utf-8');
    return decrypted + decipher.final('utf-8');
  } catch (e) {
    console.error('error on hash decryption', base64String, e);
  }
  return base64String;
}

export function aesEncrypt(
  key: string,
  iv: string,
  base64String: string,
  encryptionType: string = 'aes-256-cbc',
): string {
  if (
    base64String === null ||
    typeof base64String === 'undefined' ||
    base64String === ''
  )
    return base64String;

  try {
    const cipher = crypto.createCipheriv(encryptionType, key, iv);
    let encrypted = cipher.update(base64String, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  } catch (e) {
    console.error('error on hash encryption', base64String, e);
  }
  return base64String;
}

export async function exponentialRetryOperation<T>(
  operation: () => Promise<T>,
  options: any = {},
): Promise<T> {
  const { maxRetries = 3, retryDelay = 5000 } = options;

  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await operation();
    } catch (e) {
      console.error(`error connecting client, retrying..`, e);
      retries++;
      if (retries < maxRetries) {
        /* exponential backoff retry method
         * https://en.wikipedia.org/wiki/Exponential_backoff */
        const currentRetryDelay = retries ? 0 : retryDelay ?? 100;
        const delay =
          currentRetryDelay + ((Math.pow(2, retries) - 1) / 2) * 1000;

        console.log(`Waiting ${delay / 1000} seconds before retrying...`);
        await new Promise(resolve => {
          setTimeout(resolve, delay);
        });
      }
    }
  }

  throw new Error('client max retries reached...');
}
