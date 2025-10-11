function PanelInterno({ solicitudes, onActualizarEstado }) {
  const estados = ["Recibida", "En proceso", "Completada", "Rechazada"];

  return (
    <div className="panel-interno">
      <h2>Panel Interno - Gestión de Solicitudes</h2>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes para gestionar.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Trámite</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Actualizar Estado</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((sol) => (
              <tr key={sol.id}>
                <td>{sol.id}</td>
                <td>{sol.tipoTramite}</td>
                <td>{sol.descripcion}</td>
                <td>{sol.estado}</td>
                <td>
                  <select
                    value={sol.estado}
                    onChange={(e) => onActualizarEstado(sol.id, e.target.value)}
                  >
                    {estados.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PanelInterno;
