const dotenv = require('dotenv');
const path = require('path');

let configResult;

const fileMatch = {
  local: 'local',
  production: 'prod',
  development: 'develop',
  test: 'test'
};

switch (process.env.NODE_ENV) {
  case 'local':
    configResult = dotenv.config({ path: path.join(__dirname, '.env.local') });
    break;
  case 'production':
    configResult = dotenv.config({ path: path.join(__dirname, '.env.prod') });
    break;
  case 'development':
    configResult = dotenv.config({ path: path.join(__dirname, '.env.develop') });
    break;
  case 'test':
    configResult = dotenv.config({ path: path.join(__dirname, '.env.test') });
    break;
  default:
    throw new Error('process.env.NODE_ENV not set');
}
if (configResult.error) {
  const message = `.env.${fileMatch[process.env.NODE_ENV]} not exists`;
  throw new Error(message);
}
