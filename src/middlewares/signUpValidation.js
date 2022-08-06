import joi from 'joi';
import { stripHtml } from 'string-strip-html';
import { searchUser } from '../repositories/authRepository.js';
import handleError from '../shared/handleError.js';

const signUpSchema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string()
        .pattern(/(?=.*?[A-Z])/)
        .pattern(/(?=.*?[a-z])/)
        .pattern(/(?=.*?[0-9])/)
        .pattern(/(?=.*?[#?!@$%^&*-])/)
        .min(6)
        .required(),
    confirmPassword: joi.string()
});

async function signUpValidation(req, res, next) {
    try {
        const body = {...req.body};

        for (const key of Object.keys(body)) {
            body[key] = stripHtml(body[key]).result.trim();
        };

        const { error } = signUpSchema.validate(body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(item => item.message);
            let message = '';
            for (const err of errorMessages) {
                if ((/\"name\" is required/).test(err)) {
                    message += 'Name field is required!\n';
                }
                if (err.includes('"name" is not allowed to be empty')) {
                    message += 'Name field is required!\n';
                }
                if (err.includes('"name" length must be at least 3 characters long')) {
                    message += 'Name must be at least 3 characters long!\n';
                }
                if ((/\"email\" is required/).test(err)) {
                    message += 'Email field is required!\n';
                }
                if (err.includes('"email" is not allowed to be empty')) {
                    message += 'Email field is required!\n';
                }
                if ((/\"password\" is required/).test(err)) {
                    message += 'Password field is required!\n';
                }
                if (err.includes('"password" is not allowed to be empty')) {
                    message += 'Password field is required!\n';
                }
                if ((/\"email" must be a valid email/).test(err)) {
                    message += 'Email must be a valid email!\n';
                }
                if (err.includes("/(?=.*?[A-Z])/")) {
                    message += 'Password must contain at least 1 capital letter!\n';
                }
                if (err.includes("/(?=.*?[a-z])/")) {
                    message += 'Password must contain at least 1 lower case letter!\n';
                }
                if (err.includes("/(?=.*?[0-9])/")) {
                    message += 'Password must contain at least 1 number!\n';
                }
                if (err.includes('/(?=.*?[#?!@$%^&*-])/')) {
                    message += 'Password must contain at least 1 special character!\n';
                }
                if (err.includes('"password" length must be at least 6 characters long')) {
                    message += 'Password must be at least 6 characters long\n';
                }
                if (err.includes('"confirmPassword" is not allowed to be empty')) {
                    message += 'Confirm your password correctly!';
                }
            }
            return res.status(422).send(message);
        }

        if (body.password != body.confirmPassword) {
            return res.status(422).send('Confirm your password correctly!');
        }

        const query = await searchUser(null, null, body.email);
        if (query instanceof Error) throw query;
        if (query.length > 0) return res.sendStatus(409);

        res.locals.body = {...body};
        next();

    } catch (err) {
        handleError(err);
        return res.sendStatus(500);
    }
}

export default signUpValidation;

