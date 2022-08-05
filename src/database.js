import pg from 'pg';
import { config }  from 'dotenv';

config();
const connectionString = process.env.DATABASE_URL;

const connection = new pg.Pool({
    connectionString
});

export default connection;

