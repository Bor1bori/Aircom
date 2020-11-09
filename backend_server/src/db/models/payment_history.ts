import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BelongsToGetAssociationMixin
} from 'sequelize';
import { User } from './user';
import { SubscriptionMenu } from './subscription_menu';

/* user db first settings */
export interface PaymentHistoryAttributes {
  id: number;
  userId: number;
  subscriptionMenuId?: number;
  hours?: number;
}

interface PaymentHistoryCreationAttributes extends Optional<PaymentHistoryAttributes, 'id'> {}

export class PaymentHistory extends Model<PaymentHistoryAttributes, PaymentHistoryCreationAttributes>
  implements PaymentHistoryCreationAttributes {
    public id!: number;
    public userId!: number;
    public subscriptionMenuId?: number;
    public hours?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: BelongsToGetAssociationMixin<User>
    public getSubscriptionMenu!: BelongsToGetAssociationMixin<SubscriptionMenu>
}

export const initPaymentHistory = (sequelize: Sequelize) => {
  PaymentHistory.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    subscriptionMenuId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    hours: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'payment_history',
    sequelize
  });
};

export const initPaymentHistoryAssociate = () => {
  PaymentHistory.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  PaymentHistory.belongsTo(SubscriptionMenu, {
    foreignKey: 'subscriptionMenuId',
    onDelete: 'CASCADE'
  });
};
