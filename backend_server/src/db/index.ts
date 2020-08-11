import { Sequelize } from 'sequelize';
import { initUser } from './models/user';
import { initPCProvider, initPCProviderAssociate } from './models/pc_provider';
import { initPC, initPCAssociate } from './models/pc';
import { initPPAuthToken, initPPAuthTokenAssociate } from './models/pp_authtoken';
import createDebug from 'debug';

const debug = createDebug('app');

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'mariadb'
};

const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  dialect: config.dialect as 'mariadb'
});

export const sequelizeInit = async () => {
  try {
    await sequelize.authenticate();
    initUser(sequelize);
    initPCProvider(sequelize);
    initPC(sequelize);
    initPPAuthToken(sequelize);

    initPCAssociate();
    initPCProviderAssociate();
    initPPAuthTokenAssociate();
    await sequelize.sync();
    debug('Connection has been established successfully.');
  } catch (error) {
    debug('Unable to connect to the database:', error);
  }
};

export default sequelize;
