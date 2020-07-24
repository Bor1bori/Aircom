import { Sequelize } from 'sequelize';
import createDebug from 'debug';

const debug = createDebug('app')

const config = {
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "host": process.env.DB_HOST,
  "dialect": 'mariadb',
}

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
    debug('Connection has been established successfully.');
  } catch (error) {
    debug('Unable to connect to the database:', error);
  }
}

export default sequelize;
