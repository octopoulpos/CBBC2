import React, { useState } from 'react';

const HoverTooltip = ({ children, tooltip }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {isHovering && <div>{tooltip}</div>}
    </div>
  );
};

export default HoverTooltip;