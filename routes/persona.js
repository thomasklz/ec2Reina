import express from 'express';
import { crearPersona, editarPersona, eliminarPersona, obetenerPersonas } from '../controllers/persona.js';

const rotuer = express.Router();

rotuer.post('/persona', crearPersona);
rotuer.get('/persona', obetenerPersonas);
rotuer.put('/persona/:id', editarPersona);
rotuer.delete('/persona/:id', eliminarPersona);

export default rotuer;