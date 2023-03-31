const cors = require("cors");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "consultorio",
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM pacientes WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length == 0) {
        connection.query(
          "INSERT INTO pacientes (nome, email, senha) VALUES (?, ?, ?)",
          [name, email, password],
          (err, result) => {
            if (err) {
              red.send(err);
            }

            res.send({ msg: "Cadastrado com Sucesso!" });
          }
        );
      } else {
        res.send({ msg: "Email ja cadastrado" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
