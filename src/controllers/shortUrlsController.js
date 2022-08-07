import { nanoid } from 'nanoid';
import { newShortUrl, findShortUrl } from '../repositories/shortUrlsRepositories.js';
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

export async function getShortUrl(req, res) {
    try {
        const shortUrlId = req.params.id;
        const shortUrl = await findShortUrl(shortUrlId);
        if (shortUrl instanceof Error) throw shortUrl;
        if (!shortUrl) return res.sendStatus(404);
        return res.status(200).send({
            id: shortUrl.id,
            shortUrl: shortUrl.shortUrl,
            url: shortUrl.url
        });

    } catch (err) {
        handleError(err);
        res.sendStatus(500);
    }
}
