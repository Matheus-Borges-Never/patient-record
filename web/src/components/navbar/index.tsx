import React from "react";
import { Link } from "react-router-dom";
import "../../style/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <h2 className="navbar-brand titleNavbar">Registro de Pacientes</h2>
        <Link to="/">
          <button
            type="button"
            className="btn btn-outline-danger buttonLogout"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </Link>
      </div>
      <br />
      <hr></hr>
    </nav>
  );
}

export default Navbar;