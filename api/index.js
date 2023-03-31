const express = require("express");
const app = express();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "consultorio",
});

connection.end();

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
