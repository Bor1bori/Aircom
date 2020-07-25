import {
  Sequelize,
  Model,
  DataTypes,
  Optional
} from "sequelize";

/* user db first settings */
export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  birthdate: Date
  gender: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public birthdate!: Date;
  public gender!: string;
}

export const initUser = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(320),
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'etc')
    }
  }, {
    tableName: 'users',
    sequelize
  });
}
