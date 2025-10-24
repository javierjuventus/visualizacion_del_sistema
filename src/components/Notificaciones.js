function Notificaciones({ notificaciones }) {
  return (
    <div className="notificaciones">
      {notificaciones.slice(-3).map((n, i) => (
        <p key={i}>🔔 {n}</p>
      ))}
    </div>
  );
}

export default Notificaciones;

