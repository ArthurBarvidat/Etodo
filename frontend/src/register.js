import React from "react";
import RegisterForm from "./Components/registerForms"
import "./App.css";

export default function registerPage(){
  return(
    <div className="cv-container">
      <h2>Inscription</h2>
      <RegisterForm/>
    </div>
  );
}