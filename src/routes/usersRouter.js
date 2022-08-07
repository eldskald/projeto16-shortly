import { Router } from 'express';
import { getRanking, getUserProfile } from '../controllers/usersController.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = Router();
router.get('/users/me', tokenValidation, getUserProfile);
router.get('/ranking', getRanking);
export default router;

