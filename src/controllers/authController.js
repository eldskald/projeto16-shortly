import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { newUser } from '../repositories/authRepository.js';
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

