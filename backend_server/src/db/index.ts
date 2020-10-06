import { Op, Sequelize } from 'sequelize';
import { initUser } from './models/user';
import { initPcProvider, initPcProviderAssociate } from './models/pc_provider';
import { initPc, initPcAssociate, Pc } from './models/pc';
import { initPPAuthToken, initPPAuthTokenAssociate, PPAuthToken } from './models/pp_authtoken';
import { initUsePc, initUsePcAssociate } from './models/use_pc';
import { initPaymentHistory, initPaymentHistoryAssociate } from './models/payment_history';
import { initSubscriptionMenu } from './models/subscription_menu';

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
    initPcProvider(sequelize);
    initPc(sequelize);
    initPPAuthToken(sequelize);
    initUsePc(sequelize);
    initPaymentHistory(sequelize);
    initSubscriptionMenu(sequelize);

    initPcAssociate();
    initPcProviderAssociate();
    initPPAuthTokenAssociate();
    initUsePcAssociate();
    initPaymentHistoryAssociate();
    await sequelize.sync();

    await PPAuthToken.destroy({
      where: {
        createdAt: {
          [Op.lte]: new Date(new Date().getTime() - 1000 * 60 * 5)
        }
      } as any
    })
    await Pc.update({
      state: 'unusable'
    }, {
      where: {}
    });
    debug('Connection has been established successfully.');
  } catch (error) {
    debug('Unable to connect to the database:', error);
  }
};

export default sequelize;
