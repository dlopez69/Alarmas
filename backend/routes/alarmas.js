// routes/alarmas.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verificarToken = require("../middleware/verificarToken"); // Importar el middleware

// Crear una nueva alarma (ruta protegida)
router.post("/create", verificarToken, (req, res) => {
  const { descripcion, fecha } = req.body;
  const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token

  const query =
    "INSERT INTO alarmas (user_id, descripcion, fecha) VALUES (?, ?, ?)";
  db.query(query, [userId, descripcion, fecha], (err, result) => {
    if (err) {
      console.error("Error al crear la alarma: " + err.stack);
      res.status(500).send("Error al crear la alarma");
      return;
    }
    res.status(201).send("Alarma creada exitosamente");
  });
});

// Obtener las alarmas de un usuario autenticado (ruta protegida)
router.get("/", verificarToken, (req, res) => {
  const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token

  const query = "SELECT * FROM alarmas WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error al obtener las alarmas: " + err.stack);
      res.status(500).send("Error al obtener las alarmas");
      return;
    }
    res.status(200).json(results);
  });
});

// Eliminar una alarma (ruta protegida)
router.delete("/:id", verificarToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Asegúrate de que el usuario autenticado está eliminando su propia alarma

  const query = "DELETE FROM alarmas WHERE id = ? AND user_id = ?";
  db.query(query, [id, userId], (err, result) => {
    if (err) {
      console.error("Error al eliminar la alarma: " + err.stack);
      res.status(500).send("Error al eliminar la alarma");
      return;
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send("Alarma no encontrada o no pertenece al usuario.");
    }
    res.status(200).send("Alarma eliminada exitosamente");
  });
});

module.exports = router;
