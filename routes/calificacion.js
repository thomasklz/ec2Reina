import express from 'express';
import { crearCalificacion, editarCalificacion, eliminarCalificacion, obtenerCalificaciones } from '../controllers/calificacion.js';


const rotuer = express.Router();

rotuer.post('/calificacion', crearCalificacion);
rotuer.get('/calificacion', obtenerCalificaciones);
rotuer.put('/calificacion/:id', editarCalificacion);
rotuer.delete('/calificacion/:id', eliminarCalificacion);

export default rotuer;