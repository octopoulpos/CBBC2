import React from "react";
import Input from "./Input";

function Login(props) {
  return (
    <div className="container">
      {/* <h1>xxx</h1> */}
      <form className="form">
        <Input type="text" placeholder="Nom d'utilisateur" />
        <Input type="password" placeholder="Password" />
        {props.isRegistered === false && <Input type="password" placeholder="Confirmer Password" />}
        <button type="submit">{props.isRegistered ? "Connexion" : "S'enregister"}</button>
      </form>
    </div>
  );
}

export default Login;
