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

mongoose.connect("mongodb+srv://cb:4316doco@cluster0.69hoyi7.mongodb.net/wikiDB", { useNewUrlParser: true });

// const articlesSchema = {
//     title: String,
//     content: String,
//     nom: String,
//     password: String,
//     passwordcc: String
// };
// const Article = mongoose.model("Article", articlesSchema);

const usersSchema = {
    nom: String,
    email: String,
    password: String,
    passwordcc: String
};
const User = mongoose.model("User", usersSchema);


app.get('/api/xxx', (req, res) => {
    res.send({
        msg: 'Connected to api'
    })
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})



////////////////Requests Targetting All Users///////////////////////////////////////
app.route("/users")

    .get(function (req, res) {
        User.find(function (err, foundusers) {
            if (!err) {
                res.send(foundusers);
            } else {
                res.send(err);
            }
        })
    })

    .post(function (req, res) {
        console.log(req.body.nom);
        console.log(req.body.password);

        const newUser = new User({
            nom: req.body.nom,
            password: req.body.password,
            passwordcc: req.body.passwordcc
        });

        newUser.save(function (err) {
            if (!err) {
                res.send("Vous êtes maintenant enregistré.");
            } else {
                res.send(err);
            }
        });
    });


    ////////////////Requests Targetting A Specific Users///////////////////////////////////////
app.route("/users/:userNom")

.get(function (req, res) {
    User.findOne({nom: req.params.userTitle}, function(err, foundUser){
        if (foundUser) {
            res.send(foundUser);
        } else {
            res.send("Cet utilisateur n'est pas enregistré")
        }
    });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`)
});

