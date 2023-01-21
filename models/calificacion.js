import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { Candidata } from "./candidata.js";
import { Jurado } from "./Jurado.js";
import { Parametro } from "./parametros.js";



export const Calificacion = sequelize.define('calificaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    calificacion: {
        type: DataTypes.FLOAT(11,2),
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    timestamps: false
});

Candidata.hasMany(Calificacion,{ foreignKey: "candidata_id"});
Calificacion.belongsTo(Candidata, { foreignKey: "candidata_id"});

Jurado.hasMany(Calificacion,{ foreignKey: "jurado_id"});
Calificacion.belongsTo(Jurado, { foreignKey: "jurado_id"});

Parametro.hasMany(Calificacion,{ foreignKey: "parametro_id"});
Calificacion.belongsTo(Parametro, { foreignKey: "parametro_id"});