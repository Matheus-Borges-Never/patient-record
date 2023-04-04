import React from "react";
import "../../style/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { IPatients } from "../../types/patients";

type Props = {
  patients: IPatients[];
  id: React.Dispatch<React.SetStateAction<IPatients[]>>;
  name: React.Dispatch<React.SetStateAction<IPatients[]>>;
  email: React.Dispatch<React.SetStateAction<IPatients[]>>;
  phone: React.Dispatch<React.SetStateAction<IPatients[]>>;
  birthdate: React.Dispatch<React.SetStateAction<IPatients[]>>;
  treatment: React.Dispatch<React.SetStateAction<IPatients[]>>;
  status: React.Dispatch<React.SetStateAction<IPatients[]>>;
}

function Table({ patients, id, name, email, phone, birthdate, treatment, status }: Props ) {
  return (
    <div className="tablePatientes">
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
          {patients.map((patient) => (
            <tr key={patient.id}>
              <th scope="row">{patient.name}</th>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>{patient.birthdate.toLocaleDateString()}</td>
              <td>{patient.treatment}</td>
              <td>{patient.status}</td>
              <td>
                <button type="button" className="buttonEdit">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </td>
              <td>
                <button type="button" className="buttonDelete">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
