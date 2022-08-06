import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { newUser, newSession } from '../repositories/authRepository.js';
import handleError from '../shared/handleError.js';

config();

export async function signUp(_req, res) {
    try {
        const body = res.locals.body;
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
        const user = res.locals.user;
        
        const query = await newSession(user.id);
        if (query instanceof Error) throw dbError;
        const token = jwt.sign(
            { sessionId: query },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 * 30 }
        );

        return res.status(200).send({ token });
        
    } catch (err) {
        handleError(err);
        return res.sendStatus(500);
    }
}
