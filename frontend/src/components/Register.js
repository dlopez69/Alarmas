import { useState } from "react";
import axios from "axios";

function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          username,
          password,
          email,
        }
      );

      console.log("Usuario registrado exitosamente:", response.data);
      onRegisterSuccess(); // Si el registro es exitoso, redirige al login
    } catch (error) {
      console.error(
        "Error al registrar el usuario:",
        error.response?.data || error
      );
    }
  };

  return (
    <div>
      <h1>Registrar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
