import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const privateKey = 'mypassword';
const aesKey = crypto.randomBytes(32);
const iv = 'mypchefmypchefqq'; // initialization vector for AES

// jwt functions

/**
 * @description make jwt
 * @param obj object to sign
 * @param expiresIn after 'expiresIn(ms)' token expired
 */
export const jwtSign = (obj: any, expiresIn: number): string => {
  return jwt.sign(obj, privateKey, { expiresIn });
};

/**
 * @description token
 * @param token decode하고 verify할 token
 * @returns decoded token
 * @returns -1 'token expired' when token is expired
 * @returns -2 'invalid jwt' when token is invalid
 */
export const jwtVerify = (token: string): string | any => {
  try {
    return jwt.verify(token, privateKey);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return -1;
    } else if (err.name === 'JsonWebTokenError') {
      return -1;
    }
  }
};

// crypt functions
export const hash = (plainText: string): string => {
  return crypto.createHash('sha512').update(plainText).digest('base64');
};

export const aesEncrypt = (plainText: string) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
  let result = cipher.update(plainText, 'utf8', 'base64');
  result += cipher.final('base64');

  return result;
};

export const aesDecrypt = (encryptedText: string) => {
  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    let result = decipher.update(encryptedText, 'base64', 'utf8');
    result += decipher.final('utf8');

    return result;
  } catch (err) {
    return null;
  }
};

export const getRandomAlphNum = (size: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
