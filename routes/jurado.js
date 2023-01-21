import express from 'express';
import { crearJurado, editarJurado, eliminarJurado, obtenerJurados } from '../controllers/jurado.js';
import { validarImagen } from '../middleware/validarImagen.js';

const rotuer = express.Router();

rotuer.post('/jurado', validarImagen, crearJurado);
rotuer.get('/jurado', obtenerJurados);
rotuer.put('/jurado/:id', editarJurado);
rotuer.delete('/jurado/:id', eliminarJurado);

export default rotuer;