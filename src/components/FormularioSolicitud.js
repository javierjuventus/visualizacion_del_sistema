// src/components/FormularioSolicitud.js
import React, { useState } from "react";

const FormularioSolicitud = ({ onEnviar }) => {
  const [tipoTramite, setTipoTramite] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoTramite || !descripcion) {
      alert("Por favor completa todos los campos.");
      return;
    }
    onEnviar({ tipoTramite, descripcion });
    setTipoTramite("");
    setDescripcion("");
  };

  return (
    <div className="formulario-container">
      <h2>Formulario de Solicitud</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <select
          value={tipoTramite}
          onChange={(e) => setTipoTramite(e.target.value)}
        >
          <option value="">-- Selecciona un trámite --</option>
          <option value="Alumbrado público">Alumbrado público</option>
          <option value="Poda de árboles">Poda de árboles</option>
          <option value="Bacheo">Bacheo</option>
          <option value="Recolección de basura">Recolección de basura</option>
          <option value="Seguridad vecinal">Seguridad vecinal</option>
        </select>

        <textarea
          placeholder="Descripción detallada del trámite"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={4}
        />

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default FormularioSolicitud;
