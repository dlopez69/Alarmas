import { useState } from "react";

function AlarmForm({ onCreateAlarm }) {
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateAlarm(descripcion, fecha); // Llamar a la función para crear la alarma
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium">
          Descripción
        </label>
        <input
          id="descripcion"
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="fecha" className="block text-sm font-medium mt-3">
          Fecha y Hora
        </label>
        <input
          id="fecha"
          type="datetime-local"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        Crear Alarma
      </button>
    </form>
  );
}

export default AlarmForm;
