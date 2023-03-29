import React, { useState, useEffect } from "react";

function Assistant(props) {
  const [planURL, setPlanURL] = useState(null);

  useEffect(() => {
    const loadPlanImage = async () => {
      try {
        const imageModule = await import(`../static/plans/${props.quote}.png`);
        setPlanURL(imageModule.default);
      } catch (error) {
        console.error(`Image file not found: ${props.quote}.png`);
        setPlanURL(null);
      }
    };

    loadPlanImage();
  }, [props.quote]);

  return (
    <div>
      <div>
        {/* <h4>{props.name}</h4> */}
        <h4>How may I help you today?</h4>
        <div>
          <h4>- -</h4>

          <h4>Planning </h4>

          {planURL && <img src={planURL} alt={props.quote} width="100%" />}

          <h4>Envoyer email client : validation date d'installation </h4>
          <h4>Envoyer email ADV : check transport </h4>
          <h4>Envoyer email ST : check équipes </h4>
          <h4>Envoyer email WEISHAUPT </h4>
          <h4>Consulter pour installation</h4>
          <h4>Consulter pour raccordement</h4>
        </div>
      </div>
    </div>
  );
}

export default Assistant;