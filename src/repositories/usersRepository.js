import connection from '../database.js';

export async function userShortenedUrls(id) {
    try {
        const { rows } = await connection.query(`
            SELECT
                "shortUrls".id,
                "shortUrls"."shortUrl",
                "shortUrls".url,
                "shortUrls"."visitCount"
            FROM "shortUrls"
            WHERE "shortUrls"."userId" = $1
        `, [id]);
        return rows;

    } catch (err) {
        return err;
    }
}
