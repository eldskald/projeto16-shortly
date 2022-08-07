import { userShortenedUrls } from '../repositories/usersRepository.js';
import handleError from '../shared/handleError.js';

export async function getUserProfile(_req, res) {
    try {
        const { user } = res.locals;
        const shortenedUrls = await userShortenedUrls(user.id);
        if (shortenedUrls instanceof Error) throw shortenedUrls;

        let totalVisits = 0;
        for (const shortUrl of shortenedUrls) {
            totalVisits += shortUrl.visitCount;
        }

        return res.status(200).send({
            id: user.id,
            name: user.name,
            visitCount: totalVisits,
            shortenedUrls
        });

    } catch (err) {
        handleError(err);
        return res.sendStatus(500);
    }
}

