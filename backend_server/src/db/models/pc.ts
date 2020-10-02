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
  ip: string;
  port?: number;
  state: 'inUse' | 'usable' | 'unusable';
}

interface PCCreationAttributes extends Optional<PCAttributes, 'uuid'> {}

export class PC extends Model<PCAttributes, PCCreationAttributes>
  implements PCCreationAttributes {
  public uuid!: string;
  public pcProviderId!: number;
  public ip!: string;
  public port?: number;
  public state!: 'inUse' | 'usable' | 'unusable';

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
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    port: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    state: {
      type: DataTypes.ENUM('inUse', 'usable', 'unusable'),
      allowNull: false
    }
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
