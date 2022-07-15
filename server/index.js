const {Client} = require('pg');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
require('dotenv').config();

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors());
app.use(bodyParser.json());

/* Routes */

const getClient = () => {

    // Determine Heroku deploy vs local via existence of DATABASE_URL
    const connectionObject = process.env.DATABASE_URL 
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        }
        : {
            connectionString: process.env.REACT_APP_DATABASE_URL_LOCAL,
            ssl: false
        }

    let client = new Client(connectionObject)
    return client;
}

app.delete('/dev', async (req, res) => {
    try {
        const client = getClient();
        client
            .connect()
            .catch(err => console.error("Connection error", err.stack));
        await client.query("TRUNCATE samples")
            .then(() => res.json("Cleared all samples"))
            .then(() => client.end());
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/samples', async (req, res) => {
    try {
        const client = getClient();
        client
            .connect()
            .catch(err => console.error("Connection error", err.stack));
        await client.query("SELECT samples.sample_id, users.user_name, samples.material, samples.lot, samples.quantity, samples.timestamp, samples.status FROM samples INNER JOIN users ON samples.user_id=users.user_id WHERE status='pending'")
            .then((x) => res.json(x.rows))
            .then(() => client.end());
    } catch (err) {
        console.error(err.message);
    }
})

app.patch('/samples/:sample_id', async (req, res) => {
    try {
        const { sample_id } = req.params;
        const { status, rejection_reason } = req.body;
        
        let checkedRejectionReason = rejection_reason;
        if (rejection_reason === undefined) checkedRejectionReason = "";

        const client = getClient();
        client
            .connect()
            .catch(err => console.error("Connection error", err.stack));
        await client.query(
            "UPDATE samples SET status=$1, rejection_reason=$2 WHERE sample_id=$3", [status, checkedRejectionReason, sample_id],
        )
            .then(() => res.json("Sample status updated successfully."))
            .then(() => client.end());
    } catch (err) {
        console.error(err.message);
    }
})

// Todo: Better way to implement without :a
app.patch('/samples/all/:a', async (req, res) => {
    try {
        const { status } = req.body;
        const client = getClient();
        client
            .connect()
            .catch(err => console.error("Connection error", err.stack));
        await client.query("UPDATE samples SET status = $1", [status])
            .then(() => res.json(`All sample statuses set to "${status}" successfully.`))
            .then(() => client.end());
    } catch (err) {
        console.error(err.message);
    }
})

app.post('/samples', async (req,  res) => {
    try {
        const { user_id, material, lot, quantity } = req.body;
        const client = getClient();
        client
            .connect()
            .catch(err => console.error("Connection error", err.stack));
        await client.query("INSERT INTO samples (user_id, material, lot, quantity, timestamp, status) VALUES($1, $2, $3, $4, now(), 'pending') RETURNING *", [user_id, material, lot, quantity])
            .then((x) => res.json(x.rows[0]))
            .then(() => client.end());
    } catch (err) {
        console.error(err.message);
    }
})

app.post('/dev/repopulate', async (req, res) => {
    try {
        const client = getClient();
        client
            .connect()
            .catch(err => console.error("Connection error", err.stack));
        await client.query("INSERT INTO samples SELECT * FROM samples_backup")
            .then(() => res.json("Repopulated with default samples."))
            .then(() => client.end());
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
  });

app.listen(port, () => {
    console.log(`LSDRS server running on port ${port}`)
})