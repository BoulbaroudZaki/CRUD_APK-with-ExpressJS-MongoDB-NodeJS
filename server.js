const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./database/connection');
const Route = require('./routes/router')

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', Route);

app.get('/', (req, res) => {
    res.status(200).send('hello world')
})

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
