import React from "react";


function Card(props) {
    return (
        <div>
            <div className="card">
                <div className="top">
                    <h2 className="name">{props.name}</h2>
                    <img className="circle-img2"
                        src={props.img}
                        alt="avatar_img"
                    />
                </div>
                <div className="bottom">
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
}


export default Card;


