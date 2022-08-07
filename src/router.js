import { Router } from 'express';
import authRouter from './routes/authRouter.js';
import shortUrlsRouter from './routes/shortUrlsRouter.js';
import usersRouter from './routes/usersRouter.js';

const router = Router();
router.use(authRouter);
router.use(shortUrlsRouter);
router.use(usersRouter);
export default router;

