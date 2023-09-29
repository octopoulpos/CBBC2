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
// const projectMiddleware = require('./middleware/projectMiddleware'); 
const app = express();
// app.use('/projects', projectMiddleware);

app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3400', 'https://cb-bc.fr'] }));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('client/build'));


// (async () => {
//     await projectMiddleware(app);
// })();


///////////// Convert project xml to json 

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

//////////////////////   TEST PROJECT to MONGO    /////////////////////////////////

mongoose.connect("mongodb+srv://cb:4316doco@cluster0.69hoyi7.mongodb.net/wikiDB", { useNewUrlParser: true });

const projectSchema = new mongoose.Schema({
    today: String,
    nom: String,
    quote: String,
    prixVente: Number,
    margePIF: Number,
    margeCurrent: Number,
    sommeCN: Number,
    sommeDK: Number,
    sommeSW: Number,
    sommeUS: Number,
    sommeDE: Number,
    sommeIW: Number,
    sommeKANNE: Number,
    sommeSODI: Number,
    sommePMV: Number,
    sommeNUOVA: Number,
    sommeSILER: Number,
    sommeFRADIN: Number,
    sommeOLDAM: Number,
    sommeTCS: Number,
    sommeSATELEC: Number,
    sommeAPAVE: Number,
    sommeDATAMARS: Number,
    sommeQSP: Number,
    sommeHERREWYN: Number,
    paid: Number,
    warranty: Number,
    services: Number,
    transport: Number,
    lineText1Concatenatedcn: String,
    lineText1Concatenateddk: String,
    lineText1Concatenatedsw: String,
    lineText1Concatenatedde: String,
    lineText1Concatenatedus: String,
    lineText1ConcatenatedAutre: String,
    gaz: Boolean,
    manutention: Number,
    noManut: Number,
    jedkDates: [Date],
    jeswDates: [Date],
    jedeDates: [Date],
    jecnDates: [Date],
    jeusDates: [Date],
    jeiwDates: [Date],
    totalTotal: Number,
    totalCommandes: Number,
    checkSumProject: Boolean,
    newField0: Number,
    newField1: Number,
    newField2: Number,
    newField3: Number,
    newField4: Number,
    newField5: Number,
    newField6: Number,
    newField7: Number,
    newField8: Number,
    newField9: Number,
    dField0: String,
    dField1: String,
    dField2: String,
    dField3: String,
    dField4: String,
    dField5: String,
    dField6: String,
    dField7: String,
    dField8: String,
    dField9: String,
});


const Project = mongoose.model("Project", projectSchema);

(async () => {
    try {
        const day = new Date(); // Obtenir la date actuelle
        const today = day.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/'); // Formater la date au format "mm/dd/yyyy"

        const result = await parseXmlString(xmlString);
        const projectName = result.Report.Tablix8[0].Details_Collection[0].Details[0].$.ProjectName;
        const quote = result.Report.Tablix8[0].Details_Collection[0].Details[0].$.JPP20Number;
        const prixVente = Math.round(result.Report.Tablix8[0].Details_Collection[0].Details[0].$.Textbox150);
        const margePIF = Math.round((result.Report.Tablix8[0].Details_Collection[0].Details[0].$.Textbox140) * 10000) / 100;
        console.log(`Project Name: ${projectName}`);

        const margeCurrent = Math.round((result.Report.Tablix2[0].$.Textbox36) * 10000) / 100;
        const margeCurrent2 = Math.round(result.Report.Tablix2[0].$.Textbox34);

        const paid = Math.round(
            result?.Report?.Tablix2?.[0]?.MainAccountTypeEnum_Collection?.[0]?.MainAccountTypeEnum?.[0]?.$.Textbox13 || 0
        );
        const totalCommandes = Math.round(result.Report.Tablix6[0].$.Textbox113);
        const warranty = Math.round(result.Report.Tablix10[0].$.Textbox112);
        const services = Math.round(result.Report.Tablix9[0].ForecastModel_Collection[0].ForecastModel[0].$.CostAmount3);
        console.log("XXXXXXXXXXXXXXXXX   " + paid);


        const details3 = result.Report.Tablix6[0].Details3_Collection[0].Details3;
        const totalAmountJECN = details3
            .filter(obj => obj.$.Supplier === 'JENSENCHINA')
            .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
            .reduce((sum, amount) => sum + amount, 0);
        const totalAmountJEDK = details3
            .filter(obj => obj.$.Supplier === 'JENSENDK')
            .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
            .reduce((sum, amount) => sum + amount, 0);
        const totalAmountJESWED = details3
            .filter(obj => obj.$.Supplier === 'JENSENSWED')
            .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
            .reduce((sum, amount) => sum + amount, 0);
        const totalAmountJEUS = details3
            .filter(obj => obj.$.Supplier === 'JENUSAEURO')
            .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
            .reduce((sum, amount) => sum + amount, 0);
        const totalAmountJEDE = details3
            .filter(obj => obj.$.Supplier === 'SENKING')
            .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
            .reduce((sum, amount) => sum + amount, 0);
        const totalAmountINWATEC = details3
            .filter(obj => obj.$.Supplier === 'INWATEC')
            .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
            .reduce((sum, amount) => sum + amount, 0);
        const totalAmountTransport = details3
            .filter(obj => obj.$.Supplier === 'HYH' || obj.$.Supplier === 'BECHHANSEN' || obj.$.Supplier === 'SIS' || obj.$.Supplier === 'BLS')
            .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
            .reduce((sum, amount) => sum + amount, 0);


        /////////////TEST-------------
        function calculateTotalAmount(supplier, details) {
            return details
                .filter(obj => obj.$.Supplier === supplier)
                .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
                .reduce((sum, amount) => sum + amount, 0);
        }

        const suppliers = [
            'DIRECTOLDHAM',
            'DIRECTTCS',
            'DIRECTSATELEC',
            'APAVE',
            'KANNEGFRAN',
            'SODILEC',
            'DIRECTSILER',
            'DIRECTFRADIN',
            'PMV',
            'NUOVAFOLATI',
            'DIRECTDATAMARS',
            'DIRECTQSP',
            'DIRECTHERREWYN',
        ];

        const totalAmounts = {};

        suppliers.forEach(supplier => {
            totalAmounts[supplier] = calculateTotalAmount(supplier, details3);
        });

        console.log(totalAmounts);

        // const totalAmountOLDAM = details3
        //     .filter(obj => obj.$.Supplier === 'DIRECTOLDHAM')
        //     .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
        //     .reduce((sum, amount) => sum + amount, 0);
        // const totalAmountTCS = details3
        //     .filter(obj => obj.$.Supplier === 'DIRECTTCS')
        //     .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
        //     .reduce((sum, amount) => sum + amount, 0);
        // const totalAmountSATELEC = details3
        //     .filter(obj => obj.$.Supplier === 'DIRECTSATELEC')
        //     .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
        //     .reduce((sum, amount) => sum + amount, 0);
        // const totalAmountAPAVE = details3
        //     .filter(obj => obj.$.Supplier === 'APAVE')
        //     .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
        //     .reduce((sum, amount) => sum + amount, 0);
        // const totalAmountKANNE = details3
        //     .filter(obj => obj.$.Supplier === 'KANNEGFRAN')
        //     .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
        //     .reduce((sum, amount) => sum + amount, 0);
        // const totalAmountSODI = details3
        //     .filter(obj => obj.$.Supplier === 'SODILEC')
        //     .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
        //     .reduce((sum, amount) => sum + amount, 0);
        // const totalAmountSILER = details3
        //     .filter(obj => obj.$.Supplier === 'SILER')
        //     .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
        //     .reduce((sum, amount) => sum + amount, 0);
        // const totalAmountPMV = details3
        //     .filter(obj => obj.$.Supplier === 'PMV')
        //     .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
        //     .reduce((sum, amount) => sum + amount, 0);
        // const totalAmountNUOVA = details3
        //     .filter(obj => obj.$.Supplier === 'NUOVAFOLATI')
        //     .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
        //     .reduce((sum, amount) => sum + amount, 0);





        // Créer une liste des éléments dans les lignes JENSENCHINA + créer une variable gaz true or false /////////
        const jecnItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'JENSENCHINA');
        const lineText1Values = jecnItems.map(item => item.$.LineText1);
        const lineText1Concatenatedcn = lineText1Values.join(' + ');
        const gaz = lineText1Concatenatedcn.includes("gas");

        console.log("JECN gaz = " + gaz);

        // Créer une liste des éléments dans les lignes JEDK + créer une variable gaz true or false /////////
        const jedkItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'JENSENDK');
        const lineText1Valuesdk = jedkItems.map(item => item.$.LineText1);
        const lineText1Concatenateddk = lineText1Valuesdk.join(' + ');
        const gazdk = lineText1Concatenateddk.includes("gas");

        console.log("JEDK gaz = " + gazdk);

        // Créer une liste des éléments dans les lignes JESW + créer une variable gaz true or false /////////
        const jeswItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'JENSENSWED');
        const lineText1Valuessw = jeswItems.map(item => item.$.LineText1);
        const lineText1Concatenatedsw = lineText1Valuessw.join(' + ');


        // Créer une liste des éléments dans les lignes JEDE + créer une variable gaz true or false /////////
        const jedeItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'SENKING');
        const lineText1Valuesde = jedeItems.map(item => item.$.LineText1);
        const lineText1Concatenatedde = lineText1Valuesde.join(' + ');
        const gazde = lineText1Concatenatedde.includes("gas");

        console.log("JEDE gaz = " + gazde);

        // Créer une liste des éléments dans les lignes JEUS + créer une variable gaz true or false /////////
        const jeusItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'JENUSAEURO');
        const lineText1Valuesus = jeusItems.map(item => item.$.LineText1);
        const lineText1Concatenatedus = lineText1Valuesus.join(' + ');

        // Créer une liste des éléments dans les lignes JEUS + créer une variable gaz true or false /////////
        const INWATECItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'INWATEC');
        const lineText1Valuesiw = jeusItems.map(item => item.$.LineText1);
        const lineText1Concatenatediw = lineText1Valuesus.join(' + ');


        // Créer une liste des éléments dans les lignes JEUS + créer une variable gaz true or false /////////
        const autreItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'JENSEN');
        const lineText1ValuesAutre = autreItems.map(item => item.$.LineText1);
        const lineText1ConcatenatedAutre = lineText1ValuesAutre.join(' + ');
        console.log("Autre liste = " + lineText1ConcatenatedAutre);

        /////////////////////////// extraction delivery dates //////////////////////////////////////////

        const jecnItemsdeliv = result.Report.Tablix6[0].Details3_Collection[0].Details3;

        const jensenchinaDates = new Set();
        const jensendkDates = new Set();
        const jensenswedDates = new Set();
        const senkingDates = new Set();
        const jenusaeuroDates = new Set();
        const iwDates = new Set();

        jecnItemsdeliv.forEach(item => {
            const supplier = item.$.Supplier;
            const deliveryDate = item.$.DeliveryDate;
            const dateString = deliveryDate;

            if (supplier === 'JENSENCHINA') {
                jensenchinaDates.add(dateString);
            } else if (supplier === 'JENSENDK') {
                jensendkDates.add(dateString);
            } else if (supplier === 'JENSENSWED') {
                jensenswedDates.add(dateString);
            } else if (supplier === 'SENKING') {
                senkingDates.add(dateString);
            } else if (supplier === 'JENUSAEURO') {
                jenusaeuroDates.add(dateString);
            } else if (supplier === 'INWATEC') {
                jenusaeuroDates.add(dateString);
            }
        });

        const jecnDates = [...jensenchinaDates];
        const jedkDates = [...jensendkDates];
        const jeswedDates = [...jensenswedDates];
        const jedeDates = [...senkingDates];
        const jeusDates = [...jenusaeuroDates];
        const jeiwDates = [...iwDates];



        /////////// Sum up DeliverRemainderAmountCurrency when Supplier is "JENSEN" and LineText1 includes "Manutention"
        const manutention = result.Report.Tablix6.reduce((accumulator, tablix) => {

            tablix.Details3_Collection.forEach(details => {
                details.Details3.forEach(detail => {
                    if (detail["$"].Supplier === "JENSEN" && detail["$"].LineText1.includes("Manutention")) {
                        accumulator += parseFloat(detail["$"].DeliverRemainderAmount2);
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
                    noManut += parseFloat(detail.DeliverRemainderAmount2);
                }
            }

        }
        console.log(noManut);

        const totalTotal = Math.round(totalAmountJECN + totalAmountJEDK + totalAmountJESWED + totalAmountJEUS + totalAmountJEDE + totalAmountTransport + manutention + noManut);
        const checkSumProject = (totalTotal === totalCommandes);

        console.log(totalTotal);
        console.log(`totalCommandes: ${totalCommandes} €`);
        console.log('check sum = ' + checkSumProject);

        const projectData = {
            today: today,
            nom: projectName,
            quote: quote,
            prixVente: prixVente,
            margePIF: margePIF,
            margeCurrent: margeCurrent,
            sommeCN: totalAmountJECN,
            sommeDK: totalAmountJEDK,
            sommeSW: totalAmountJESWED,
            sommeUS: totalAmountJEUS,
            sommeDE: totalAmountJEDE,
            sommeIW: totalAmountINWATEC,


            sommeOLDAM: totalAmounts.DIRECTOLDHAM,
            sommeTCS: totalAmounts.DIRECTTCS,
            sommeSATELEC: totalAmounts.DIRECTSATELEC,
            sommeAPAVE: totalAmounts.APAVE,
            sommeKANNE: totalAmounts.KANNEGFRAN,
            sommeSODI: totalAmounts.SODILEC,
            sommeSILER: totalAmounts.DIRECTSILER,
            sommeFRADIN: totalAmounts.DIRECTFRADIN,
            sommePMV: totalAmounts.PMV,
            sommeNUOVA: totalAmounts.NUOVAFOLATI,
            sommeDATAMARS: totalAmounts.DIRECTDATAMARS,
            sommeQSP: totalAmounts.DIRECTQSP,
            sommeHERREWYN : totalAmounts.DIRECTHERREWYN,

            paid: paid,
            warranty: warranty,
            services: services,
            transport: totalAmountTransport,
            lineText1Concatenatedcn: lineText1Concatenatedcn,
            lineText1Concatenateddk: lineText1Concatenateddk,
            lineText1Concatenatedsw: lineText1Concatenatedsw,
            lineText1Concatenatedde: lineText1Concatenatedde,
            lineText1Concatenatedus: lineText1Concatenatedus,
            lineText1ConcatenatedAutre: lineText1ConcatenatedAutre,
            gaz: gaz,
            manutention: manutention,
            noManut: noManut,
            jedkDates: jedkDates,
            jeswedDates: jeswedDates,
            jedeDates: jedeDates,
            jecnDates: jecnDates,
            jeusDates: jeusDates,
            jeiwDates: jeiwDates,
            totalTotal: totalTotal,
            totalCommandes: totalCommandes,
            checkSumProject: checkSumProject,

        };


        const existingProject = await Project.findOne({ quote: quote });

        if (existingProject) {


            Project.findOneAndUpdate({ quote: quote }, projectData, { new: true }, (error, project) => {
                if (error) {
                    console.error(error);
                } else {
                    // console.log(project);
                    console.log('project updated');
                }
            });
        } else {
            Project.create(projectData, (error, project) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('project created');
                }
            });
        }
    } catch (err) {
        console.error(err);
    }
})();



app.route('/projects')
    .get((req, res) => {
        Project.find((err, projects) => {
            if (err) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(200).json(projects);
            }
        });
    })
    .post((req, res) => {
        const {
            nom,
            quote,
            prixVente,
            margePIF,
            sommeCN,
            sommeDK,
            sommeUS,
            sommeDE,
            sommeIW,
            sommeKANNE,
            sommeSODI,
            sommeSILER,
            sommeFRADIN,
            sommePMV,
            sommeNUOVA,
            sommeOLDAM,
            sommeTCS,
            sommeSATELEC,
            sommeAPAVE,
            sommeDATAMARS,
            sommeQSP,
            sommeHERREWYN,

            paid,
            warranty,
            services,
            transport,
            lineText1Concatenatedcn,
            lineText1Concatenateddk,
            lineText1Concatenatedsw,
            lineText1Concatenatedde,
            lineText1Concatenatedus,
            lineText1ConcatenatedAutre,
            gaz,
            manutention,
            noManut,
            jedkDates,
            jeswedDates,
            jedeDates,
            jecnDates,
            jeusDates,
            jeiwDates,
            totalTotal,
            totalCommandes,
            newField0,
            newField1,
            newField2,
            newField3,
            newField4,
            newField5,
            newField6,
            newField7,
            newField8,
            newField9,
            dField0,
            dField1,
            dField2,
            dField3,
            dField4,
            dField5,
            dField6,
            dField7,
            dField8,
            dField9,
        } = req.body;

        const project = new Project({
            nom,
            quote,
            prixVente,
            margePIF,
            sommeCN,
            sommeDK,
            sommeUS,
            sommeDE,
            sommeIW,
            sommeKANNE,
            sommeSODI,
            sommeSILER,
            sommeFRADIN,
            sommePMV,
            sommeNUOVA,
            sommeOLDAM,
            sommeTCS,
            sommeSATELEC,
            sommeAPAVE,
            sommeDATAMARS,
            sommeQSP,
            sommeHERREWYN,

            paid,
            warranty,
            services,
            transport,
            lineText1Concatenatedcn,
            lineText1Concatenateddk,
            lineText1Concatenatedsw,
            lineText1Concatenatedde,
            lineText1Concatenatedus,
            lineText1ConcatenatedAutre,
            gaz,
            manutention,
            noManut,
            jedkDates,
            jeswedDates,
            jedeDates,
            jecnDates,
            jeusDates,
            jeiwDates,
            totalTotal,
            totalCommandes
        });



        project.save((err) => {
            if (err) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(201).json(project);
            }
        });
    })





app.patch('/debrief', (req, res) => {

    const filter = req.body.filter;
    const update = req.body.update;

    // Find the project by quote and update the newField
    Project.findOneAndUpdate(filter, update,
        { new: true }, // return the updated document
        (err, doc) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'An error occurred while updating the document.' });
            } else {
                console.log(doc);
                res.status(200).json({ message: 'Document updated successfully.' });
            }
        }
    );
});



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

