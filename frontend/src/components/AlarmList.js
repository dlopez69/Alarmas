function AlarmList({ alarmas, onDeleteAlarm }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Mis Alarmas</h2>
      <ul>
        {alarmas.map((alarma) => (
          <li
            key={alarma.id}
            className="bg-gray-200 p-3 rounded-lg mb-2 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{alarma.descripcion}</h3>
              <p>{new Date(alarma.fecha).toLocaleString()}</p>
            </div>
            <button
              onClick={() => onDeleteAlarm(alarma.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlarmList;
