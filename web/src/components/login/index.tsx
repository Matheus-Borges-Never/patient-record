import React, { useState } from "react";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Email: ${email} Password: ${password}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmitLogin}>
        <h2>Login</h2>
        <div className="text-field">
          <label>Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <br />
        <div className="text-field">
          <label>Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <br />
        <footer>
          <button type="submit" className="btn btn-primary button">Entrar</button>
          <br />          
          <a href="/register">
            <button type="button" className="btn btn-danger button">Criar conta</button>
          </a>
        </footer>
      </form>
    </div>
  );
};

export default Login;
