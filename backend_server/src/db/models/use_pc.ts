import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BelongsToGetAssociationMixin
} from 'sequelize';
import { Pc } from './pc';
import { User } from './user';

/* user db first settings */
export interface UsePcAttributes {
  id: number;
  userId: number;
  pcUuid: string;
  startTime: Date;
  endTime?: Date;
}

interface UsePcCreationAttributes extends Optional<Optional<UsePcAttributes, 'id'>, 'startTime'> {}

export class UsePc extends Model<UsePcAttributes, UsePcCreationAttributes>
  implements UsePcCreationAttributes {
    public id!: number;
    public userId!: number;
    public pcUuid!: string;
    public startTime!: Date;
    public endTime?: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getPc!: BelongsToGetAssociationMixin<Pc>
    public getUser!: BelongsToGetAssociationMixin<User>
}

export const initUsePc = (sequelize: Sequelize) => {
  UsePc.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    pcUuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'use_pc',
    sequelize
  });
};

export const initUsePcAssociate = () => {
  UsePc.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  UsePc.belongsTo(Pc, {
    foreignKey: 'pcUuid',
    onDelete: 'CASCADE'
  });
};
