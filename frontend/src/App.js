import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import AlarmForm from "./components/AlarmForm";
import AlarmList from "./components/AlarmList";
import Login from "./components/Login";
import Register from "./components/Register"; // Componente para registro
import axios from "axios";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [alarmas, setAlarmas] = useState([]);
  const navigate = useNavigate(); // Para la navegación

  // Función para obtener las alarmas desde el backend
  const fetchAlarmas = () => {
    axios
      .get("http://localhost:5000/api/alarmas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAlarmas(response.data))
      .catch((error) => console.error("Error al obtener las alarmas", error));
  };

  // Ejecutar fetchAlarmas cuando el token cambie
  useEffect(() => {
    if (token) {
      fetchAlarmas();
    }
  }, [token]);

  // Función para crear una nueva alarma
  const onCreateAlarm = (descripcion, fecha) => {
    axios
      .post(
        "http://localhost:5000/api/alarmas/create",
        { descripcion, fecha },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Alarma creada:", response.data);
        fetchAlarmas(); // Actualizar las alarmas después de crear una nueva
      })
      .catch((error) => console.error("Error al crear la alarma", error));
  };

  // Función para eliminar una alarma
  const onDeleteAlarm = (id) => {
    axios
      .delete(`http://localhost:5000/api/alarmas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Alarma eliminada:", response.data);
        fetchAlarmas(); // Actualizar las alarmas después de eliminar
      })
      .catch((error) => console.error("Error al eliminar la alarma", error));
  };

  // Función que maneja el login exitoso
  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    fetchAlarmas();
    navigate("/alarmas"); // Navegar a la página de alarmas tras iniciar sesión
  };

  // Función que maneja el registro exitoso
  const handleRegisterSuccess = () => {
    navigate("/login"); // Navegar a la página de login tras el registro exitoso
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token"); // Eliminar el token del localStorage
    navigate("/login"); // Navegar a la página de login tras cerrar sesión
  };

  return (
    <div className="container mx-auto p-4">
      <nav>
        <Link to="/login">Iniciar Sesión</Link>{" "}
        <Link to="/register">Registrar</Link>{" "}
        {token && <button onClick={handleLogout}>Cerrar Sesión</button>}
      </nav>

      <Routes>
        <Route
          path="/register"
          element={<Register onRegisterSuccess={handleRegisterSuccess} />}
        />

        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        <Route
          path="/alarmas"
          element={
            token ? (
              <>
                <h1 className="text-2xl font-bold mb-4">Gestión de Alarmas</h1>
                <AlarmForm onCreateAlarm={onCreateAlarm} />{" "}
                <AlarmList alarmas={alarmas} onDeleteAlarm={onDeleteAlarm} />{" "}
              </>
            ) : (
              <p>Por favor, inicia sesión para ver tus alarmas.</p>
            )
          }
        />

        {/* Redirigir a la página de login por defecto */}
        <Route
          path="/"
          element={
            token ? (
              <p>Bienvenido, ya puedes gestionar tus alarmas.</p>
            ) : (
              <p>Por favor, inicia sesión.</p>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
