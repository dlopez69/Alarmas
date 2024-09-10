const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Asegúrate de importar bcrypt
const db = require("../config/db");

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("Faltan datos necesarios para el registro");
  }

  // Verifica si el usuario o correo ya existe
  const userExistsQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(userExistsQuery, [username, email], async (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).send("Error en el servidor");
    }
    if (results.length > 0) {
      return res
        .status(400)
        .send("El nombre de usuario o correo ya está en uso.");
    }

    try {
      // Hashea la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Obtiene la fecha actual para el campo created_at
      const createdAt = new Date();

      // Inserta el nuevo usuario en la base de datos, con email y created_at
      const query =
        "INSERT INTO users (username, password, email, created_at) VALUES (?, ?, ?, ?)";
      db.query(
        query,
        [username, hashedPassword, email, createdAt],
        (err, result) => {
          if (err) {
            console.error("Error al crear el usuario: " + err.stack);
            return res.status(500).send("Error al crear el usuario");
          }

          res.status(201).send("Usuario creado exitosamente");
        }
      );
    } catch (error) {
      console.error("Error al hashear la contraseña: ", error);
      res.status(500).send("Error en el servidor.");
    }
  });
});

// Ruta de inicio de sesión
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario en la base de datos
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      res.status(500).send("Error al buscar el usuario");
      return;
    }

    if (results.length === 0) {
      res.status(401).send("Usuario no encontrado");
      return;
    }

    const user = results[0];

    try {
      // Comparar la contraseña proporcionada con la almacenada (encriptada)
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).send("Contraseña incorrecta");
      }

      // Contraseña coincide, generar token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        "secreto",
        {
          expiresIn: "1h",
        }
      );

      res.json({ token });
    } catch (error) {
      console.error("Error al comparar las contraseñas:", error);
      res.status(500).send("Error en el servidor");
    }
  });
});

module.exports = router;
