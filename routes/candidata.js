import express from 'express';
import { crearCandidata, editarOnline, editarCandidata, eliminarCandidata, obtenerCandidatas } from '../controllers/candidata.js';
import { validarImagen } from '../middleware/validarImagen.js';

const rotuer = express.Router();

rotuer.post('/candidata',validarImagen, crearCandidata);
rotuer.get('/candidata', obtenerCandidatas);
rotuer.put('/candidata/:id', validarImagen, editarCandidata);
rotuer.delete('/candidata/:id', eliminarCandidata);
rotuer.put('/candidata/online/:id', editarOnline);
export default rotuer;