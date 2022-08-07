import { nanoid } from 'nanoid';
import { newShortUrl, findShortUrl, removeShortUrl, visitShortUrl } from '../repositories/shortUrlsRepository.js';
import handleError from '../shared/handleError.js';

export async function addShortUrl(_req, res) {
    try {
        const userId = res.locals.user.id;
        const url = res.locals.body.url;
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
        const shortUrl = await findShortUrl(shortUrlId, null);
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

export async function openShortUrl(req, res) {
    try {
        const { shortUrl } = req.params;
        const query = await visitShortUrl(shortUrl);
        if (query instanceof Error) throw query;
        if (!query) return res.sendStatus(404);
        res.redirect(query);

    } catch (err) {
        handleError(err);
        res.sendStatus(500);
    }
}

export async function deleteShortUrl(req, res) {
    try {
        const shortUrlId = req.params.id;
        const { user } = res.locals;

        const shortUrl = await findShortUrl(shortUrlId, null);
        if (shortUrl instanceof Error) throw query;
        if (!shortUrl) return res.sendStatus(404);
        if (shortUrl.userId !== user.id) return res.sendStatus(401);

        const error = await removeShortUrl(shortUrlId, null);
        if (error) throw query;
        return res.sendStatus(204);

    } catch (err) {
        handleError(err);
        res.sendStatus(500);
    }
}

