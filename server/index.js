const express = require('express');
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.status(200).send('express test');
})

app.listen(port, () => {
    console.log(`LSDRS server running on port ${port}`)
})