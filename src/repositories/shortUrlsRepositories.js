import connection from '../database.js';

export async function newShortUrl(shortUrl, url, userId) {
    try {
        const { rows } = await connection.query(`
            INSERT ONE ("shortUrl", "url", "userId")
            VALUES ($1, $2, $3)
            RETURNING id
        `, [shortUrl, url, userId]);
        return rows[0].id;

    } catch (err) {
        return err;
    }
}

