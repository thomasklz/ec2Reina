import { Parametro } from "../models/parametros.js";

export const crearParametro = async (req, res) => {
    try {
        await Parametro.create(req.body);
        res.status(200).json({ message: "registrado" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const obtenerParametros = async (req, res) => {
    try {
        const parametros = await Parametro.findAll({
            where: { state: true }
        });

        res.status(200).json(parametros);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
export const editarParametro = async (req, res) => {
    try {
        const { id } = req.params;
        const parametro = await Parametro.findOne({
            where: { state: true, id }
        });
        parametro.set(req.body);
        await parametro.save();
        res.status(201).json({ message: "actualizado" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export const eliminarParametro = async (req, res) => {
    try {
        const { id } = req.params;
        const parametro = await Parametro.findOne({
            where: { state: true, id }
        });
        parametro.set({ state: false });
        await parametro.save();
        res.status(201).json({ message: "eliminado" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}