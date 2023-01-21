import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { Persona } from "./persona.js";


export const Foto = sequelize.define('fotos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    publica_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
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


Persona.hasMany(Foto,{ foreignKey: "persona_id"});
Foto.belongsTo(Persona, { foreignKey: "persona_id"})