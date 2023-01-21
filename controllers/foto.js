import { Foto } from "../models/foto.js";
import { deleteImage, uploadIimage } from "../utils/cloudinary.js";
import fs from "fs-extra";




export const editarFoto = async (req, res) => {
    try {

        const { id } = req.params;
        const foto = await Foto.findOne({
            where: { persona_id: id }
        });

        if (!foto) {
            const result = await uploadIimage(req.files.foto.tempFilePath);
            fs.unlink(req.files.foto.tempFilePath);
            await Foto.create({
                publica_id: result.public_id,
                url: result.secure_url,
                persona_id: id
            });
            res.status(200).json({ message: "registrado" })
        } else {
            await deleteImage(foto.publica_id);
            const result = await uploadIimage(req.files.foto.tempFilePath);
            fs.unlink(req.files.foto.tempFilePath);

            foto.set({
                publica_id: result.public_id,
                url: result.secure_url,
                persona_id: id
            });
            await foto.save();
            res.status(200).json({ message: "actualizado" })
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
