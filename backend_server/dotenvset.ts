import dotenv from 'dotenv';
import path from 'path'

let configResult;
switch (process.env.NODE_ENV) {
  case 'prod':
    configResult = dotenv.config({ path: path.join(__dirname, '.env.prod') });
    break;
  case 'develop':
    configResult = dotenv.config({ path: path.join(__dirname, '.env.develop') });
    break
  case 'test':
    configResult = dotenv.config({ path: path.join(__dirname, '.env.test') });
    break
  default:
    throw new Error('process.env.NODE_ENV not set')
    break;    
}
if (configResult.error) {
  throw new Error(`.env.${process.env.NODE_ENV} not exists`)
}