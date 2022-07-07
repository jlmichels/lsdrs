const {Client} = require('pg');
const express = require('express');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

/* Routes */

const getClient = () => {

    const parsedConnectionString = process.env.DATABASE_URL 
        ? process.env.DATABASE_URL.split("://")[0] + "ql://" + process.env.DATABASE_URL.split("://")[1] 
        : {
            user: process.env.DATABASE_USER,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DATABASE_PORT, 
        }

    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }}
        /* Heroku 
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
        */
        /* Local
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        */
    )
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
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
        }});
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

/*
repopulate: Initialized DB structure in samples_backup

sample_id | user_id | material | lot | quantity |         timestamp          | status
-----------+---------+----------+-----+----------+----------------------------+---------
         2 |       1 | QGT      |  21 |     2000 | 2022-06-19 08:14:49.608828 | pending
         3 |       1 | HGD      | 105 |      200 | 2022-06-19 08:15:23.008686 | pending
         4 |       1 | HIH      |   7 |       50 | 2022-06-19 08:15:47.344997 | pending
         5 |       1 | LON      | 113 |       10 | 2022-06-19 08:16:00.39305  | pending
*/

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

app.listen(port, () => {
    console.log(`LSDRS server running on port ${port}`)
})