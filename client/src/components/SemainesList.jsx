import React from "react";
import Semaine from "./Semaine";
import semaines from "../semaines";

const SemainesList = () => {
  return (
    <div>
      {semaines.map((semaines) => (
        <Semaine
          key={semaines.id}
          name={semaines.name}
          done={semaines.done}
          jours={semaines.jours}
          suite={semaines.suite}
          notes={semaines.notes}
        />
      ))}
    </div>
  );
};

export default SemainesList;