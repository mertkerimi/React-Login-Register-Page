import React from "react";
import "../App.css";

const Button = (props) => {
  return <button className="btn" onClick={props.onClick}>{props.children}</button>;
};

export default Button;
