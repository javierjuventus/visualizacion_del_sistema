import React, { useState } from "react";
import "./FormularioSolicitud.css"; // vamos a crear este CSS para el estilo

const FormularioSolicitud = ({ onEnviar }) => {
  const [tipoTramite, setTipoTramite] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [curp, setCurp] = useState("");
  const [rfc, setRfc] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [archivo, setArchivo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoTramite || !descripcion || !nombre || !telefono || !direccion || !municipio || !codigoPostal) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const solicitud = {
      tipoTramite,
      descripcion,
      nombre,
      telefono,
      direccion,
      correo,
      curp,
      rfc,
      fechaNacimiento,
      genero,
      municipio,
      codigoPostal,
      observaciones,
      archivo,
    };

    onEnviar(solicitud);

    // Limpiar campos
    setTipoTramite("");
    setDescripcion("");
    setNombre("");
    setTelefono("");
    setDireccion("");
    setCorreo("");
    setCurp("");
    setRfc("");
    setFechaNacimiento("");
    setGenero("");
    setMunicipio("");
    setCodigoPostal("");
    setObservaciones("");
    setArchivo(null);
  };

  return (
    <div className="formulario-container">
      <h2>Formulario de Solicitud</h2>
      <form onSubmit={handleSubmit} className="formulario-grid">
        {/* Primera fila */}
        <input type="text" placeholder="Nombre completo *" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="tel" placeholder="Teléfono *" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        
        <input type="text" placeholder="Dirección *" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        <input type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        
        <input type="text" placeholder="CURP" value={curp} onChange={(e) => setCurp(e.target.value)} />
        <input type="text" placeholder="RFC" value={rfc} onChange={(e) => setRfc(e.target.value)} />
        
        <input type="date" placeholder="Fecha de nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">-- Selecciona tu género --</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        
        <input type="text" placeholder="Municipio / Alcaldía *" value={municipio} onChange={(e) => setMunicipio(e.target.value)} />
        <input type="text" placeholder="Código Postal *" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
        
        <select value={tipoTramite} onChange={(e) => setTipoTramite(e.target.value)}>
          <option value="">-- Selecciona un trámite --</option>
          <option value="Alumbrado público">Alumbrado público</option>
          <option value="Poda de árboles">Poda de árboles</option>
          <option value="Bacheo">Bacheo</option>
          <option value="Recolección de basura">Recolección de basura</option>
          <option value="Seguridad vecinal">Seguridad vecinal</option>
        </select>

        <textarea placeholder="Descripción detallada del trámite *" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={4} />
        <textarea placeholder="Observaciones adicionales" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} rows={3} />

        <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default FormularioSolicitud;
