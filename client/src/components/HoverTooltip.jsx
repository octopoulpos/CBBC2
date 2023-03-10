import React, { useState } from 'react';
import Card from './Card';

const HoverTooltip = ({ children, tooltip }) => {
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
             name="Blanchisserie"
            img="https://cdn.midjourney.com/39c910b7-968a-42d2-b1b9-33bb3fc98265/grid_0.png"
            description="Découvrez nos services dédiés aux blanchisseries industrielles."
          />
        }
        {tooltip}

      </div>}
    </div>
  );
};

export default HoverTooltip;
