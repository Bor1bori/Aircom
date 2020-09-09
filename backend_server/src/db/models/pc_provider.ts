import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin
} from 'sequelize';
import { PC } from './pc';

/* user db first settings */
export interface PCProviderAttributes {
  id: number;
  email?: string;
  password?: string;
  birthdate?: Date
  gender?: string;
  signinType: 'email' | 'googleoauth';
  signinID?: string;
}

interface PCProviderCreationAttributes extends Optional<PCProviderAttributes, 'id'> {}

export class PCProvider extends Model<PCProviderAttributes, PCProviderCreationAttributes>
  implements PCProviderAttributes {
  public id!: number;
  public email?: string;
  public password?: string;
  public birthdate?: Date;
  public gender?: string;
  public signinType!: 'email' | 'googleoauth';
  public signinID?: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getPcs!: HasManyGetAssociationsMixin<PC>; // Note the null assertions!
  public addPcs!: HasManyAddAssociationMixin<PC, number>;
  public hasPcs!: HasManyHasAssociationMixin<PC, number>;
  public countPcs!: HasManyCountAssociationsMixin;
  public createPcs!: HasManyCreateAssociationMixin<PC>;

  public readonly pcs?: PC[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    pcs: Association<PCProvider, PC>;
  };
}

export const initPCProvider = (sequelize: Sequelize) => {
  PCProvider.init({
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
    signinID: { // TODO: 이거 인덱싱해서 빨리 찾을 수 있도록 하면 좋을듯
      type: DataTypes.STRING(),
      allowNull: true
    }
  }, {
    tableName: 'pc_provider',
    sequelize
  });

  const queryInterface = sequelize.getQueryInterface();
  queryInterface.addConstraint('pc_provider', {
    fields: ['signinType', 'signinID'],
    type: 'unique'
  });
};

export const initPCProviderAssociate = () => {
  PCProvider.hasMany(PC, {
    sourceKey: 'id',
    foreignKey: 'pcProviderId',
    as: 'pcs' // this determines the name in `associations`!
  });
};
