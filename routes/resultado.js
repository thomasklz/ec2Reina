import { Router } from 'express';
import { resultadoController, resultados } from '../controllers/resultadoController.js';

const router = Router();

router.get('/resultado/candidata', resultadoController);
router.get('/resultados', resultados);

export default router;