import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import axios from "axios";

const ProjectMongo = (props) => {

    const [deliveryDates, setDeliveryDates] = useState({});

    // Format the delivery dates
    useEffect(() => {
        const formattedDeliveryDates = {};
        Object.keys(props).forEach((country) => {
            const dates = props[country];
            if (Array.isArray(dates)) {
                const formattedDates = dates.map((date) => {
                    const diffTime = new Date(date) - new Date();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const color = diffDays < 14 ? "rgb(140, 0, 19)" : "blue";
                    return (
                        <span style={{ color }}>
                            {new Date(date).toLocaleDateString()} ({diffDays}{" "}
                            {diffDays === 1 ? "day" : "jours"})
                        </span>
                    );
                });
                formattedDeliveryDates[country] = formattedDates;
            }
        });
        setDeliveryDates(formattedDeliveryDates);
    }, [props]);

    ///// paramètres du tableau AX //////
    const data = [
        { name: "JEDK", Total: props.totalDK + " €", liste: props.listeDK },
        { name: "JEDE", Total: props.totalDE + " €", liste: props.listeDE },
        { name: "JECN", Total: props.totalCN + " €", liste: props.listeCN },
        { name: "JEUS", Total: props.totalUS + " €", liste: props.listeUS },
        { name: "JEIW", Total: props.totalIW + " €", liste: props.listeIW },
        { name: "KANNE", Total: props.totalKANNE + " €", liste: "" },
        { name: "SODI", Total: props.totalSODI + " €", liste: "" },
        { name: "PMV", Total: props.totalPMV + " €", liste: "" },
        { name: "OLDAM", Total: props.totalOLDAM + " €", liste: "" },
        { name: "TCS", Total: props.totalTCS + " €", liste: "" },
        { name: "SATELEC", Total: props.totalSATELEC + " €", liste: "" },
        { name: "APAVE", Total: props.totalAPAVE + " €", liste: "" },
        { name: "Manutention/Install", Total: props.totalManut + " €", liste: "" },
        { name: "Transport", Total: props.transport + " €", liste: "" },
        { name: "warranty", Total: props.warranty + " €", liste: "" },
        { name: "services", Total: props.services + " €", liste: "" },
        { name: "Autre JEFR", Total: props.totalNoManut + " €", liste: "" },
    ]

    const dataDebrief = [
        { name: "0", Total: props.newField0 + " €", liste: props.dField0 },
        { name: "1", Total: props.newField1 + " €", liste: props.dField1 },
        { name: "2", Total: props.newField2 + " €", liste: props.dField2 },
        { name: "3", Total: props.newField3 + " €", liste: props.dField3 },
        { name: "4", Total: props.newField4 + " €", liste: props.dField4 },
        { name: "5", Total: props.newField5 + " €", liste: props.dField5 },
        { name: "6", Total: props.newField6 + " €", liste: props.dField6 },
        { name: "7", Total: props.newField7 + " €", liste: props.dField7 },
        { name: "8", Total: props.newField8 + " €", liste: props.dField8 },
        { name: "9", Total: props.newField9 + " €", liste: props.dField9 },

    ]

    const totalNewFields = [
        props.newField0,
        props.newField1,
        props.newField2,
        props.newField3,
        props.newField4,
        props.newField5,
        props.newField6,
        props.newField7,
        props.newField8,
        props.newField9
    ].reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue || 0), 0);


    const filteredData = data.filter(item => {
        const total = item.Total;
        const parsedTotal = parseFloat(total.replace(" €", "").replace(",", "."));
        return !isNaN(parsedTotal) && parsedTotal !== 0;
    });

    const filteredDataDebrief = dataDebrief.filter(item => {
        const total = item.Total;
        const parsedTotal = parseFloat(total.replace(" €", "").replace(",", "."));
        return !isNaN(parsedTotal) && parsedTotal !== 0;
    });

    const dataWithValues = data.filter(item => {
        const total = item.Total;
        return typeof total === 'string' && total.trim().length > 0;
    });

    const totalData = Math.round(dataWithValues.reduce((total, item) => {
        const value = parseFloat(item.Total.replace(" €", "").replace(",", "."));
        return isNaN(value) ? total : total + value;
    }, 0)).toFixed(0) + " €";

    // const totalCommandes = props.totalCommandes;
    const totalCommandesWarrantyService = props.totalCommandes + props.warranty + props.services;

    const totalDebrief = props.totalCommandes + props.warranty + props.services + totalNewFields;

    const margeAjustee = Math.round(((1 - (totalDebrief / props.prixVente)) * 100) * 100) / 100;




    //////// create a form to update the DB ///////////////

    const [quoi, setQuoi] = useState("");
    const [prix, setPrix] = useState("");
    const [description, setDescription] = useState("");

    const handleQuoiChange = (event) => {
        setQuoi(event.target.value);
    };

    const handlePrixChange = (event) => {
        setPrix(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        const fieldNumber = parseInt(quoi);
        const update = { $set: { [`newField${fieldNumber}`]: prix, [`dField${fieldNumber}`]: description } }
        // const update = { $set: { [`newField${fieldNumber}`]: prix } };
        const filter = { quote: props.quote };
        axios

            .patch("/debrief", { filter, update })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };



    //////

    const [showDebrief, setShowDebrief] = useState(false);
    const [showAX, setShowAX] = useState(false);
    const [showAssist, setShowAssist] = useState(false);

    const toggleDebrief = () => {
        setShowDebrief(!showDebrief);
    };
    const toggleAX = () => {
        setShowAX(!showAX);
    };
    const toggleAssist = () => {
        setShowAssist(!showAssist);
    };

    return (
        <div className="projet">
            <div className="projetA">

                <h2 style={{ cursor: 'pointer' }} onClick={toggleAX}>{props.name} </h2>
                <div className={`ax ${showAX ? "visible" : ""}`}>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Total</th>
                                <th>Liste</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.name}</td>
                                        <td>{val.Total}</td>
                                        <td>{val.liste}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
                <h2 style={{ cursor: 'pointer' }} onClick={toggleDebrief}> Débriefing </h2>
                <div className={`debrief ${showDebrief ? "visible" : ""}`}>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Total</th>
                                <th>Liste</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.name}</td>
                                        <td>{val.Total}</td>
                                        <td>{val.liste}</td>
                                    </tr>
                                )
                            })}
                            {filteredDataDebrief.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{val.name}</td>
                                        <td>{val.Total}</td>
                                        <td>{val.liste}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
                <ProgressBar percentage={props.percent} />
                {deliveryDates["ewdk"] && deliveryDates["ewdk"].length > 0 && (
                    <h3>
                        Delivery date DK: {deliveryDates["ewdk"]}
                    </h3>
                )}
                {deliveryDates["ewde"] && deliveryDates["ewde"].length > 0 && (
                    <h3>
                        Delivery date DE: {deliveryDates["ewde"]}
                    </h3>
                )}
                {deliveryDates["ewcn"] && deliveryDates["ewcn"].length > 0 && (
                    <h3>
                        Delivery date CN: {deliveryDates["ewcn"]}
                    </h3>
                )}
                {deliveryDates["ewus"] && deliveryDates["ewus"].length > 0 && (
                    <h3>
                        Delivery date US: {deliveryDates["ewus"]}
                    </h3>
                )}
                {deliveryDates["ewiw"] && deliveryDates["ewiw"].length > 0 && (
                    <h3>
                        Delivery date INWATEC: {deliveryDates["ewiw"]}
                    </h3>
                )}
                <h3><br></br></h3>
                <img
                    onClick={toggleAssist}
                    className="circle-imgPM"
                    src="https://cdn.discordapp.com/attachments/1075129047379624157/1081975071314301018/AI_Octopoulpos_shes_my_beautiful_personal_assistant_manga_style_0e9c0392-656a-4a44-ab1d-ace7cb391e0a.png"
                    alt="avatar_img"
                    title="Hi dear, how may I help you today ?"
                />
                <div className={`assist ${showAssist ? "visible" : ""}`}>
                    <h3>Hi darling ! I'm your personnal assistant, how may I help you today ?</h3>
                    <h4>Planning </h4>
                    <h4>Plan </h4>
                    <h4>Envoyer email client : validation date d'installation </h4>
                    <h4>Envoyer email ADV : check transport </h4>
                    <h4>Envoyer email ST : check équipes </h4>
                    <h4>Envoyer email WEISHAUPT </h4>
                    <h4>Consulter pour installation</h4>
                    <h4>Consulter pour raccordement</h4>
                </div>

            </div>
            <div className="projetB">

                <h4>quote : {props.quote}</h4>
                <h4>Last AX import : {props.today}</h4>
                <h4>Prix de vente : {props.prixVente + " €"}</h4>
                <h4>Marge PIF : {props.margePIF + " %"}</h4>
                <h4>Marge en cours : {props.margeCurrent + " %"}</h4>
                <h4>Total AX : {totalCommandesWarrantyService + " €"}</h4>
                <h4>Total Commandes en cours  : {totalData + " €"}</h4>
                <h4 className="debriefh4">Total Ajusté  : {totalDebrief + " €"}</h4>
                <h4 className="debriefh4">Marge Ajusté  : {margeAjustee + " %"}</h4>

                <form onSubmit={handleSubmit}>
                    <label>
                        N° :
                        <input type="text" value={quoi} onChange={handleQuoiChange} />
                    </label>
                    <label>
                        Coût :
                        <input type="text" value={prix} onChange={handlePrixChange} />
                    </label>
                    <label>
                        Déscription :
                        <input type="text" value={description} onChange={handleDescriptionChange} />
                    </label>
                    <button type="submit">Envoyer</button>
                </form>

            </div>
        </div>
    );
};
export default ProjectMongo;