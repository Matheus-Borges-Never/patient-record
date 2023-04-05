import React, { useEffect, useState } from "react";
import "../../../style/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function FormUpdate() {
  const [id, setId] = useState<any>();
  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [phone, setPhone] = useState<any>("");
  const [birthdate, setBirthdate] = useState<any>("");
  const [treatment, setTreatment] = useState<any>("");
  const [status, setStatus] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("Id"));
    setName(localStorage.getItem("Nome"));
    setEmail(localStorage.getItem("Email"));
    setPhone(localStorage.getItem("Telefone"));
    setBirthdate(localStorage.getItem("Data Nascimento"));
    setTreatment(localStorage.getItem("Tratamento"));
    setStatus(localStorage.getItem("Status"));
  }, []);

  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .put("http://localhost:3001/patient/" + id, {
        name,
        email,
        phone,
        birthdate,
        treatment,
        status,
        id,
      })
      .then(() => {
        alert("Paciente foi alterado com sucesso!");
        window.location.reload();
      });
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmitEdit}>
        <h2>Alterar Paciente</h2>
        <br />
        <div className="row">
          <div className="col">
            <div className="text-field">
              <label htmlFor="name">Nome:</label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          </div>
          <div className="col">
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
          </div>
          <div className="col">
            <div className="text-field">
              <label htmlFor="phone">Telefone:</label>
              <input
                id="phone"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {errorMessage && (
                <span className="invalid-feedback">{errorMessage}</span>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="text-field">
              <label htmlFor="birthdate">Data de Nascimento:</label>
              <input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col">
            <div className="text-field">
              <label htmlFor="treatment">Tratamento:</label>
              <input
                id="treatment"
                type="text"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                required
              />
              {errorMessage && (
                <span className="invalid-feedback">{errorMessage}</span>
              )}
            </div>
          </div>
          <div className="col">
            <div className="text-field">
              <label htmlFor="status">Status:</label>
              <select
                className="form-select"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option selected value="status">
                  Status...
                </option>
                <option value="Negociando">Negociando</option>
                <option value="Em Tratamento">Em Tratamento</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Concluido">Concluido</option>
              </select>
              {errorMessage && (
                <span className="invalid-feedback">{errorMessage}</span>
              )}
            </div>
          </div>
        </div>
        <br />
        <footer>
          <button type="submit" className="btn btn-primary button">
            Alterar
          </button>
        </footer>
      </form>
    </div>
  );
}

export default FormUpdate;
