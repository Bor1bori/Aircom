import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
} from "sequelize";

/* user db first settings */
export interface UserAttributes {
  id: number;
  email?: string;
  password?: string;
  birthdate?: Date
  gender?: string;
  signinType: 'email' | 'googleoauth';
  signinID?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public email?: string;
  public password?: string;
  public birthdate?: Date;
  public gender?: string;
  public signinType!: 'email' | 'googleoauth';
  public signinID?: string;
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
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(320),
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'etc'),
      allowNull: true,
    },
    signinType: {
      type: DataTypes.ENUM('email', 'googleoauth'),
      allowNull: false,
    },
    signinID: { // TODO: 이거 인덱싱해서 빨리 찾을 수 있도록 하면 좋을듯
      type: DataTypes.STRING(),
      allowNull: true,
    }
  }, {
    tableName: 'user',
    sequelize,
  });

  const queryInterface = sequelize.getQueryInterface();
  queryInterface.addConstraint('user', {
    fields: ['signinType', 'signinID'],
    type: 'unique'
  });
}
