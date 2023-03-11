import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";


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


    const filteredData = data.filter(item => {
        const total = item.Total;
        return total !== undefined && parseFloat(total.replace(" €", "").replace(",", ".")) !== 0;
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

    //////// create a form to update the DB ///////////////

    const [quoi, setQuoi] = useState("");
    const [prix, setPrix] = useState("");

    const handleQuoiChange = (event) => {
        setQuoi(event.target.value);
    };

    const handlePrixChange = (event) => {
        setPrix(event.target.value);
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(props.quote);
        const filter = { quote: props.quote };
        const update = { $set: { newField: prix } }; // update the value of newField with prix
        fetch("/debrief", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filter, update }),
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
                <h4>Marge PIF : {props.margePIF}</h4>
                <h4>Marge en cours : {props.margeCurrent}</h4>
                <h4>Total AX : {totalCommandesWarrantyService + " €"}</h4>
                <h4>Total Commandes en cours  : {totalData + " €"}</h4>

                <form onSubmit={handleSubmit}>
                    <label>
                        Rentrer dépense :
                        <input type="text" value={quoi} onChange={handleQuoiChange} />
                    </label>
                    <label>
                        Coût :
                        <input type="text" value={prix} onChange={handlePrixChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>
    );
};
export default ProjectMongo;