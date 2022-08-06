import { Router } from 'express';
import { signUp } from '../controllers/authController.js';
import signUpValidation from '../middlewares/signUpValidation.js';

const router = Router();
router.post('/sign-up', signUpValidation, signUp);
export default router;
