import {
  Sequelize,
  Model,
  DataTypes,
  Optional
} from 'sequelize';

/* user db first settings */
export interface TimeMenuAttributes {
  id: number;
  price: number;
  time: number;
}

interface TimeMenuCreationAttributes extends Optional<TimeMenuAttributes, 'id'> {}

export class TimeMenu extends Model<TimeMenuAttributes, TimeMenuCreationAttributes>
  implements TimeMenuCreationAttributes {
    public id!: number;
    public price!: number;
    public time!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initTimeMenu = (sequelize: Sequelize) => {
  TimeMenu.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    time: {
      type: DataTypes.INTEGER.UNSIGNED
    }
  }, {
    tableName: 'time_menu',
    sequelize
  });
};
