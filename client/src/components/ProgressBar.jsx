import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-filled" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;