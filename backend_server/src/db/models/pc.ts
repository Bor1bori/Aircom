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
import { PCProvider } from './pc_provider';
import { PCAllocation } from './pc_allocation';

/* user db first settings */
export interface PCAttributes {
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

interface PCCreationAttributes extends Optional<PCAttributes, 'uuid'> {}

export class PC extends Model<PCAttributes, PCCreationAttributes>
  implements PCCreationAttributes {
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

  public getPcAllocations!: HasManyGetAssociationsMixin<PCAllocation>; // Note the null assertions!
  public addPcAllocations!: HasManyAddAssociationMixin<PCAllocation, number>;
  public hasPcAllocations!: HasManyHasAssociationMixin<PCAllocation, number>;
  public countPcAllocations!: HasManyCountAssociationsMixin;
  public createPcAllocations!: HasManyCreateAssociationMixin<PCAllocation>;

  public getPcProvider!: BelongsToGetAssociationMixin<PCProvider>

  public readonly pcAllocations?: PCAllocation[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    pcAllocations: Association<PC, PCAllocation>;
  };
}

export const initPC = (sequelize: Sequelize) => {
  PC.init({
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

export const initPCAssociate = () => {
  PC.belongsTo(PCProvider, {
    foreignKey: 'pcProviderId',
    onDelete: 'CASCADE'
  });

  PC.hasMany(PCAllocation, {
    sourceKey: 'uuid',
    foreignKey: 'pcUuid',
    as: 'pcAllocations'
  });
};
