import React, { useState } from "react";
import "../App.css";
import InputComponent from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import Pop from "./pop";

function maybeValidEmail(email) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

function maybeValidPassword(password) {
  const splittedPassword = password.split("");
  return splittedPassword.length > 5 ? true : false;
}

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const [isPop, setIsPop] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    console.log(form);

    const isEmailValid = maybeValidEmail(form.email);
    const isPasswordValid = maybeValidPassword(form.password);

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !isEmailValid ||
      !isPasswordValid
    ) {
      setErrors({
        name: !form.name && "Name field cannot be empty!",
        email:
          (!form.email && "Email field cannot be empty!") ||
          (!isEmailValid && "Please enter a valid email address!"),
        password:
          (!form.password && "Password field cannot be empty!") ||
          (!isPasswordValid && "Your password must be at least 6 characters!"),
      });
    }
    axios
      .post("https://intern-example.vercel.app/auth/register", form)
      .then((response) => {
        console.log(response);
        setIsPop(true);
        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      })
      .catch((e) => alert("Registration Failed. Try again!"));
  };
  const goToLogin = (e) => {
    e.preventDefault();
    window.location.replace("/login");
  };
  return (
    <div>
      <div className="app">
      {isPop && <Pop>Success</Pop>}
        <form className="form">
          <h1>Register</h1>
          <InputComponent
            className="input"
            placeholder="Name"
            label="Name"
            name="name"
            value={form.name}
            onChange={onChange}
            error={errors.name}
          />
          <InputComponent
            className="input"
            placeholder="E-mail"
            label="E-mail"
            name="email"
            value={form.email}
            onChange={onChange}
            error={errors.email}
          />
          <InputComponent
            className="input"
            label="Password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={onChange}
            error={errors.password}
          />
          <Button onClick={onClick}>Register</Button>
          <Button onClick={goToLogin}>Login Page</Button>
        </form>
      </div>
    </div>
  );
}

export default App;
