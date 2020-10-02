import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  BelongsToGetAssociationMixin
} from 'sequelize';
import { User } from './user';
import { SubMenu } from './sub_menu';
import { TimeMenu } from './time_menu';

/* user db first settings */
export interface PaymentHistoryAttributes {
  id: number;
  userId: number;
  menuType: string;
  timeMenuId?: number;
  subMenuId?: number;
}

interface PaymentHistoryCreationAttributes extends Optional<PaymentHistoryAttributes, 'id'> {}

export class PaymentHistory extends Model<PaymentHistoryAttributes, PaymentHistoryCreationAttributes>
  implements PaymentHistoryCreationAttributes {
    public id!: number;
    public userId!: number;
    public menuType!: string;
    public timeMenuId?: number;
    public subMenuId?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: BelongsToGetAssociationMixin<User>
    public getTimeMenu!: BelongsToGetAssociationMixin<TimeMenu>
    public getSubMenu!: BelongsToGetAssociationMixin<SubMenu>
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
    menuType: {
      type: DataTypes.ENUM('time', 'subscription')
    },
    timeMenuId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    subMenuId: {
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
  PaymentHistory.belongsTo(TimeMenu, {
    foreignKey: 'timeMenuId',
    onDelete: 'CASCADE'
  });
  PaymentHistory.belongsTo(SubMenu, {
    foreignKey: 'subMenuId',
    onDelete: 'CASCADE'
  });
};
