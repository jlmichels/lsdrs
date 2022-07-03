require('dotenv').config({ path: './.env' });
/* Using .env variables: process.env.TEST1 */
const Pool = require('pg').Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
    /*
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    */
});

module.exports = pool;