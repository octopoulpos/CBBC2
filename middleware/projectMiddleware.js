const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const axios = require('axios');

const cors = require('cors');
const Project = require('../models/projectModel');

const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3400', 'https://cb-bc.fr'] }));

async function projectMiddleware() {

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


            const totalCommandes = Math.round(result.Report.Tablix6[0].$.Textbox113);
            const warranty = Math.round(result.Report.Tablix10[0].$.Textbox112);
            const services = Math.round(result.Report.Tablix9[0].ForecastModel_Collection[0].ForecastModel[0].$.CostAmount3);
            console.log("XXXXXX   " + warranty + "   XXXXX   " + services);


            const details3 = result.Report.Tablix6[0].Details3_Collection[0].Details3;
            const totalAmountJECN = details3
                .filter(obj => obj.$.Supplier === 'JENSENCHINA')
                .map(obj => parseFloat(obj.$['DeliverRemainderAmount2']))
                .reduce((sum, amount) => sum + amount, 0);
            const totalAmountJEDK = details3
                .filter(obj => obj.$.Supplier === 'JENSENDK')
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
                'SILER',
                'FRADIN',
                'PMV',
                'NUOVAFOLATI',
            ];

            const totalAmounts = {};

            suppliers.forEach(supplier => {
                totalAmounts[supplier] = calculateTotalAmount(supplier, details3);
            });

            console.log(totalAmounts);



            // Créer une liste des éléments dans les lignes JENSENCHINA + créer une variable gaz true or false /////////
            const jecnItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'JENSENCHINA');
            const lineText1Values = jecnItems.map(item => item.$.LineText1);
            const lineText1Concatenatedcn = lineText1Values.join(' + ');
            const gaz = lineText1Concatenatedcn.includes("gas");

            console.log(lineText1Concatenatedcn);
            console.log("JECN gaz = " + gaz);

            // Créer une liste des éléments dans les lignes JEDK + créer une variable gaz true or false /////////
            const jedkItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'JENSENDK');
            const lineText1Valuesdk = jedkItems.map(item => item.$.LineText1);
            const lineText1Concatenateddk = lineText1Valuesdk.join(' + ');
            const gazdk = lineText1Concatenateddk.includes("gas");

            console.log(lineText1Concatenateddk);
            console.log("JEDK gaz = " + gazdk);

            // Créer une liste des éléments dans les lignes JEDE + créer une variable gaz true or false /////////
            const jedeItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'SENKING');
            const lineText1Valuesde = jedeItems.map(item => item.$.LineText1);
            const lineText1Concatenatedde = lineText1Valuesde.join(' + ');
            const gazde = lineText1Concatenatedde.includes("gas");

            console.log(lineText1Concatenatedde);
            console.log("JEDE gaz = " + gazde);

            // Créer une liste des éléments dans les lignes JEUS + créer une variable gaz true or false /////////
            const jeusItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'JENUSAEURO');
            const lineText1Valuesus = jeusItems.map(item => item.$.LineText1);
            const lineText1Concatenatedus = lineText1Valuesus.join(' + ');

            console.log(lineText1Concatenatedus);

            // Créer une liste des éléments dans les lignes JEUS + créer une variable gaz true or false /////////
            const INWATECItems = result.Report.Tablix6[0].Details3_Collection[0].Details3.filter(item => item.$.Supplier === 'INWATEC');
            const lineText1Valuesiw = jeusItems.map(item => item.$.LineText1);
            const lineText1Concatenatediw = lineText1Valuesus.join(' + ');

            console.log(lineText1Concatenatediw);

            /////////////////////////// extraction delivery dates //////////////////////////////////////////

            const jecnItemsdeliv = result.Report.Tablix6[0].Details3_Collection[0].Details3;

            const jensenchinaDates = new Set();
            const jensendkDates = new Set();
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

            const totalTotal = Math.round(totalAmountJECN + totalAmountJEDK + totalAmountJEUS + totalAmountJEDE + totalAmountTransport + manutention + noManut);
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
                sommeUS: totalAmountJEUS,
                sommeDE: totalAmountJEDE,
                sommeIW: totalAmountINWATEC,


                sommeOLDAM: totalAmounts.DIRECTOLDHAM,
                sommeTCS: totalAmounts.DIRECTTCS,
                sommeSATELEC: totalAmounts.DIRECTSATELEC,
                sommeAPAVE: totalAmounts.APAVE,
                sommeKANNE: totalAmounts.KANNEGFRAN,
                sommeSODI: totalAmounts.SODILEC,
                sommeSILER: totalAmounts.SILER,
                sommeFRADIN: totalAmounts.FRADIN,
                sommePMV: totalAmounts.PMV,
                sommeNUOVA: totalAmounts.NUOVAFOLATI,

                warranty: warranty,
                services: services,
                transport: totalAmountTransport,
                lineText1Concatenatedcn: lineText1Concatenatedcn,
                lineText1Concatenateddk: lineText1Concatenateddk,
                lineText1Concatenatedde: lineText1Concatenatedde,
                lineText1Concatenatedus: lineText1Concatenatedus,
                gaz: gaz,
                manutention: manutention,
                noManut: noManut,
                jedkDates: jedkDates,
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
                        console.log(project);
                    }
                });
            } else {
                Project.create(projectData, (error, project) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log(project);
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }
    })();
};


module.exports = projectMiddleware;

//     app.route('/projects')
//         // .get((req, res) => {
//         //     Project.find((err, projects) => {
//         //         if (err) {
//         //             res.status(500).send({ message: err.message });
//         //         } else {
//         //             res.status(200).json(projects);
//         //         }
//         //     });
//         // })
//         .get((req, res) => {
//             Project.find((err, projects) => {
//                 if (err) {
//                     res.status(500).send({ message: err.message });
//                 } else {
//                     // Add this log statement to see the received data on the server
//                     console.log('Received data on /projects GET endpoint:', projects);
//                     res.status(200).json(projects);
//                 }
//             });
//         })
//         .post(async (req, res) => {
//             const {
//                 nom,
//                 quote,
//                 prixVente,
//                 margePIF,
//                 sommeCN,
//                 sommeDK,
//                 sommeUS,
//                 sommeDE,
//                 sommeIW,
//                 sommeKANNE,
//                 sommeSODI,
//                 sommeSILER,
//                 sommeFRADIN,
//                 sommePMV,
//                 sommeNUOVA,
//                 sommeOLDAM,
//                 sommeTCS,
//                 sommeSATELEC,
//                 sommeAPAVE,

//                 warranty,
//                 services,
//                 transport,
//                 lineText1Concatenatedcn,
//                 lineText1Concatenateddk,
//                 lineText1Concatenatedde,
//                 lineText1Concatenatedus,
//                 gaz,
//                 manutention,
//                 noManut,
//                 jedkDates,
//                 jedeDates,
//                 jecnDates,
//                 jeusDates,
//                 jeiwDates,
//                 totalTotal,
//                 totalCommandes,
//                 newField0,
//                 newField1,
//                 newField2,
//                 newField3,
//                 newField4,
//                 newField5,
//                 newField6,
//                 newField7,
//                 newField8,
//                 newField9,
//                 dField0,
//                 dField1,
//                 dField2,
//                 dField3,
//                 dField4,
//                 dField5,
//                 dField6,
//                 dField7,
//                 dField8,
//                 dField9,
//             } = req.body;
//             console.log('Received data on /projects POST endpoint:', req.body);

//             const project = new Project({
//                 nom,
//                 quote,
//                 prixVente,
//                 margePIF,
//                 sommeCN,
//                 sommeDK,
//                 sommeUS,
//                 sommeDE,
//                 sommeIW,
//                 sommeKANNE,
//                 sommeSODI,
//                 sommeSILER,
//                 sommeFRADIN,
//                 sommePMV,
//                 sommeNUOVA,
//                 sommeOLDAM,
//                 sommeTCS,
//                 sommeSATELEC,
//                 sommeAPAVE,

//                 warranty,
//                 services,
//                 transport,
//                 lineText1Concatenatedcn,
//                 lineText1Concatenateddk,
//                 lineText1Concatenatedde,
//                 lineText1Concatenatedus,
//                 gaz,
//                 manutention,
//                 noManut,
//                 jedkDates,
//                 jedeDates,
//                 jecnDates,
//                 jeusDates,
//                 jeiwDates,
//                 totalTotal,
//                 totalCommandes
//             });

//             project.save((err) => {
//                 if (err) {
//                     res.status(500).send({ message: err.message });
//                 } else {
//                     res.status(201).json(project);
//                 }
//             });
//         })





//     app.patch('/debrief', (req, res) => {

//         const filter = req.body.filter;
//         const update = req.body.update;

//         // Find the project by quote and update the newField
//         Project.findOneAndUpdate(filter, update,
//             { new: true }, // return the updated document
//             (err, doc) => {
//                 if (err) {
//                     console.error(err);
//                     res.status(500).json({ error: 'An error occurred while updating the document.' });
//                 } else {
//                     console.log(doc);
//                     res.status(200).json({ message: 'Document updated successfully.' });
//                 }
//             }
//         );
//     });

// }


