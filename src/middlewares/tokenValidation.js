import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { searchUserFromSession } from '../repositories/authRepository.js';
import handleError from '../shared/handleError.js';

config();

async function tokenValidation(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.sendStatus(401);

        const token = authorization.replace('Bearer ', '');
        let sessionId;
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(401);
            sessionId = decoded.sessionId;
        });
        
        const query = await searchUserFromSession(sessionId);
        if (query instanceof Error) throw query; 
        if (query.length === 0) return res.sendStatus(401);
        
        res.locals.user = query[0];
        next();

    } catch (err) {
        handleError(err);
        res.sendStatus(500);
    }
}

export default tokenValidation;
