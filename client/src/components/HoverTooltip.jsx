import React, { useState } from 'react';
import Card from './Card';
import infos from '../infos';
import Entry from './Entry';


function createEntry(infoTerm) {
  return (
    <Entry
      key={infoTerm.id}
      name={infoTerm.name}
      img={infoTerm.imgURL}
      description={infoTerm.description}
    />
  );
}

const HoverTooltip = ({ children, tooltip }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {isHovering && <div className="tooltip">
      
      <Card />
      {tooltip}
      
      </div>}
    </div>
  );
};

export default HoverTooltip;