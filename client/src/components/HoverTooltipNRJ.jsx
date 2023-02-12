import React, { useState } from 'react';
import Card from './Card';

const HoverTooltipNRJ = ({ children, tooltip }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {isHovering && <div className="tooltip">
        {
          <Card
             name="Energie"
            img="https://cdn.midjourney.com/85b2ebe6-616c-43bc-91f9-2c7f1cebb669/grid_0.png"
            description="Audit de la consommation énergétique de votre usine - Services dédiés à la gestion de votre énergie."
          />
        }
        {tooltip}

      </div>}
    </div>
  );
};

export default HoverTooltipNRJ;
