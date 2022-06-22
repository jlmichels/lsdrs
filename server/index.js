const express = require('express');
const app = express()
const cors = require('cors');
const port = 3001
const pool = require('./db.js');

app.use(cors());

app.get('/', async (req, res) => {
    try {
        const allSamples = await pool.query("SELECT * FROM samples WHERE status='pending'");
        res.send(allSamples.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(port, () => {
    console.log(`LSDRS server running on port ${port}`)
})