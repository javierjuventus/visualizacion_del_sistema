import { useState, useEffect } from "react";
import "./App.css";

import FormularioSolicitud from "./components/FormularioSolicitud";
import AcuseRecibo from "./components/AcuseRecibo";
import SeguimientoSolicitudes from "./components/SeguimientoSolicitudes";
import PanelInterno from "./components/PanelInterno";
import Notificaciones from "./components/Notificaciones";

function App() {
  // Estados para login y mensajes
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Estado para usuario autenticado (null o nombre usuario)
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  // Estado para navegar entre vistas tras login
  const [vista, setVista] = useState("formulario");

  // Estado global para solicitudes, notificaciones, acuse
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      tipoTramite: "Alumbrado público",
      descripcion: "Lámpara fundida en calle X, esquina Y",
      estado: "En proceso",
    },
    {
      id: 2,
      tipoTramite: "Poda de árboles",
      descripcion: "Árbol muy alto bloqueando señalización en avenida Z",
      estado: "Recibida",
    },
  ]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [acuse, setAcuse] = useState(null);

  useEffect(() => {
    console.log("✅ Aplicación cargada correctamente");
  }, []);

  const handleLogin = () => {
    if (usuario.trim() === "" || password.trim() === "") {
      setMensaje("⚠️ Por favor, ingresa usuario y contraseña.");
    } else {
      setMensaje(`✅ Bienvenido, ${usuario}`);
      setUsuarioLogueado(usuario);
      setVista("formulario");
    }
  };

  const handleRegister = () => {
    setMensaje("📝 Redirigiendo al registro...");
  };

  const handleLogout = () => {
    setUsuario("");
    setPassword("");
    setMensaje("");
    setUsuarioLogueado(null);
    setVista("formulario");
    setAcuse(null);
    setNotificaciones([]);
  };

  const enviarSolicitud = (solicitud) => {
    const nuevaSolicitud = {
      id: Date.now(),
      ...solicitud,
      estado: "Recibida",
    };
    setSolicitudes((prev) => [...prev, nuevaSolicitud]);
    setAcuse(nuevaSolicitud);
    setNotificaciones((prev) => [
      ...prev,
      `Solicitud "${solicitud.tipoTramite}" recibida con ID ${nuevaSolicitud.id}`,
    ]);
    setVista("acuse");
  };

  const actualizarEstado = (id, nuevoEstado) => {
    setSolicitudes((prev) =>
      prev.map((sol) => (sol.id === id ? { ...sol, estado: nuevoEstado } : sol))
    );
    setNotificaciones((prev) => [
      ...prev,
      `Solicitud ID ${id} actualizada a estado "${nuevoEstado}"`,
    ]);
  };

  if (!usuarioLogueado) {
    // Mostrar login con tu estilo original
    return (
      <div className="App">
        <h1 className="titulo">Bienvenido a Ventanilla Única</h1>

        {/* Campos de inicio de sesión */}
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="botones">
          <button onClick={handleLogin}>Iniciar sesión</button>
          <button className="registro" onClick={handleRegister}>
            Registrarse
          </button>
        </div>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <footer>
          <p>Delegación Benito Juárez</p>
        </footer>
      </div>
    );
  }

  // App post-login con navegación entre módulos
  return (
    <div className="App">
      <h1 className="titulo">
        Ventanilla Única - Delegación Benito Juárez, CDMX
      </h1>

      <nav>
        <button
          onClick={() => setVista("formulario")}
          className={vista === "formulario" ? "active" : ""}
        >
          Solicitar Trámite
        </button>
        <button
          onClick={() => setVista("seguimiento")}
          className={vista === "seguimiento" ? "active" : ""}
        >
          Seguimiento
        </button>
        <button
          onClick={() => setVista("panel")}
          className={vista === "panel" ? "active" : ""}
        >
          Panel Interno
        </button>
        <button onClick={handleLogout} className="logout">
          Cerrar sesión
        </button>
      </nav>

      <Notificaciones notificaciones={notificaciones} />

      <main>
        {vista === "formulario" && <FormularioSolicitud onEnviar={enviarSolicitud} />}
        {vista === "acuse" && acuse && <AcuseRecibo solicitud={acuse} />}
        {vista === "seguimiento" && <SeguimientoSolicitudes solicitudes={solicitudes} />}
        {vista === "panel" && (
          <PanelInterno solicitudes={solicitudes} onActualizarEstado={actualizarEstado} />
        )}
      </main>

      <footer>
        <p>Delegación Benito Juárez</p>
      </footer>
    </div>
  );
}

export default App;
