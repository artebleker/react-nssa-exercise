import React from "react";
import { images } from "../../assets/images";
const PokeStrengthAndWeakness = ({ title, strengthAndWeakness }) => {
  return (
    <div className="poke-sandw-total-container">
      <h3>{title}</h3>
      <div className="poke-sandw-container">
        {strengthAndWeakness.length > 0 ? (
          strengthAndWeakness.map((sw, index) => {
            return (
              <div key={index} className="poke-sandw">
                <img src={images.find((f) => f.name === sw).img} alt={sw} />
                <p>{sw.toUpperCase()}</p>
              </div>
            );
          })
        ) : (
          <p>This pokemon has not {title.toLowerCase()}</p>
        )}
      </div>
    </div>
  );
};

export default PokeStrengthAndWeakness;
