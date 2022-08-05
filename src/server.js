import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from './router.js';

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);

config();
server.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT}`);
});

