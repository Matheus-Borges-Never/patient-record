import React, { useState } from "react";
import "../../style/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-use-history";
import qs from "query-string";

const CLIENT_ID = "d92ba6935bdf41e6e3ba";
const BACK_END_URL = "http://localhost:3001/callback";

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
    const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user:email',
      client_id: CLIENT_ID,
      redirect_url: BACK_END_URL,
      state: 'test-t5'
    }
  
    const queryStrings = qs.stringify(params);
    const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
    window.location.href = authorizationUrl;
  }
  
  window.onload = async () => {
    const { code } = qs.parseUrl(window.location.href).query;
    if(code) {
      try {
        const response = await axios.post(`${process.env.BACK_END_URL}`, { code });
        const user = response.data;
        alert("você está logado, meu chapa! dá uma olhada no console!");
        console.log(user);
      } catch (err) {
        alert("ops, deu algum xabú");
        console.log("err", err);
      }
    }
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
      <form>
        <button
          type="button"
          className="btn btn-dark button"
          onClick={handleSubmitGithub}
        >
          Entrar com GitHub
        </button>
      </form>
    </div>
  );
}

export default Login;
