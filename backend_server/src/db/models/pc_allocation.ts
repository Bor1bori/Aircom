import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BelongsToGetAssociationMixin
} from 'sequelize';
import { PC } from './pc';
import { User } from './user';

/* user db first settings */
export interface PCAllocationAttributes {
  id: number;
  userId: number;
  pcUuid: string;
  startTime: Date;
  endTime?: Date;
}

interface PCAllocationCreationAttributes extends Optional<Optional<PCAllocationAttributes, 'id'>, 'startTime'> {}

export class PCAllocation extends Model<PCAllocationAttributes, PCAllocationCreationAttributes>
  implements PCAllocationCreationAttributes {
    public id!: number;
    public userId!: number;
    public pcUuid!: string;
    public startTime!: Date;
    public endTime?: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getPC!: BelongsToGetAssociationMixin<PC>
    public getUser!: BelongsToGetAssociationMixin<User>
}

export const initPCAllocation = (sequelize: Sequelize) => {
  PCAllocation.init({
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
    tableName: 'pc_allocation',
    sequelize
  });
};

export const initPCAllocationAssociate = () => {
  PCAllocation.belongsTo(User, {
    foreignKey: 'userId'
  });
  PCAllocation.belongsTo(PC, {
    foreignKey: 'pcUuid'
  });
};
