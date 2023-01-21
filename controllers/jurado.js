import { Jurado } from "../models/Jurado.js"
import fs from "fs-extra";
import { Foto } from "../models/foto.js";
import { Persona } from "../models/persona.js";
import { deleteImage, uploadIimage } from "../utils/cloudinary.js";

export const crearJurado = async (req, res) => {
    try {
        const persona = await Persona.create(req.body);
        const result = await uploadIimage(req.files.foto.tempFilePath);
        fs.unlink(req.files.foto.tempFilePath);
        await Foto.create({
            publica_id: result.public_id,
            url: result.secure_url,
            persona_id: persona.id
        });

        await Jurado.create({ persona_id: persona.id });
        res.status(200).json({ message: "registrado" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const obtenerJurados = async (req, res) => {
    try {
        const jurados = await Jurado.findAll({
            where: { state: true },
            include: { model: Persona, include: { model: Foto } }
        });

        res.status(200).json(jurados);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
export const editarJurado = async (req, res) => {
    try {
        const { id } = req.params;
        const jurado = await Jurado.findOne({
            where: { state: true, id }
        });
        jurado.set(req.body);
        await jurado.save();

        const persona = await Persona.findOne({
            where: { state: true, id: jurado.persona_id }
        });
        if (!persona) return res.status(404).json({ error: "no encontrado" });
        persona.set(req.body);
        await persona.save();

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
export const eliminarJurado = async (req, res) => {
    try {
        const { id } = req.params;
        const jurado = await Jurado.findOne({
            where: { state: true, id }
        });
        jurado.set({ state: false });
        await jurado.save();

        const persona = await Persona.findOne({
            where: { state: true, id: jurado.persona_id }
        });
        if (!persona) return res.status(404).json({ error: "no encontrado" });
        persona.set({ state: false });
        await persona.save();
        res.status(201).json({ message: "eliminado" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}