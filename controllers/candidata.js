
import fs from "fs-extra";
import { Candidata } from "../models/candidata.js"
import { Foto } from "../models/foto.js";
import { Persona } from "../models/persona.js";
import { Calificacion } from "../models/calificacion.js";
import { deleteImage, uploadIimage } from "../utils/cloudinary.js";
import { Parametro } from "../models/parametros.js";
import { Op, literal, fn } from "sequelize";
export const crearCandidata = async (req, res) => {
    try {
        const persona = await Persona.create(req.body);

        if (req.files) {
            const result = await uploadIimage(req.files.foto.tempFilePath);
            await fs.unlink(req.files.foto.tempFilePath);
            await Foto.create({
                publica_id: result.public_id,
                url: result.secure_url,
                persona_id: persona.id
            });
        }

        await Candidata.create({ numero: req.body.numero, persona_id: persona.id });
        res.status(200).json({ message: "registrado" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
export const obtenerCandidatas = async (req, res) => {
    try {
        const candidatas = await Candidata.findAll({
            where: { state: true },
            include: [
                { model: Calificacion, include: Parametro }, { model: Persona, include: Foto }
            ]

        });
        res.status(200).json(candidatas);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
export const editarCandidata = async (req, res) => {
    try {
        const { id } = req.params;
        const candidata = await Candidata.findOne({ where: { state: true, id } });
        if (!candidata) return res.status(404).json({ error: "no encontrado" });
        candidata.set(req.body);
        await candidata.save();

        const persona = await Persona.findOne({
            where: { state: true, id: candidata.persona_id }
        });
        if (persona) {
            persona.set(req.body);
            await persona.save();
        }

        if (req.files) {
            const foto = await Foto.findOne({
                where: { persona_id: persona.id }
            });

            if (!foto) {
                const result = await uploadIimage(req.files.foto.tempFilePath);
                await fs.unlink(req.files.foto.tempFilePath);
                await Foto.create({
                    publica_id: result.public_id,
                    url: result.secure_url,
                    persona_id: persona.id
                });
            } else {
                await deleteImage(foto.publica_id);
                const result = await uploadIimage(req.files.foto.tempFilePath);
                await fs.unlink(req.files.foto.tempFilePath);
                foto.set({
                    publica_id: result.public_id,
                    url: result.secure_url,
                    persona_id: persona.id
                });
                await foto.save();
            }
        }

        res.status(201).json({ message: "actualizado" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export const eliminarCandidata = async (req, res) => {
    try {
        const { id } = req.params;
        const candidata = await Candidata.findOne({
            where: { state: true, id }
        });
        candidata.set({ state: false });
        await candidata.save();

        const persona = await Persona.findOne({
            where: { state: true, id: candidata.persona_id }
        });
        if (!persona) return res.status(404).json({ error: "no encontrado" });
        persona.set({ state: false });
        await persona.save();

        const foto = await Foto.findOne({
            where: { persona_id: id }
        });

        if (foto) await deleteImage(foto.publica_id);

        res.status(201).json({ message: "eliminado" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export const editarOnline = async (req, res) => {
    try {
        const { id } = req.params;
        const candidata = await Candidata.findOne({ where: { state: true, id } });
        if (!candidata) return res.status(404).json({ error: "no encontrado" });
        await Candidata.update({ online: false }, {
            where: { id: { [Op.ne]: id } }
        });
        candidata.set({ online: true });
        await candidata.save();
        res.status(201).json({ message: "actualizado" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}