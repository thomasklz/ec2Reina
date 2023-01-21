import path from 'path';

export const validarImagen = (req, res, next) => {
    try {
        if (req.files){

            const archivo = req.files.foto;
            const extension = path.extname(archivo.name);
            const extensionPermitida = ['.png', '.jpg', '.jpeg'];
            if (!extensionPermitida.includes(extension)) return res.status(422).json({ message: "formato invalido" });
        }
        next();
    } catch (error) {
        res.status(409).json({ error: error.message });
    }

}