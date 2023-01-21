import { Calificacion } from "../models/calificacion.js";
import { Candidata } from "../models/candidata.js";
import { Foto } from "../models/foto.js";
import { Parametro } from "../models/parametros.js";
import { Persona } from "../models/persona.js";

export const resultadoController = async (req, res) => {
    try {

        const candidata = await Candidata.findOne({
            where: { state: true, online: true },
            include: {
                model: Persona,
                attributes: ['id','nombres', 'descripcion'],
                include:{ 
                    model: Foto,
                    attributes: ['url']
                }
            },
            attributes: ['id','numero']
        });
        if (!candidata) return res.status(404).json({ error: "no encontrado" });
        const calificaciones = await Calificacion.findAll({
            where: { state: true, candidata_id: candidata.id },
            attributes: ['calificacion', 'candidata_id', 'parametro_id']

        });
        let array = []
        let object = {};

        const parameters = await Parametro.findAll({
            where: { state: true }
        })

        parameters.forEach(c => {
            let puntaje = 0;
            calificaciones.forEach(r => {
                if (r.parametro_id == c.id) puntaje = puntaje + r.calificacion
            });

            object = {
                puntaje,
                parametro: c.parametro,
                orden: c.orden
            };
            array.push(object)
        });
        const puntajeTotal = calificaciones.reduce((acumulador, valorActual) => acumulador + valorActual.calificacion, 0);


        res.status(200).json({ detalles: array, candidata, puntajeTotal })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const resultados = async (req, res) => {
    try {
        
        const candidatas = await Candidata.findAll({
            where: { state: true },
            attributes: ['id','numero'],
            include: {
                model: Persona,
                include:{
                    model: Foto
                }
            }
        });

        const calificaciones = await Calificacion.findAll({
            where: { state: true },
            attributes: ['calificacion', 'candidata_id', 'parametro_id']
        });

        const calificacionesTotales = []
        let suma = 0
        candidatas.map( (id) => {
            suma = 0;
            calificaciones.map( c => {
                if(id.id == c.candidata_id){
                    suma = suma + c.calificacion;
                }
            });
            calificacionesTotales.push({
                numero:id.numero,
                persona:id.persona,
                puntaje:suma
            });            
        })
        calificacionesTotales.sort((a, b) => b.puntaje - a.puntaje);

        res.status(200).json({
            candidatas: calificacionesTotales
        });
     
    } catch (error) {
        return res.status(500).json({error: error.error})
    }
}