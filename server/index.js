const express = require('express');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001
const pool = require('./db.js');

app.use(cors());
app.use(bodyParser.json());

/* Routes */

app.get('/', async (req, res) => {
    try {
        const allSamples = await pool.query("SELECT samples.sample_id, users.user_name, samples.material, samples.lot, samples.quantity, samples.timestamp, samples.status FROM samples INNER JOIN users ON samples.user_id=users.user_id WHERE status='pending'");
        res.send(allSamples.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.patch('/samples/:sample_id', async (req, res) => {
    try {
        const { sample_id } = req.params;
        console.log(req.body);
        const { status } = req.body;
        const updateSample = await pool.query(
            "UPDATE samples SET status=$1 WHERE sample_id=$2", [status, sample_id],
        );

        res.json("Sample status updated successfully.");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(port, () => {
    console.log(`LSDRS server running on port ${port}`)
})