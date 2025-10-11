function SeguimientoSolicitudes({ solicitudes }) {
  return (
    <div className="seguimiento">
      <h2>Seguimiento de Solicitudes</h2>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Trámite</th>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((sol) => (
              <tr key={sol.id}>
                <td>{sol.id}</td>
                <td>{sol.tipoTramite}</td>
                <td>{sol.descripcion}</td>
                <td>{sol.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SeguimientoSolicitudes;
