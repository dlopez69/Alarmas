const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).send("Acceso denegado. No se proporcionó token.");
  }

  const token = authHeader.split(" ")[1]; // Tomar solo el token

  if (!token) {
    return res.status(400).send("Token inválido.");
  }

  try {
    const verificado = jwt.verify(token, "secreto"); // Reemplaza 'secreto' por tu clave secreta real
    req.user = verificado;
    next(); // Token válido, continuar con la solicitud
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .send("Token expirado. Por favor, inicia sesión nuevamente.");
    }
    return res.status(400).send("Token inválido.");
  }
};

module.exports = verificarToken;
