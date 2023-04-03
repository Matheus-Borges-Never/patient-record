import React, { useState } from "react";
import "./style.scss";
import redirectToGithub from "../../utils/github";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-use-history";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        email,
        password,
      })
      .then(() => {
        history.push("/home");
      })
      .catch(() => {
        alert(
          "Não foi possível fazer o login. Verifique seu email e senha e tente novamente."
        );
      });
  };

  const handleSubmitGithub = () => {
    redirectToGithub();
  };

  return (
    <div className="formLogin">
      <form onSubmit={handleSubmitLogin}>
        <h2>Login</h2>
        <div className="text-field">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={100}
            required
          />
        </div>
        <br />
        <div className="text-field">
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            maxLength={20}
            required
          />
        </div>
        <br />
        <footer>
          <button type="submit" className="btn btn-primary button">
            Entrar
          </button>
          <br />
          <Link to="/register">
            <button type="button" className="btn btn-danger button">
              Criar conta
            </button>
          </Link>
          <br />
          <hr></hr>
        </footer>
      </form>
      <form onSubmit={handleSubmitGithub}>
        <button type="submit" value="github" className="btn btn-dark button">
          Entrar com GitHub
        </button>
      </form>
    </div>
  );
}

export default Login;
