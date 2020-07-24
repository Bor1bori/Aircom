import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const privateKey = "mypassword";
const aesKey = crypto.randomBytes(32);
const iv = 'mypchefmypchefqq'; // initialization vector for AES

// jwt functions

/**
 * @description make jwt
 * @param obj object to sign
 * @param expiresIn after 'expiresIn(ms)' token expired
 */
export const jwtSign = (obj: any, expiresIn: number): string => {
  return jwt.sign(obj, privateKey, {expiresIn});
};

/**
 * @description token
 * @param token decode하고 verify할 token 
 * @return decoded token
 * @throws Error e.message = 'token expired' when token is expired
 * @throws Error e.message = 'invalid jwt' when token is invalid
 */
export const jwtVerify = (token: string): string | any => {
  try {
    return jwt.verify(token, privateKey);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new Error('token expired');
    } else if (err.name === 'JsonWebTokenError') {
      throw new Error('invalid jwt');
    }
  }
};

// crypt functions
export const hash = (plainText: string): string  => {
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