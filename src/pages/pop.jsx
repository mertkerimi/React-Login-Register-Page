import React from "react";
import { CircleSpinner } from "react-spinners-kit";
import "../App.css";


export default function Pop(props) {
  return (
    <>
      <div className="pop">
        <CircleSpinner size={130} color="#002654" />
        <h1>{props.children}</h1>
      </div>
    </>
  );
}
