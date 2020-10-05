import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BelongsToGetAssociationMixin
} from 'sequelize';
import { SubscriptionMenu } from './subscription_menu';
import { User } from './user';

/* user db first settings */
export interface SubscribeAttributes {
  id: number;
  userId: number;
  subscripionMenuId: number;

  startDate: Date;
  endDate?: Date;
}

interface SubscribeCreationAttributes extends Optional<Optional<SubscribeAttributes, 'id'>, 'startDate'> {}

export class Subscribe extends Model<SubscribeAttributes, SubscribeCreationAttributes>
  implements SubscribeCreationAttributes {
    public id!: number;
    public userId!: number;
    public subscripionMenuId!: number;

    public startDate!: Date;
    public endDate?: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getSubscriptionMenu!: BelongsToGetAssociationMixin<SubscriptionMenu>
    public getUser!: BelongsToGetAssociationMixin<User>
}

export const initSubscribe = (sequelize: Sequelize) => {
  Subscribe.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    subscripionMenuId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'subscribe',
    sequelize
  });
};

export const initSubscribeAssociate = () => {
  Subscribe.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  Subscribe.belongsTo(SubscriptionMenu, {
    foreignKey: 'subscripionMenuId',
    onDelete: 'CASCADE'
  });
};
