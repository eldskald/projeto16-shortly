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

export async function queryRanking() {
    try {
        const { rows } = await connection.query(`
            SELECT
                users.id,
                users.name,
                COUNT("shortUrls".id) AS "linksCount",
                SUM("shortUrls"."visitCount") AS "visitCount"
            FROM "shortUrls"
            JOIN users ON users.id = "shortUrls"."userId"
            GROUP BY users.id
        `);
        return rows;

    } catch (err) {
        return err;
    }
}
