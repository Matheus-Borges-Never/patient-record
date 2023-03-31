const cors = require("cors");
const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    (error, result) => {
      if (error) {
        res.sendStatus(500);
        return;
      }
      if (result.length > 0) {
        res.status(409).json({ msg: "Email já cadastrado" });
        return;
      }
      const hash = bcrypt.hashSync(password, saltRounds);
      connection.query(
        "INSERT INTO pacientes (nome, email, senha) VALUES (?, ?, ?)",
        [name, email, hash],
        (error, result) => {
          if (error) {
            console.error(error);
            res.sendStatus(500);
            return;
          }
          res.sendStatus(201);
        }
      );
    }
  );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM pacientes WHERE email = ?",
    [email],
    (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
      if (result.length == 0) {
        res.status(400).json({ msg: "Usuário não encontrado" });
        return;
      }
      bcrypt.compare(password, result[0].senha, (error, result) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
          return;
        }
        if (result) {
          res.sendStatus(200);
        } else {
          res.status(400).json({ msg: "Senha incorreta" });
        }
      });
    }
  );
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
