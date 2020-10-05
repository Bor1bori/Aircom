import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  UUIDV4,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association, BelongsToGetAssociationMixin
} from 'sequelize';
import { PcProvider } from './pc_provider';
import { UsePc } from './use_pc';

/* user db first settings */
export interface PcAttributes {
  uuid: string;
  pcProviderId: number;
  state: 'inUse' | 'usable' | 'unusable';
  ip: string;
  port1: number;
  port2: number;
  port3: number;
  port4: number;
  port5: number;
  port6: number;
  port7: number;
}

interface PcCreationAttributes extends Optional<PcAttributes, 'uuid'> {}

export class Pc extends Model<PcAttributes, PcCreationAttributes>
  implements PcCreationAttributes {
  public uuid!: string;
  public pcProviderId!: number;
  public state!: 'inUse' | 'usable' | 'unusable';
  public ip!: string;
  public port1!: number;
  public port2!: number;
  public port3!: number;
  public port4!: number;
  public port5!: number;
  public port6!: number;
  public port7!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUsePcs!: HasManyGetAssociationsMixin<UsePc>; // Note the null assertions!
  public addUsePcs!: HasManyAddAssociationMixin<UsePc, number>;
  public hasUsePcs!: HasManyHasAssociationMixin<UsePc, number>;
  public countUsePcs!: HasManyCountAssociationsMixin;
  public createUsePcs!: HasManyCreateAssociationMixin<UsePc>;

  public getPcProvider!: BelongsToGetAssociationMixin<PcProvider>

  public readonly usePcs?: UsePc[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    usePcs: Association<Pc, UsePc>;
  };
}

export const initPc = (sequelize: Sequelize) => {
  Pc.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    pcProviderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    state: {
      type: DataTypes.ENUM('inUse', 'usable', 'unusable'),
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    port1: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    port2: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    port3: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    port4: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    port5: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    port6: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    port7: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
  }, {
    tableName: 'pc',
    sequelize
  });
};

export const initPcAssociate = () => {
  Pc.belongsTo(PcProvider, {
    foreignKey: 'pcProviderId',
    onDelete: 'CASCADE'
  });

  Pc.hasMany(UsePc, {
    sourceKey: 'uuid',
    foreignKey: 'pcUuid',
    as: 'usePcs'
  });
};
