import joi from 'joi';
import handleError from '../shared/handleError.js';

const urlShortenSchema = joi.object({
    url: joi.string().required()
});

async function urlsShortenValidation(req, res, next) {
    try {
        const body = {...req.body};
        const { error } = urlShortenSchema.validate(body);
        if (error) {
            return res.status(422).send('URL field is required!');
        }

        res.locals.url = body.url;
        next();

    } catch (err) {
        handleError(err);
        return res.sendStatus(500);
    }
}

export default urlsShortenValidation;
