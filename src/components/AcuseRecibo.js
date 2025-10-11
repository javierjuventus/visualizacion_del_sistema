function AcuseRecibo({ solicitud }) {
  return (
    <div className="acuse">
      <h2>Acuse de Recibo</h2>
      <p>Tu solicitud fue recibida correctamente.</p>
      <p>
        <strong>ID:</strong> {solicitud.id}
      </p>
      <p>
        <strong>Trámite:</strong> {solicitud.tipoTramite}
      </p>
      <p>
        <strong>Descripción:</strong> {solicitud.descripcion}
      </p>
      <p>
        <strong>Estado:</strong> {solicitud.estado}
      </p>
    </div>
  );
}

export default AcuseRecibo;
