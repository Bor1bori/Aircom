import {Model, DataTypes, Sequelize} from "sequelize";

/* user db first settings */
export class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public birthdate!: Date;
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
    }, {
        tableName: 'users',
        sequelize
    });
}
