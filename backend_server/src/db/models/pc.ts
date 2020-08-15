import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  UUIDV4
} from 'sequelize';
import { PCProvider } from './pc_provider';

/* user db first settings */
export interface PCAttributes {
  uuid: string;
  pcProviderId: number;
  ip: string;
  port?: number;
  state: 'inUse' | 'usable' | 'unusable';
}

interface PCCreationAttributes extends Optional<PCAttributes, 'uuid'> {}

export class PC extends Model<PCAttributes, PCCreationAttributes>
  implements PCCreationAttributes {
  public uuid!: string;
  public pcProviderId!: number;
  public ip!: string;
  public port?: number;
  public state!: 'inUse' | 'usable' | 'unusable';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initPC = (sequelize: Sequelize) => {
  PC.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    pcProviderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    port: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    state: {
      type: DataTypes.ENUM('inUse', 'usable', 'unusable'),
      allowNull: false
    }
  }, {
    tableName: 'pc',
    sequelize
  });
};

export const initPCAssociate = () => {
  PC.belongsTo(PCProvider, {
    foreignKey: 'pcProviderId'
  });
};
