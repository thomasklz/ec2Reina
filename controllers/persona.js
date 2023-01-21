import { Foto } from "../models/foto.js";
import { Persona } from "../models/persona.js";
import { Candidata } from "../models/candidata.js";
import { deleteImage, uploadIimage } from "../utils/cloudinary.js";
import fs from 'fs-extra';
import path from 'path';


export const crearPersona = async (req, res) => {
    try {
        console.log(req.files);
        const nuevaPersona = await Persona.create(req.body);
        await Candidata.create({
            numero: req.body.numero,
            persona_id: nuevaPersona.id
        });
        if (req.files?.foto) {

            const archivo = req.files.foto;
            const extension = path.extname(archivo.name);
            const extensionPermitida = ['.png', '.jpg', '.jpeg'];
            if (!extensionPermitida.includes(extension)) return res.status(422).json({ message: "archivo invalido" });
            const result = await uploadIimage(req.files.foto.tempFilePath);
            fs.unlink(req.files.foto.tempFilePath);

            await Foto.create({
                publica_id: result.public_id,
                url: result.secure_url,
                persona_id: nuevaPersona.id
            });
        }
        
        res.status(200).json({ message: "registrada", persona:nuevaPersona })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const obetenerPersonas = async (req, res) => {
    try {
        const personas = await Persona.findAll({
            where: { state: true },
            include: [
                { model: Foto },{ model: Candidata }
            ]
        });
        res.status(200).json(personas);
    } catch (error) {

    }
}
export const editarPersona = async (req, res) => {
    try {
        const { id } = req.params;
        const persona = await Persona.findOne({
            where: { state: true, id }
        });
        if (!persona) return res.status(404).json({ error: "no encontrada" });
        persona.set(req.body);
        await persona.save();
        const candidata = await Candidata.findOne({
            where: { persona_id:id }
        });
        candidata.set({
            numero: req.body.numero
        });
        await candidata.save();
        const foto = await Foto.findOne({
            where: { persona_id: id }
        });
        if (req.files?.foto) {
            const archivo = req.files.foto;
            const extension = path.extname(archivo.name);
            const extensionPermitida = ['.png', '.jpg', '.jpeg'];
            if (!extensionPermitida.includes(extension)) return res.status(422).json({ message: "archivo invalido" });
            await deleteImage(foto.publica_id);
            const result = await uploadIimage(req.files.foto.tempFilePath);
            fs.unlink(req.files.foto.tempFilePath);
            foto.set({
                publica_id: result.public_id,
                url: result.secure_url,
                persona_id: id
            });
            await foto.save();
        }
      
        res.status(201).json({ message: "actualizada" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const eliminarPersona = async (req, res) => {
    try {
        const { id } = req.params;
        const persona = await Persona.findOne({
            where: { state: true, id },
            include: {
                model: Foto
            }
        });
        if (!persona) return res.status(404).json({ message: "no encontrada" });

        persona.set({ state: false });
        await persona.save();

        const foto = await Foto.findOne({
            where: { persona_id:id },
        });
        foto.set({ state: false });
        await foto.save();

        const candidata = await Candidata.findOne({
            where: { persona_id:id },
        });
        candidata.set({ state: false });
        await candidata.save();

        await deleteImage(persona.fotos[0].publica_id);
        res.status(201).json({ message: "eliminada" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
