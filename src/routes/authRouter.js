import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import validationSchemas from '../middlewares/validationSchemas.js';

const router = Router();
router.post('/signup', validationSchemas, signUp);
router.post('/signin', validationSchemas, signIn);
export default router;

