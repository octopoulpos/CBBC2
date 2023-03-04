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

///////////////// Convert project xml to json 

const fs = require('fs');
const xml2js = require('xml2js');

const xmlString = fs.readFileSync('./projecttest.xml', 'utf-8');

const parseXmlString = xml => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

//////////////////////TEST PROJECT to MONGO/////////////////////////////////

mongoose.connect("mongodb+srv://cb:4316doco@cluster0.69hoyi7.mongodb.net/wikiDB", { useNewUrlParser: true });

const projectSchema = new mongoose.Schema({
    nom: String,
    quote: String,
    prixVente: Number,
    margePIF: Number,
    sommeCN: Number,
    sommeDK: Number,
    sommeUS: Number,
    sommeDE: Number,
    gaz: Boolean,
    manutention: Number,
    noManut: Number,
});

const Project = mongoose.model("Project", projectSchema);

(async () => {
    try {
        const result = await parseXmlString(xmlString);
        const projectName = result.Report.Tablix8[0].Details_Collection[0].Details[0].$.ProjectName;
        const quote = result.Report.Tablix8[0].Details_Collection[0].Details[0].$.JPP20Number;
        const prixVente = Math.round(result.Report.Tablix8[0].Details_Collection[0].Details[0].$.Textbox150);
        const margePIF = Math.round((result.Report.Tablix8[0].Details_Collection[0].Details[0].$.Textbox140) * 10000) / 100;
        console.log(`Project Name: ${projectName}`);
        console.log(`Quote: ${quote}`);
        console.log(`prixVente: ${prixVente} €`);
        console.log(`margePIF: ${margePIF} %`);

        const margeCurrent = Math.round((result.Report.Tablix2[0].$.Textbox36) * 10000) / 100;
        const margeCurrent2 = Math.round(result.Report.Tablix2[0].$.Textbox34);
        console.log(`margeCurrent: ${margeCurrent} %`);
        console.log(`margeCurrent2: ${margeCurrent2} €`);

        const totalCommandes = Math.round(result.Report.Tablix6[0].$.Textbox113);
        console.log(`totalCommandes: ${totalCommandes} €`);
       
        const details3 = result.Report.Tablix6[0].Details3_Collection[0].Details3;
        const totalAmountJECN = details3
        .filter(obj => obj.$.Supplier === 'JENSENCHINA')
        .map(obj => parseFloat(obj.$['DeliverRemainderAmountCurrency']))
        .reduce((sum, amount) => sum + amount, 0);
        const totalAmountJEDK = details3
        .filter(obj => obj.$.Supplier === 'JENSENDK')
        .map(obj => parseFloat(obj.$['DeliverRemainderAmountCurrency']))
        .reduce((sum, amount) => sum + amount, 0);
        const totalAmountJEUS = details3
        .filter(obj => obj.$.Supplier === 'JENUSAEURO')
        .map(obj => parseFloat(obj.$['DeliverRemainderAmountCurrency']))
        .reduce((sum, amount) => sum + amount, 0);
        const totalAmountJEDE = details3
        .filter(obj => obj.$.Supplier === 'SENKING')
        .map(obj => parseFloat(obj.$['DeliverRemainderAmountCurrency']))
        .reduce((sum, amount) => sum + amount, 0);
        
      console.log(totalAmountJECN);
      console.log(totalAmountJEDK);
      console.log(totalAmountJEUS);
      console.log(totalAmountJEDE);

      const jensenchinaItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'JENSENCHINA');
      const lineText1Values = jensenchinaItems.map(item => item.$.LineText1);
      const lineText1Concatenated = lineText1Values.join(' + ');
      const gaz = lineText1Concatenated.includes("gas");

      console.log(lineText1Concatenated);
      console.log("gaz = " + gaz);


      // Sum up DeliverRemainderAmountCurrency when Supplier is "JENSEN" and LineText1 includes "Manutention"
const manutention = result.Report.Tablix6.reduce((accumulator, tablix) => {
   
      tablix.Details3_Collection.forEach(details => {
        details.Details3.forEach(detail => {
          if (detail["$"].Supplier === "JENSEN" && detail["$"].LineText1.includes("Manutention")) {
            accumulator += parseFloat(detail["$"].DeliverRemainderAmountCurrency);
          }
        });
      });
    
    return accumulator;
  }, 0);
  console.log(manutention); 

  let noManut = 0;
  for (let i = 0; i < result.Report.Tablix6.length; i++) {
    const tablix = result.Report.Tablix6[i];
   
      const details = tablix.Details3_Collection[0].Details3;
      for (let j = 0; j < details.length; j++) {
        const detail = details[j].$;
        if (
          detail.Supplier === "JENSEN" &&
          detail.LineText1.indexOf("Manutention") === -1
        ) {
            noManut += parseFloat(detail.DeliverRemainderAmountCurrency);
        }
      }
    
  }
  console.log(noManut);


        const projectData = {
            nom: projectName,
            quote: quote,
            prixVente: prixVente,
            margePIF: margePIF,
            sommeCN: totalAmountJECN,
            sommeDK: totalAmountJEDK,
            sommeUS: totalAmountJEUS,
            sommeDE: totalAmountJEDE,
            gaz: gaz,
            manutention: manutention,
            noManut: noManut,

        };

          Project.create(projectData, (error, project) => {
            if (error) {
              console.error(error);
            } else {
              console.log(project);
            }
          });
    } catch (err) {
        console.error(err);
    }
})();







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





const userSchema = new mongoose.Schema({
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
    function (req, res) {
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

        User.register({ username: req.body.nom }, req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                res.redirect("/Connexion")
            } else {
                passport.authenticate("local")(req, res, function () {
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
