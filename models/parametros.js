import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";


export const Parametro = sequelize.define('parametros', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parametro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orden: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});


