const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/users");
const alarmasRoutes = require("./routes/alarmas");
const db = require("./config/db");
const verificarToken = require("./middleware/verificarToken"); // Importar el middleware
const enviarCorreoAlarma = require("./services/emailService");

// Middleware para parsear JSON
app.use(express.json());

// Middleware de CORS
app.use(cors());

// Usar las rutas de usuarios (No protegida)
app.use("/api/users", userRoutes);

// Usar las rutas de alarmas, protegidas con el middleware
app.use("/api/alarmas", verificarToken, alarmasRoutes);

// Ruta de prueba para verificar la conexión a la base de datos (No protegida)
app.get("/check-db", (req, res) => {
  db.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) {
      console.error("Error en la consulta: " + err.stack);
      res.status(500).send("Error al conectar con la base de datos");
      return;
    }
    res.send(
      `Conexión exitosa! Resultado de la consulta: ${results[0].solution}`
    );
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Revisa cada minuto si hay alarmas que deban enviarse
setInterval(() => {
  const query = "SELECT * FROM alarmas WHERE fecha <= NOW() AND enviada = 0"; // Alarmas no enviadas

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las alarmas: " + err.stack);
      return;
    }

    results.forEach((alarma) => {
      // Enviar correo al usuario de la alarma
      const userQuery = "SELECT email FROM users WHERE id = ?";
      db.query(userQuery, [alarma.user_id], (err, userResult) => {
        if (err) {
          console.error("Error al obtener el email del usuario: " + err.stack);
          return;
        }

        const userEmail = userResult[0].email;
        enviarCorreoAlarma(userEmail, alarma.descripcion, alarma.fecha);
      });

      // Marcar la alarma como enviada
      const updateQuery = "UPDATE alarmas SET enviada = 1 WHERE id = ?";
      db.query(updateQuery, [alarma.id], (err, result) => {
        if (err) {
          console.error("Error al marcar la alarma como enviada: " + err.stack);
        }
      });
    });
  });
}, 60000); // Revisar cada minuto
