import React, { useState } from "react";
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { validateEmailFormat, validatePasswordFormat, validateNameFormat  } from '../../utils/validadores'

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const isValidEmail = validateEmailFormat(email);
    if (!isValidEmail) {
      setErrorMessage("Email inválido. Por favor, insira um email válido.");
      return;
    }

    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        password,
      })
      .then(() => {
        alert("Paciente foi cadastrado com sucesso!");
      })
      .catch(() => {
		alert("Esse email já foi cadastrado");
      });
  };

  const validateInput = () => {
    return validateEmailFormat(email) 
    && validatePasswordFormat(password)
    && validateNameFormat(name)
  }

  return (
    <div className="register-page">
      <form onSubmit={handleSubmitRegister}>
        <h2>Criar Cadastro</h2>
        <div className="text-field">
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="text-field">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errorMessage && (
            <span className="invalid-feedback">{errorMessage}</span>
          )}
        </div>
        <div className="text-field">
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <footer>
          <button type="submit" className="btn btn-primary button" disabled={ !validateInput() }>
            Cadastrar
          </button>
          <br />
          <Link to="/">
            <button type="button" className="btn btn-danger button">
              Já tenho uma conta
            </button>
          </Link>
        </footer>
      </form>
    </div>
  );
}

export default Register;
