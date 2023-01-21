import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { Persona } from "./persona.js";


export const Candidata = sequelize.define('candidatas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});

Persona.hasMany(Candidata,{ foreignKey: "persona_id"});
Candidata.belongsTo(Persona, { foreignKey: "persona_id"});


