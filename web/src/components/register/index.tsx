import React, { useState } from "react";
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Register() {
	const [name, setName] = useState("");
  	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");

  	const handleSubmitRegister = (event: React.FormEvent<HTMLFormElement>) => {
    	event.preventDefault();
    	console.log(`Name: ${name} Email: ${email} Password: ${password}`);
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
			    onChange={(event) => setName(event.target.value)}
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
