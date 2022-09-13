import React from "react";
import "../App.css";
import Button from "../components/Button";
const Success = () => {
  const logOut = (event) => {
    event.preventDefault();
    window.location.replace("/login");
  };
  return (
    <div>
      <div className="app">
        <form className="success-form">
          <h1>WELCOME!!</h1>
          <Button onClick={logOut}>Log Out</Button>
        </form>
      </div>
    </div>
  );
};

export default Success;
