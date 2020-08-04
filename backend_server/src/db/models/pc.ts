import {
  Sequelize,
  Model,
  DataTypes,
  Optional
} from 'sequelize';
import { PCProvider } from './pc_provider';

/* user db first settings */
export interface PCAttributes {
  id: number;
  pcProviderId: number;
  ip: string;
  port?: number;
  state: 'inUse' | 'usable' | 'unusable';
}

interface PCCreationAttributes extends Optional<PCAttributes, 'id'> {}

export class PC extends Model<PCAttributes, PCCreationAttributes>
  implements PCCreationAttributes {
  public id!: number;
  public pcProviderId!: number;
  public ip!: string;
  public port?: number;
  public state!: 'inUse' | 'usable' | 'unusable';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initPC = (sequelize: Sequelize) => {
  PC.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
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
