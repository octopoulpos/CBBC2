import React from "react";
import Input from "./Input";

function Login(props) {
  return (
    <div className="container">
      {/* <h1>xxx</h1> */}
      <form method="post" action="/users" className="form">
        <Input type="text" placeholder="Nom d'utilisateur" name="nom"/>
        <Input type="password" placeholder="Password" name="password" />
        {props.isRegistered === false && <Input type="password" placeholder="Confirmer Password" name="passwordcc" />}
        <button type="submit">{props.isRegistered ? "Connexion" : "S'enregister"}</button>
      </form>
    </div>
  );
}

export default Login;

