require('dotenv').config({ path: './.env' });
/* Using .env variables: process.env.TEST1 */
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: 'localhost',
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});

module.exports = pool;