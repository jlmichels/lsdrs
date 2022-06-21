require('dotenv').config({ path: './.env' });
/* Using .env variables: process.env.TEST1 */
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.USER,
    host: 'localhost',
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: 3001,
});

module.exports = pool;