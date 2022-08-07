import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { newUser, searchUser, newSession } from '../repositories/authRepository.js';
import handleError from '../shared/handleError.js';

config();

export async function signUp(_req, res) {
    try {
        const { body } = res.locals;

        const query = await searchUser(null, null, body.email);
        if (query instanceof Error) throw query;
        if (query.length > 0) return res.sendStatus(409);

        const passwordHash = await bcrypt.hash(body.password, 10);
        const repError = await newUser(body.name, body.email, passwordHash);
        if (repError) throw repError;
        return res.sendStatus(201);

    } catch (err) {
        handleError(err);
        return res.sendStatus(500);
    }
}

export async function signIn(_req, res) {
    try {
        const { body } = res.locals;
        
        const query = await searchUser(null, null, body.email);
        if (query instanceof Error) throw query;
        if (query.length === 0) return res.sendStatus(401);
        const user = query[0];
        
        const hashCheck = await bcrypt.compare(body.password, user.passwordHash);
        if (!hashCheck) return res.sendStatus(401);

        const session = await newSession(user.id);
        if (session instanceof Error) throw session;
        const token = jwt.sign(
            { sessionId: session },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 * 30 }
        );

        return res.status(200).send({ token });
        
    } catch (err) {
        handleError(err);
        return res.sendStatus(500);
    }
}
