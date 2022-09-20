import React, { useState } from "react";
import "./typeSearch.css";
const TypeSearch = ({ typeList, queryType, setQueryType }) => {
  const [isDorpdown, setIsDropdown] = useState(false);
  return (
    <div className="type-search-bar">
      <button
        className="type-search-bar-button"
        onClick={() => setIsDropdown(!isDorpdown)}
      >
        <h2>Choose a Type of Pokemon</h2>
      </button>
      <div className={isDorpdown ? "type-search" : "type-search-off"}>
        <div className="type-search-grid">
          {typeList.map((type, index) => (
            <button
              key={index}
              className="type-search-bar-button_open"
              onClick={() => setQueryType(type.name)}
            >
              <p>{type.name}</p>
            </button>
          ))}
        </div>
        <button
          className="type-search-bar-button_open"
          onClick={() => setQueryType("")}
        >
          <p>CLEAR</p>
        </button>
      </div>
    </div>
  );
};

export default TypeSearch;
