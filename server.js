const express = require('express');
const path = require('path'); 
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('client/build'));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true});

const articlesSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articlesSchema);

app.get("/articles", function(req, res){
    Article.find(function(err, foundArticles){
        res.send(foundArticles);
    })
})

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

