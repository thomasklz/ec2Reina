import express from 'express';
import { crearParametro, editarParametro, eliminarParametro, obtenerParametros } from '../controllers/parametro.js';

const rotuer = express.Router();

rotuer.post('/parametro', crearParametro);
rotuer.get('/parametro', obtenerParametros);
rotuer.put('/parametro/:id', editarParametro);
rotuer.delete('/parametro/:id', eliminarParametro);

export default rotuer;