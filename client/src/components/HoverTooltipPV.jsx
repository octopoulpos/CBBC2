import React, { useState } from 'react';
import Card from './Card';

const HoverTooltipPV = ({ children, tooltip }) => {
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
             name="Photovoltaïque"
            img="https://dualsun.com/wp-content/uploads/2022/05/2-toiture-solaire-usine-mozzarella-dualsun.jpg"
            description="Etudes d'installation de centrales photovoltaïques - Autoconsommation en industrie."
          />
        }
        {tooltip}

      </div>}
    </div>
  );
};

export default HoverTooltipPV;
