import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";



export const Persona = sequelize.define('personas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    timestamps: false
});



