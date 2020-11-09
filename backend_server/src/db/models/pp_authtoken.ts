import {
  Sequelize,
  Model,
  DataTypes
} from 'sequelize';
import { PcProvider } from './pc_provider';

/* user db first settings */
export interface PPAuthTokenAttributes {
  authToken: string;
  pcProviderId: number;
}

interface PPAuthTokeCreationAttributes extends PPAuthTokenAttributes {}

export class PPAuthToken extends Model<PPAuthTokenAttributes, PPAuthTokeCreationAttributes>
  implements PPAuthTokeCreationAttributes {
  public authToken!: string;
  public pcProviderId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initPPAuthToken = (sequelize: Sequelize) => {
  PPAuthToken.init({
    authToken: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    pcProviderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'pp_authtoken',
    sequelize
  });
};

export const initPPAuthTokenAssociate = () => {
  PPAuthToken.belongsTo(PcProvider, {
    foreignKey: 'pcProviderId'
  });
};
