const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const axios = require('axios');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const cors = require('cors');



const PORT = process.env.PORT || 5000;
var oAuth = require("./middleware/oAuth");
const app = express();


app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3400', 'https://cb-bc.fr'] }));

// app.use(express.urlencoded({ extended: true })); // ajouté pour test 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('client/build'));

app.use(session({
    secret: "ourlittlesecret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const authAPIEndpoint = "http://localhost:5000/auth";

mongoose.connect("mongodb+srv://cb:4316doco@cluster0.69hoyi7.mongodb.net/wikiDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema ({
    nom: String,
    email: String,
    password: String,
    passwordcc: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.get('/portail-enedis', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      // If authentication succeeds, return the user profile
      res.json({
        user: req.user
      });
    }
  });

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

User.register({username: req.body.nom}, req.body.password, function(err, user){
    if (err) {
        console.log(err);
        res.redirect("/Connexion")
    } else {
        passport.authenticate("local")(req, res, function(){
            res.redirect("/portail-enedis");
        });
    }
});


        // const newUser = new User({
        //     nom: req.body.nom,
        //     password: req.body.password,
        //     passwordcc: req.body.passwordcc
        // });

        // newUser.save(function (err) {
        //     if (!err) {
        //         res.redirect("/Connexion");
        //     } else {
        //         res.send(err);
        //     }
        // });
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


app.use('/auth', oAuth, (req, res) => {
    console.log('Protected endpoint called');
    // Your protected endpoint logic here
});

app.route("/auth")
    .get(async (req, res) => {
        console.log("Protected endpoint called");

        res.send({
            msg: "Connected to auth api",
        });

        try {
            const { access_token } = req.oauth;
            const response = await axios({
                method: "get",
                url: authAPIEndpoint,
                headers: { Authorization: `Bearer ${access_token}` },
            });
            res.json(response.data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                res.status(401).json("Unauthorized to access data");
            } else if (error.response.status === 403) {
                res.status(403).json("Permission denied");
            } else {
                res.status(500).json("MMMhhhh, quelque chose ne va pas ..");
            }
        }
    });



app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`)
});


// app.get("/auth", async (req, res) => {

//     res.send({
//         msg: 'Connected to auth api'
//     })

//     try {
//         const { access_token } = req.oauth;
//         const response = await axios({
//             method: "get",
//             url: authAPIEndpoint,
//             headers: { Authorization: `Bearer ${access_token}` },
//         });
//         res.json(response.data);

//     } catch (error) {
//         console.log(error);
//         if (error.response.status === 401) {
//             res.status(401).json("Unauthorized to access data");
//         } else if (error.response.status === 403) {
//             res.status(403).json("Permission denied");
//         } else {
//             res.status(500).json("MMMhhhh, quelque chose ne va pas ..");
//         }
//     }
// });
