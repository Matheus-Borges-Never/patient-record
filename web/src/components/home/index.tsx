import React, { useEffect, useState } from "react";
import "../../style/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/navbar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "../form/create";
import FormUpdate from "../form/update";
import axios from "axios";
import {
  validateEmailFormat,
  validateNameFormat,
  validatePhoneFormat,
  validateDateFormat,
  validateTreatmentFormat,
  validateStatusFormat,
} from "../../utils/validates/validadores";

function Home() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [treatment, setTreatment] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/patient", {
        params: {
          id,
          name,
          email,
          phone,
          birthdate,
          treatment,
          status,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (id: any) => {
    axios.delete("http://localhost:3001/patient/" + id).then(() => {
      window.location.reload();
      alert("Paciente foi excluido com sucesso!");
    });
  };

  const setData = (user: any) => {
    handleOpenEdit();
    let { id, nome, email, telefone, data_nascimento, tratamento, status_atual } = user;
        localStorage.setItem('Id', id);
        localStorage.setItem('Nome', nome);
        localStorage.setItem('Email', email);
        localStorage.setItem('Telefone', telefone);
        localStorage.setItem('Data Nascimento', data_nascimento);
        localStorage.setItem('Tratamento', tratamento);
        localStorage.setItem('Status', status_atual);
  };

  function formatBirthdate(date: string) {
    const formattedDate = new Date(date).toLocaleDateString("pt-BR");
    return formattedDate;
  }

  return (
    <div>
      <Navbar />

      <div className="container text-end containerAdd">
        <div className="row align-items-end">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">
            <button
              type="submit"
              onClick={handleOpen}
              className="btn btn-info buttonAdd"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>

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
                  <th scope="row">{user.nome}</th>
                  <td>{user.email}</td>
                  <td>{user.telefone}</td>
                  <td>{formatBirthdate(user.data_nascimento)}</td>
                  <td>{user.tratamento}</td>
                  <td>{user.status_atual}</td>
                  <td>
                    <button
                      type="button"
                      className="buttonEdit"
                      onClick={() => setData(user)}
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

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalSpace">
          <FormUpdate />
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalSpace">
          <Form />
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
