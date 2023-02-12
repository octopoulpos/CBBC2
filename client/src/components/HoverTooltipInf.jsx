import React, { useState } from 'react';
import Card from './Card';

const HoverTooltipInf = ({ children, tooltip }) => {
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
             name="Informatique"
            img="https://cdn.discordapp.com/attachments/995431387333152778/1074375851203887185/AI_Octopoulpos_computeur_screen_with_code_lines_266aa984-e75d-4e7d-bfb8-9763b2bba4a4.png"
            description="Découvrez nos services informatiques, création de site internet et applications pour vous assister dans la gestion de votre blanchisserie"
          />
        }
        {tooltip}

      </div>}
    </div>
  );
};

export default HoverTooltipInf;
