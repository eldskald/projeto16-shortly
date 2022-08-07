import { nanoid } from 'nanoid';
import { newShortUrl } from '../repositories/shortUrlsRepositories.js';
import handleError from '../shared/handleError.js';

export async function addShortUrl(_req, res) {
    try {
        const userId = res.locals.user.id;
        const url = res.locals.url;
        const shortUrl = nanoid();
        const shortUrlId = await newShortUrl(shortUrl, url, userId);
        if (shortUrlId instanceof Error) throw shortUrlId;
        return res.status(201).send({ shortUrl });

    } catch (err) {
        handleError(err);
        res.sendStatus(500);
    }
}

