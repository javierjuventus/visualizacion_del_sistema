// src/components/PanelSolicitudes.js
import React, { useState } from "react";
import "./PanelSolicitudes.css";

function PanelSolicitudes({ solicitudes }) {
  const [filtro, setFiltro] = useState("todas");

  const filtrarSolicitudes = () => {
    if (filtro === "todas") return solicitudes;
    return solicitudes.filter((sol) => sol.estado === filtro);
  };

  const estados = ["todas", "Recibida", "En proceso", "Finalizada"];

  return (
    <div className="panel-solicitudes-container">
      <h2>Módulo de Solicitudes</h2>

      {/* Filtro por estado */}
      <div className="filtro">
        <label>Filtrar por estado:</label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de solicitudes */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de trámite</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {filtrarSolicitudes().map((sol) => (
            <tr key={sol.id}>
              <td>{sol.id}</td>
              <td>{sol.tipoTramite}</td>
              <td>{sol.descripcion}</td>
              <td>{sol.estado}</td>
              <td>{new Date(sol.id).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PanelSolicitudes;
