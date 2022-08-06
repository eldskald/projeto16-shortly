import joi from 'joi';
import bcrypt from 'bcrypt';
import { searchUser } from '../repositories/authRepository.js';
import handleError from '../shared/handleError.js';

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

async function signInValidation(req, res, next) {
    try {
        const body = {...req.body};

        const { error } = signInSchema.validate(body);
        if (error) {
            const errorMessages = error.details.map(item => item.message);
            let message = '';
            for (const err of errorMessages) {
                if ((/\"email\" is required/).test(err)) {
                    message += 'Email field is required!\n';
                }
                if ((/\"password\" is required/).test(err)) {
                    message += 'Password field is required!\n';
                }
            }
            return res.status(422).send(message);
        }

        const query = await searchUser(null, null, body.email);
        if (query instanceof Error) throw query;
        if (query.length === 0) return res.sendStatus(401);
        const user = query[0];
        
        const hashCheck = await bcrypt.compare(body.password, user.passwordHash);
        if (!hashCheck) return res.sendStatus(401);

        res.locals.user = user;
        next();

    } catch (err) {
        handleError(err);
        return res.sendStatus(500);
    }
}

export default signInValidation;
