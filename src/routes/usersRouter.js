import { Router } from 'express';
import { getUserProfile } from '../controllers/usersController.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = Router();
router.get('/users/me', tokenValidation, getUserProfile);
export default router;

