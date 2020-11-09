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
import { Pc } from './pc';

/* user db first settings */
export interface PcProviderAttributes {
  id: number;
  email?: string;
  password?: string;
  birthdate?: Date
  gender?: string;
  signinType: 'email' | 'googleoauth';
  signinId?: string;
}

interface PcProviderCreationAttributes extends Optional<PcProviderAttributes, 'id'> {}

export class PcProvider extends Model<PcProviderAttributes, PcProviderCreationAttributes>
  implements PcProviderAttributes {
  public id!: number;
  public email?: string;
  public password?: string;
  public birthdate?: Date;
  public gender?: string;
  public signinType!: 'email' | 'googleoauth';
  public signinId?: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getPcs!: HasManyGetAssociationsMixin<Pc>; // Note the null assertions!
  public addPcs!: HasManyAddAssociationMixin<Pc, number>;
  public hasPcs!: HasManyHasAssociationMixin<Pc, number>;
  public countPcs!: HasManyCountAssociationsMixin;
  public createPcs!: HasManyCreateAssociationMixin<Pc>;

  public readonly pcs?: Pc[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    pcs: Association<PcProvider, Pc>;
  };
}

export const initPcProvider = (sequelize: Sequelize) => {
  PcProvider.init({
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
    }
  }, {
    tableName: 'pc_provider',
    sequelize
  });

  const queryInterface = sequelize.getQueryInterface();
  queryInterface.addConstraint('pc_provider', {
    fields: ['signinType', 'signinId'],
    type: 'unique'
  });
};

export const initPcProviderAssociate = () => {
  PcProvider.hasMany(Pc, {
    sourceKey: 'id',
    foreignKey: 'pcProviderId',
    as: 'pcs' // this determines the name in `associations`!
  });
};
