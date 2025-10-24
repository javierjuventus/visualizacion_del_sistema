import React, { useState } from "react";
import "./PanelInterno.css";

function PanelInterno({ solicitudes, onActualizarEstado, onAsignar, onEliminar }) {
  const estados = ["Recibida", "En proceso", "Completada", "Rechazada"];
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  // --- Filtro simple ---
  const solicitudesFiltradas = solicitudes.filter((sol) => {
    const coincideTexto =
      sol.tipoTramite.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      sol.descripcion.toLowerCase().includes(filtroTexto.toLowerCase());
    const coincideEstado = filtroEstado ? sol.estado === filtroEstado : true;
    return coincideTexto && coincideEstado;
  });

  return (
    <div className="panel-interno">
      <h2 className="titulo">Panel Interno - Gestión de Solicitudes</h2>

      {/* Controles de búsqueda */}
      <div className="panel-filtros">
        <input
          type="text"
          placeholder="🔍 Buscar por trámite o descripción..."
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          {estados.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de solicitudes */}
      {solicitudesFiltradas.length === 0 ? (
        <p className="mensaje">No hay solicitudes que coincidan.</p>
      ) : (
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ciudadano</th>
                <th>Trámite</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Responsable</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesFiltradas.map((sol) => (
                <tr key={sol.id}>
                  <td>{sol.id}</td>
                  <td>{sol.ciudadano}</td>
                  <td>{sol.tipoTramite}</td>
                  <td>{sol.descripcion}</td>
                  <td>
                    <select
                      value={sol.estado}
                      onChange={(e) =>
                        onActualizarEstado(sol.id, e.target.value)
                      }
                    >
                      {estados.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Asignar..."
                      defaultValue={sol.responsable || ""}
                      onBlur={(e) => onAsignar(sol.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => setSolicitudSeleccionada(sol)}>
                      Ver
                    </button>
                    <button
                      className="logout"
                      onClick={() => onEliminar(sol.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Detalle */}
      {solicitudSeleccionada && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>Detalle de Solicitud #{solicitudSeleccionada.id}</h3>
            <p><b>Ciudadano:</b> {solicitudSeleccionada.ciudadano}</p>
            <p><b>Trámite:</b> {solicitudSeleccionada.tipoTramite}</p>
            <p><b>Descripción:</b> {solicitudSeleccionada.descripcion}</p>
            <p><b>Estado:</b> {solicitudSeleccionada.estado}</p>
            <p><b>Responsable:</b> {solicitudSeleccionada.responsable || "No asignado"}</p>
            <p><b>Fecha:</b> {solicitudSeleccionada.fecha}</p>

            <h4>Historial de cambios</h4>
            <ul>
              {solicitudSeleccionada.historial?.length ? (
                solicitudSeleccionada.historial.map((h, i) => (
                  <li key={i}>
                    {h.fecha} - {h.accion} por {h.usuario}
                  </li>
                ))
              ) : (
                <li>No hay historial disponible.</li>
              )}
            </ul>

            <button onClick={() => setSolicitudSeleccionada(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PanelInterno;
