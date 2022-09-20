import React from "react";
import "./notFound.css";
import notFound from "../../img/notFound.jpg";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="not-found-page">
      <button className="back-button">
        <Link to={"/"}>Go Back ! </Link>
      </button>
      <h1>PAGE NOT FOUND</h1>
      <h1>404</h1>
      <img src={notFound} alt="Not Found" />
    </div>
  );
};

export default NotFound;
