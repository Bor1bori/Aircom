import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association, BelongsToGetAssociationMixin
} from 'sequelize';
import { PCAllocation } from './pc_allocation';
import { SubMenu } from './sub_menu';

/* user db first settings */
export interface UserAttributes {
  id: number;
  email?: string;
  password?: string;
  birthdate?: Date
  gender?: string;
  signinType: 'email' | 'googleoauth';
  signinId?: string;
  subMenuId?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public email?: string;
  public password?: string;
  public birthdate?: Date;
  public gender?: string;
  public signinType!: 'email' | 'googleoauth';
  public signinId?: string;
  public subMenuId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPcAllocations!: HasManyGetAssociationsMixin<PCAllocation>; // Note the null assertions!
  public addPcAllocations!: HasManyAddAssociationMixin<PCAllocation, number>;
  public hasPcAllocations!: HasManyHasAssociationMixin<PCAllocation, number>;
  public countPcAllocations!: HasManyCountAssociationsMixin;
  public createPcAllocations!: HasManyCreateAssociationMixin<PCAllocation>;
  public getSubMenu!: BelongsToGetAssociationMixin<SubMenu>

  public readonly pcAllocations?: PCAllocation[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    pcAllocations: Association<User, PCAllocation>;
  };
}

export const initUser = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(320),
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'etc'),
      allowNull: true
    },
    signinType: {
      type: DataTypes.ENUM('email', 'googleoauth'),
      allowNull: false
    },
    signinId: { // TODO: 이거 인덱싱해서 빨리 찾을 수 있도록 하면 좋을듯
      type: DataTypes.STRING(),
      allowNull: true
    },
    subMenuId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'user',
    sequelize
  });

  const queryInterface = sequelize.getQueryInterface();
  queryInterface.addConstraint('user', {
    fields: ['signinType', 'signinId'],
    type: 'unique'
  });
};

export const initUserAssociate = () => {
  User.hasMany(PCAllocation, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'pcAllocations'
  });
  User.belongsTo(SubMenu, {
    foreignKey: 'subMenuId',
    onDelete: 'CASCADE'
  });
};
