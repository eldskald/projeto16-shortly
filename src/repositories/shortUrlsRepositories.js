import connection from '../database.js';

export async function newShortUrl(shortUrl, url, userId) {
    try {
        const { rows } = await connection.query(`
            INSERT INTO "shortUrls" ("shortUrl", "url", "userId")
            VALUES ($1, $2, $3)
            RETURNING id
        `, [shortUrl, url, userId]);
        return rows[0].id;

    } catch (err) {
        return err;
    }
}

export async function findShortUrl(id, shortUrl) {
    try {
        if (id) {
            const { rows } = await connection.query(`
                SELECT * FROM "shortUrls"
                WHERE "shortUrls".id = $1
            `, [id]);
            return rows[0];
        } else if (shortUrl) {
            const { rows } = await connection.query(`
                SELECT * FROM "shortUrls"
                WHERE "shortUrls"."shortUrl" = $1
            `, [shortUrl]);
            return rows[0];
        }
        
    } catch (err) {
        return err;
    }
}
