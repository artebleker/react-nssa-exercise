import React from "react";
import "./typeSearch.css";
const TypeSearch = ({ typeList }) => {
  return (
    <div className="type-search">
      {typeList.map((type) => (
        <button >{type.name}</button>
      ))}
    </div>
  );
};

export default TypeSearch;
