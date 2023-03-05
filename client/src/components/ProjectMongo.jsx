import React, { useState } from "react";
import ProgressBar from "./ProgressBar";


const ProjectMongo = (props) => {

    // Format the delivery dates
    const ewdkFormatted = props.ewdk.map(date => new Date(date).toLocaleDateString()).join(", ");
    const ewdeFormatted = props.ewde.map(date => new Date(date).toLocaleDateString()).join(", ");
    const ewcnFormatted = props.ewcn.map(date => new Date(date).toLocaleDateString()).join(", ");
    const ewusFormatted = props.ewus.map(date => new Date(date).toLocaleDateString()).join(", ");

    /////
    const data = [
        { name: "JEDK", Total: props.totalDK + " €", liste: props.listeDK },
        { name: "JEDE", Total: props.totalDE + " €", liste: props.listeDE },
        { name: "JECN", Total: props.totalCN + " €", liste: props.listeCN },
        { name: "JEUS", Total: props.totalUS + " €", liste: props.listeUS },
        { name: "Manutention/Install", Total: props.totalManut + " €", liste: "" },
        { name: "Transport", Total: props.transport + " €", liste: "" },
        { name: "Autre JEFR", Total: props.totalNoManut + " €", liste: "" },
    ]

    const totalData = props.totalDK + props.totalDE + props.totalCN + props.totalUS + props.totalManut + props.totalNoManut + props.transport + " €";
    const totalCommandes = props.totalCommandes;

    ////

    const [showDebrief, setShowDebrief] = useState(false);

    const toggleDebrief = () => {
        setShowDebrief(!showDebrief);
    };

    return (
        <div className="projet">
            <div className="projetA">

                <h2 style={{ cursor: 'pointer' }} onClick={toggleDebrief}>{props.name} </h2>
                <div className={`debrief ${showDebrief ? "visible" : ""}`}>

                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Total</th>
                            <th>Liste</th>
                        </tr>
                        {data.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.name}</td>
                                    <td>{val.Total}</td>
                                    <td>{val.liste}</td>
                                </tr>
                            )
                        })}
                    </table>

                </div>
                <ProgressBar percentage={props.percent} />
                <h3>Delivery date DK : {ewdkFormatted}</h3>
                <h3>Delivery date DE : {ewdeFormatted}</h3>
                <h3>Delivery date CN : {ewcnFormatted}</h3>
                <h3>Delivery date US : {ewusFormatted}</h3>
                <h3><br></br></h3>
                <h3>A suivre : {props.suite}</h3>
            </div>
            <div className="projetB">
                <h4>quote : {props.notes}</h4>
                <h4>Last AX import : {props.today}</h4>
                <h4>Marge PIF : {props.margePIF}</h4>
                <h4>Marge en cours : {props.margeCurrent}</h4>
                <h4>Total Commandes AX : {totalCommandes + " €"}</h4>
                <h4>Total Commandes en cours  : {totalData + " €"}</h4>
            </div>
        </div>
    );
};
export default ProjectMongo;