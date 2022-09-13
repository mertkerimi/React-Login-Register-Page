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
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
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

    if (!form.email || !form.password || !isEmailValid || !isPasswordValid) {
      setErrors({
        email:
          (!form.email && "Email field cannot be empty!") ||
          (!isEmailValid && "Please enter a valid email address!"),
        password:
          (!form.password && "Password field cannot be empty!") ||
          (!isPasswordValid && "Your password must be at least 6 characters!"),
      });
    }

    axios
      .post("https://intern-example.vercel.app/auth/login", form)
      .then((response) => {
        if (response.request.status === 200) {
          localStorage.setItem("token", response.data.accesToken);
          setIsPop(true);
          setTimeout(() => {
            window.location.replace("/success");
          }, 2000);
        }
      })
      .catch((e) =>
        alert("Login Failed! Please enter a valid e-mail or password.")
      );
  };
  const goToRegister = (event) => {
    event.preventDefault();
    window.location.replace("/register");
  };

  return (
    <div>
      <div className="app">
        {isPop && <Pop>Success</Pop>}
        <form className="form">
          <h1>Login</h1>
          <InputComponent
            label="E-mail"
            placeholder="E-mail"
            value={form.email}
            name="email"
            onChange={onChange}
            error={errors.email}
          />
          <InputComponent
            label="Password"
            placeholder="Password"
            type="password"
            value={form.password}
            name="password"
            onChange={onChange}
            error={errors.password}
          />
          <Button onClick={onClick}>Login</Button>
          <Button onClick={goToRegister}>Register Page</Button>
        </form>
      </div>
    </div>
  );
}

export default App;
