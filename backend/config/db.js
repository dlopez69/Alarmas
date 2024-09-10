// config/db.js
const mysql = require("mysql2");

// Definir los parámetros de conexión
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "alarmas",
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error de conexión: " + err.stack);
    return;
  }
  console.log(
    "Conectado a la base de datos MySQL con ID " + connection.threadId
  );
});

module.exports = connection;
