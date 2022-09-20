import React from "react";
import "./header.css";
import pokedex from "../../img/pokedex.png";
const Header = () => {
  return (
    <div className="header">
      <a href="https://www.linkedin.com/in/julian-bleker/" target="blank">
        <img src={pokedex} alt="pokedex" width={"200px"} />
      </a>
    </div>
  );
};

export default Header;
