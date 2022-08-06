import connection from '../database.js';

export async function newUser(name, email, passwordHash) {
    try {
        await connection.query(`
            INSERT INTO users (name, email, "passwordHash")
            VALUES ($1, $2, $3)
        `, [name, email, passwordHash]);
        return;

    } catch (err) {
        return err;
    }
}

export async function searchUser(id, name, email) {
    try {
        const queryWhere = [];
        const bindVars = [];
        if (id) {
            queryWhere.push('users.id = $');
            bindVars.push(id);
        }
        if (name) {
            queryWhere.push('users.name = $');
            bindVars.push(name);
        }
        if (email) {
            queryWhere.push('users.email = $');
            bindVars.push(email);
        }
        for (let i = 0; i < queryWhere.length; i++) {
            queryWhere[i] += `${i + 1}`;
        }
        const queryStr = `
            SELECT * FROM users
            WHERE ${queryWhere.join(', ')}
        `;

        const { rows: searchResults } = await connection.query(queryStr, bindVars);
        return searchResults;

    } catch (err) {
        return err;
    }
}
