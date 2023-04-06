import cors from "cors";
import mysql from "mysql2";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import express, { json } from "express";
import axios from "axios";
import qs from "query-string";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: "containers-us-west-41.railway.app",
  user: "root",
  password: "fkOaPFvOzlXBtBzAEcuV",
  database: "railway",
});

const saltRounds = 10;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(json());

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM usuario WHERE email = ?",
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
        "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)",
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
    "SELECT * FROM usuario WHERE email = ?",
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

app.post("/patient", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const birthdate = req.body.birthdate;
  const treatment = req.body.treatment;
  const status = req.body.status;

  connection.query(
    "SELECT * FROM paciente WHERE email = ?",
    [email],
    (error, result) => {
      if (error) {
        res.sendStatus(500);
        return;
      }
      if (result.length > 0) {
        res.status(409).json({ msg: "Paciente já cadastrado" });
        return;
      }
      connection.query(
        "INSERT INTO paciente (nome, email, telefone, data_nascimento, tratamento, status_atual) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, phone, birthdate, treatment, status],
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

app.get("/patient", (req, res) => {
  connection.query("SELECT * FROM paciente", (error, result) => {
    if (error) return res.json(error);
    return res.status(200).json(result);
  });
});

app.put("/patient/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const birthdate = req.body.birthdate;
  const treatment = req.body.treatment;
  const status = req.body.status;

  connection.query(
    "UPDATE paciente SET nome = ?, email = ?, telefone = ?, data_nascimento = ?, tratamento = ?, status_atual = ? WHERE id = ?",
    [name, email, phone, birthdate, treatment, status, id],
    (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.delete("/patient/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "DELETE FROM paciente WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    }
  );
});

app.post("/callback", async (req, res) => {
  try {
    const token = await exchangeCodeForAccessToken(req.body.code);
    const user = await fetchUser(token);
  } catch (err) {
    console.log("err", err.response.data);
    res.sendStatus(500);
  }
});

async function exchangeCodeForAccessToken(code) {
  const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
  const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
  const params = {
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URL,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const parsedData = qs.parse(data);
  return parsedData.access_token;
}

async function fetchUser(token) {
  const GITHUB_ENDPOINT = "https://api.github.com/user";
  const response = await axios.get(GITHUB_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
