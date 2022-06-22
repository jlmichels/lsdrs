const express = require('express');
const app = express()
const cors = require('cors');
const port = 3001
const pool = require('./db.js');

app.use(cors());

app.get('/', async (req, res) => {
    try {
        const allSamples = await pool.query("SELECT samples.sample_id, users.user_name, samples.material, samples.lot, samples.quantity, samples.timestamp, samples.status FROM samples INNER JOIN users ON samples.user_id=users.user_id WHERE status='pending'");
        res.send(allSamples.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(port, () => {
    console.log(`LSDRS server running on port ${port}`)
})