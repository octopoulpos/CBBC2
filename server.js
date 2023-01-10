const express = require('express');
const path = require('path'); 
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(express.static('client/build'));

app.get('/api/xxx', (req, res) => {
    res.send({
        msg: 'Connected to api'
    })
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`)
});

