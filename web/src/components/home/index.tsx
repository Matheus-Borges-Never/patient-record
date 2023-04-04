import React, { useState } from "react";
import "../../style/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import AddModal from "../../components/form";
import Navbar from "../../components/navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Form from "../../components/form";

function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <tr>
              <th scope="row">Matheus Borges</th>
              <td>matheusborgespaulino@gmail.com</td>
              <td>(16) 98801-6082</td>
              <td>31/12/2003</td>
              <td>Roacutan</td>
              <td>Em Processo</td>
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
          </tbody>
        </table>
      </div>

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
