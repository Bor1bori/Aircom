import {
  Sequelize,
  Model,
  DataTypes,
  Optional
} from 'sequelize';

/* user db first settings */
export interface SubscriptionMenuAttributes {
  id: number;
  name: string;
  price: number;
  monthlyUsableTime: number;
}

interface SubscriptionMenuCreationAttributes extends Optional<SubscriptionMenuAttributes, 'id'> {}

export class SubscriptionMenu extends Model<SubscriptionMenuAttributes, SubscriptionMenuCreationAttributes>
  implements SubscriptionMenuCreationAttributes {
    public id!: number;
    public name!: string;
    public price!: number;
    public monthlyUsableTime!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initSubscriptionMenu = (sequelize: Sequelize) => {
  SubscriptionMenu.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    monthlyUsableTime: {
      type: DataTypes.INTEGER.UNSIGNED
    }
  }, {
    tableName: 'subscription_menu',
    sequelize
  });
};
