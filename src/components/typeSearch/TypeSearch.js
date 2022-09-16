import React from "react";
import "./typeSearch.css";
const TypeSearch = ({ typeList, queryType, setQueryType }) => {
  return (
    <div className="type-search">
      {typeList.map((type) => (
        <button onClick={()=>setQueryType(type.name)}>{type.name}</button>
      ))}
      
      <button onClick={()=>setQueryType("")}>X</button>
    </div>
  );
};

export default TypeSearch;
