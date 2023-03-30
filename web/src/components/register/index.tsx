import React, { useState } from "react";
import './style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
	const [name, setName] = useState("");
  	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");

  	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    	event.preventDefault();
    	console.log(`Name: ${name} Email: ${email} Password: ${password}`);
  	};

  	return (
      <div className="screenRegister">
        <form onSubmit={handleSubmit}>
			<h2>Criar Cadastro</h2>
			<div className="text-field">
			  <label htmlFor="name">Nome:</label>
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
			  <label htmlFor="email">Email:</label>
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
			  <label htmlFor="password">Senha:</label>
			  <input
			  	id="password"
			    type="password"
			    value={password}
			    onChange={(event) => setPassword(event.target.value)}
			    required
			  />
			</div>
			<br />
			<button type="submit">Cadastrar</button>
        </form>
      </div>
    );
}

export default Register;
