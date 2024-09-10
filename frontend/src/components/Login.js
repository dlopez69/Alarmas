import { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/login", { username, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        onLoginSuccess(token);
      })
      .catch(() => {
        setError("Credenciales incorrectas");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form
        onSubmit={handleLogin}
        className="p-4 bg-gray-100 rounded-lg shadow-md"
      >
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mt-3">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
