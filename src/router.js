import { Router } from 'express';
import authRouter from './routes/authRouter.js';
import shortUrlsRouter from './routes/shortUrlsRouter.js';

const router = Router();
router.use(authRouter);
router.use(shortUrlsRouter);
export default router;

