const express = require('express');
require('dotenv').config({ path: './.env' });
const app = express()
const port = 3001

app.get('/', (req, res) => {
    console.log("env is " + process.env.TEST1);
    res.status(200).send('express test');
})

app.listen(port, () => {
    console.log(`LSDRS server running on port ${port}`)
})