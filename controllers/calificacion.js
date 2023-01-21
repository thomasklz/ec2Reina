import { Calificacion } from "../models/calificacion.js";
import { Candidata } from "../models/candidata.js";
import { Jurado } from "../models/Jurado.js";
import { Persona } from "../models/persona.js";
import { Parametro } from "../models/parametros.js";
export const crearCalificacion = async (req, res) => {
  try {
    //const { id } = req.params;
    const calificacion = await Calificacion.findOne({
      where: {
        state: true, candidata_id: req.body.candidata_id,
        jurado_id: req.body.jurado_id, parametro_id: req.body.parametro_id
      },
    });
    if (calificacion) {
      calificacion.set(req.body);
      await calificacion.save();
      res.status(200).json({ message: "actualizado" });
    } else {
      await Calificacion.create(req.body);
      res.status(201).json({ message: "registrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerCalificaciones = async (req, res) => {
  try {
    const calificaciones = await Calificacion.findAll({
      where: { state: true },
      include: [
        {
          model: Parametro,

        },
        {
          model: Candidata,
          attributes: ["id", "numero"],
          include: {
            model: Persona,
            attributes: ["id", "nombres"],
          },
        },
        {
          model: Jurado,
          attributes: ["id"],
          include: {
            model: Persona,
            attributes: ["nombres"],
          },
        },
      ],
      attributes: ["calificacion"],
    });

    res.status(200).json(calificaciones);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const editarCalificacion = async (req,res) => {
  try {
    const { id } = req.params;
    const calificacion = await Calificacion.findOne({
      where: { state: true, id },
    });
    calificacion.set(req.body);
    await calificacion.save();
    res.status(201).json({ message: "actualizado" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const eliminarCalificacion = async (req, res) => {
  try {
    const { id } = req.params;
    const calificacion = await Calificacion.findOne({
      where: { id },
    });
    calificacion.set({ ...calificacion, state: true });
    await calificacion.save();

    res.status(200).json({ message: "eliminado" });
  } catch (error) { }
};
