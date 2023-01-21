import express from 'express';
import { editarFoto } from '../controllers/foto.js';
import { validarImagen } from '../middleware/validarImagen.js';

const rotuer = express.Router();
rotuer.put('/foto/persona/:id',validarImagen, editarFoto);


export default rotuer;