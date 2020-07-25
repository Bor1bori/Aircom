import sequelize from "@src/sequelize";
import {Model, DataTypes} from "sequelize";

/* user db first settings */
class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public birthdate!: Date;
}

User.init(
    {
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
    }
);

export default User;