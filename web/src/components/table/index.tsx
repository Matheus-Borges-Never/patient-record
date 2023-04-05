import React, { useState, useEffect } from "react";
import axios from "axios";

function Table({ users, setUsers, setOnEdit }: any) {
  const [id] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [treatment, setTreatment] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  axios.get("http://localhost:3001/patient", {
    params: {
      id,
      name,
      email,
      phone,
      birthdate,
      treatment,
      status,
    },
  });

  const handleEdit = (item: any) => {
    alert("Alterar ainda não configurado");

    setOnEdit(item);
  };

  const handleDelete = (id: number) => {
    alert("Delete ainda não configurado");

    setOnEdit(null);
  };

  return (
    <div className="tablePatientes">
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Telefone</th>
              <th scope="col">Data de Nasc.</th>
              <th scope="col">Tratamento</th>
              <th scope="col">Status</th>
              <th scope="col">Editar</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <th scope="row">{user.name}</th>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.birthdate}</td>
                <td>{user.treatment}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    type="button"
                    className="buttonEdit"
                    onClick={() => handleEdit(user)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="buttonDelete"
                    onClick={() => handleDelete(user.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
