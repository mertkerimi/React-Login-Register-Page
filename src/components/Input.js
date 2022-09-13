import React from "react";
import classnames from "classnames";
//import '../App.css'
import "./input.css";

const InputComponent = (props) => {
  return (
    <div className="formInput">
      <label>{props.label}</label>
      <input 
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        className={classnames("input", { errorInput: props.error })}
      />
      {props.error && <p className="errorInput">{props.error}</p>}
    </div>
  );
};

export default InputComponent;
