const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ajouté pour test 

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
        User.findOne({ nom: req.params.userTitle }, function (err, foundUser) {
            if (foundUser) {
                res.send(foundUser);
            } else {
                res.send("Cet utilisateur n'est pas enregistré")
            }
        });
    });



///test POST..

app.route("/cbbc-enedis")
    .get((req, res) => {
        const code = window.location.search.substring(6);
        console.log(code)
        res.json({ code });
    })
    .post((req, res) => {
        const code = req.body.code;
        const CLIENT_ID = "b99082ce-2a5a-4a52-95bb-6d1093983ccc";
        const CLIENT_SECRET = "d3b594fc-3253-4ed6-b471-d709bb88b23c"
        const REDIRECT_URI = 'https://cb-bc.fr/cbbc-enedis';

        axios.post(`https://gw.hml.api.enedis.fr/v1/oauth2/token?redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&code=${code}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                console.log(response.data);
                console.log(response.status);
                res.json(response.data);
            })
            .catch(error => {
                console.log(error);
                res.json(error);
            });
    });

// app.post('/cbbc-enedis', (req, res) => {
//     const code = 'your_authorization_code';
//     const CLIENT_ID = "b99082ce-2a5a-4a52-95bb-6d1093983ccc";
//     const CLIENT_SECRET = "d3b594fc-3253-4ed6-b471-d709bb88b23c"
//     const REDIRECT_URI = 'https://cb-bc.fr/cbbc-enedis';

//     axios.post(`https://gw.hml.api.enedis.fr/v1/oauth2/token?redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&code=${code}`,
//         {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         })
//         .then(response => {
//             console.log(response.data);
//             console.log(response.status);
//             res.json(response.data);
//         })²
//         .catch(error => {
//             console.log(error);
//             res.json(error);
//         });
// });





///
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`)
});