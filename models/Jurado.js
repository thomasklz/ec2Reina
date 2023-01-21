import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { Persona } from "./persona.js";


export const Jurado = sequelize.define('jurados', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});

Persona.hasMany(Jurado,{ foreignKey: "persona_id"});
Jurado.belongsTo(Persona, { foreignKey: "persona_id"});

