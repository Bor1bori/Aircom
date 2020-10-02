import {
  Sequelize,
  Model,
  DataTypes,
  Optional
} from 'sequelize';

/* user db first settings */
export interface SubMenuAttributes {
  id: number;
  name: string;
  price: number;
  monthlyUsableTime: number;
}

interface SubMenuCreationAttributes extends Optional<SubMenuAttributes, 'id'> {}

export class SubMenu extends Model<SubMenuAttributes, SubMenuCreationAttributes>
  implements SubMenuCreationAttributes {
    public id!: number;
    public name!: string;
    public price!: number;
    public monthlyUsableTime!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initSubMenu = (sequelize: Sequelize) => {
  SubMenu.init({
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
    tableName: 'sub_menu',
    sequelize
  });
};
