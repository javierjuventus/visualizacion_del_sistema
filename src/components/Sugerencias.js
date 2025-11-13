// src/components/Sugerencias.js
import React, { useState } from "react";
import "./Sugerencias.css";

function Sugerencias({ onEnviarSugerencia }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [categoria, setCategoria] = useState("General");
  const [prioridad, setPrioridad] = useState("Media");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !correo.trim() || !mensaje.trim()) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    onEnviarSugerencia({
      nombre,
      correo,
      categoria,
      prioridad,
      mensaje,
      fecha: new Date().toLocaleString(),
    });

    setNombre("");
    setCorreo("");
    setCategoria("General");
    setPrioridad("Media");
    setMensaje("");
    setError("");
  };

  return (
    <div className="sugerencias-container">
      <h2>Enviar Sugerencia</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="sugerencias-form">
        <div className="form-group">
          <label>Nombre*</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div className="form-group">
          <label>Correo electrónico*</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Tu correo"
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="General">General</option>
              <option value="Trámite">Trámite</option>
              <option value="Infraestructura">Infraestructura</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="form-group half">
            <label>Prioridad</label>
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Sugerencia*</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu sugerencia aquí"
          />
        </div>

        <button type="submit" className="btn-submit">
          Enviar Sugerencia
        </button>
      </form>
    </div>
  );
}

export default Sugerencias;
