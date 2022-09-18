import React, {useState} from "react";
import "./typeSearch.css";
const TypeSearch = ({ typeList, queryType, setQueryType }) => {
  const [isDorpdown, setIsDropdown ] = useState(false)
  return (
    <div className="type-search-bar">
      <button onClick={()=>setIsDropdown(!isDorpdown)}>View Types of Pokemon</button>
    <div className={isDorpdown? "type-search" : "type-search-off"}>
      {typeList.map((type) => (
        <button onClick={()=>setQueryType(type.name)}>{type.name}</button>
      ))}
      
      <button onClick={()=>setQueryType("")}>X</button>
    </div>
    </div>
  );
};

export default TypeSearch;
