import React, { useState } from "react";
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  
	const handleSubmitRegister = () => {
	  axios.post("http://localhost:3001/register", {
		name,
		email,
		password
	  }).then(response => {
		console.log(response);
	  }).catch(error => {
		console.log(error);
	  });
	};

  	return (
      <div>
        <form onSubmit={ handleSubmitRegister }>
			<h2>Criar Cadastro</h2>
			<div className="text-field">
			  <label>Nome:</label>
			  <input
			  	id="name"
			    type="text"
			    value={name}
			    onChange={e => setName(e.target.value)}
			    required
			  />
			</div>
			<br />
			<div className="text-field">
			  <label>Email:</label>
			  <input
			  	id="email"
			    type="email"
			    value={email}
			    onChange={e => setEmail(e.target.value)}
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
			    onChange={e => setPassword(e.target.value)}
			    required
			  />
			</div>
			<br />
			<footer>
				<button type="submit" className="btn btn-primary button">Cadastrar</button>
				<br />				
				<a href="/">
            		<button type="button" className="btn btn-danger button">Já tenho uma conta</button>
          		</a>
			</footer>
        </form>
      </div>
    );
}

export default Register;
