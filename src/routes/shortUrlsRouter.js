import { Router } from 'express';
import { addShortUrl, getShortUrl, openShortUrl } from '../controllers/shortUrlsController.js';
import tokenValidation from '../middlewares/tokenValidation.js';
import urlsShortenValidation from '../middlewares/urlsShortenValidation.js';

const router = Router();
router.post('/urls/shorten', tokenValidation, urlsShortenValidation, addShortUrl);
router.get('/urls/:id', getShortUrl);
router.get('/urls/open/:shortUrl', openShortUrl)
export default router;
