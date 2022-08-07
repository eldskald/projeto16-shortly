import { Router } from 'express';
import { addShortUrl } from '../controllers/shortUrlsController.js';
import tokenValidation from '../middlewares/tokenValidation.js';
import urlsShortenValidation from '../middlewares/urlsShortenValidation.js';

const router = Router();
router.post('/urls/shorten', tokenValidation, urlsShortenValidation, addShortUrl);
export default router;
