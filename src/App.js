import { useState, useEffect } from "react";
import "./App.css";

import FormularioSolicitud from "./components/FormularioSolicitud";
import AcuseRecibo from "./components/AcuseRecibo";
import SeguimientoSolicitudes from "./components/SeguimientoSolicitudes";
import Notificaciones from "./components/Notificaciones";
import ChatAyuda from "./components/ChatAyuda";
import Sugerencias from "./components/Sugerencias"; // Módulo ciudadanos
import PanelInterno from "./components/PanelInterno"; // Módulo admin
import PanelSolicitudes from "./components/PanelSolicitudes"; // Módulo admin

function App() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [rol, setRol] = useState("ciudadano");
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [vista, setVista] = useState("formulario");

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
  const [sugerencias, setSugerencias] = useState([]);

  useEffect(() => {
    console.log("✅ Aplicación cargada correctamente");
  }, []);

  // === Funciones de login ===
  const handleLogin = () => {
    if (usuario.trim() === "" || password.trim() === "") {
      setMensaje("⚠️ Por favor, ingresa usuario y contraseña.");
    } else if (!rol) {
      setMensaje("⚠️ Selecciona tu tipo de usuario.");
    } else {
      setMensaje(`✅ Bienvenido, ${usuario} (${rol})`);
      setUsuarioLogueado(usuario);
      setVista(rol === "admin" ? "panelInterno" : "formulario");
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
    setSugerencias([]);
    setRol("ciudadano");
  };

  // === Funciones de solicitudes ===
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

  // === Función para manejar sugerencias ===
  const enviarSugerencia = (sugerencia) => {
    setSugerencias((prev) => [...prev, sugerencia]);
    setNotificaciones((prev) => [
      ...prev,
      `Nueva sugerencia recibida de ${sugerencia.nombre}`,
    ]);
  };

  // === LOGIN VIEW ===
  if (!usuarioLogueado) {
    return (
      <div className="App">
        <h1 className="titulo">Bienvenido a Ventanilla Única</h1>

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

        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          style={{
            marginTop: "10px",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="ciudadano">Ciudadano</option>
          <option value="admin">Administrador</option>
        </select>

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

        <ChatAyuda />
      </div>
    );
  }

  // === APP POST LOGIN ===
  return (
    <div className="App">
      <h1 className="titulo">
        Ventanilla Única - Delegación Benito Juárez, CDMX
      </h1>

      <nav>
        {rol === "ciudadano" && (
          <>
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
              onClick={() => setVista("sugerencias")}
              className={vista === "sugerencias" ? "active" : ""}
            >
              Sugerencias
            </button>
          </>
        )}

        {rol === "admin" && (
          <>
            <button
              onClick={() => setVista("panelInterno")}
              className={vista === "panelInterno" ? "active" : ""}
            >
              Panel Interno
            </button>
            <button
              onClick={() => setVista("panelSolicitudes")}
              className={vista === "panelSolicitudes" ? "active" : ""}
            >
              Panel de Solicitudes
            </button>
          </>
        )}

        <button onClick={handleLogout} className="logout">
          Cerrar sesión
        </button>
      </nav>

      <Notificaciones notificaciones={notificaciones} />

      <main>
        {/* Ciudadanos */}
        {rol === "ciudadano" && vista === "formulario" && (
          <FormularioSolicitud onEnviar={enviarSolicitud} />
        )}
        {rol === "ciudadano" && vista === "acuse" && acuse && (
          <AcuseRecibo solicitud={acuse} />
        )}
        {rol === "ciudadano" && vista === "seguimiento" && (
          <SeguimientoSolicitudes solicitudes={solicitudes} />
        )}
        {rol === "ciudadano" && vista === "sugerencias" && (
          <Sugerencias onEnviarSugerencia={enviarSugerencia} />
        )}

        {/* Administradores */}
        {rol === "admin" && vista === "panelInterno" && (
          <PanelInterno
            solicitudes={solicitudes}
            onActualizarEstado={actualizarEstado}
          />
        )}
        {rol === "admin" && vista === "panelSolicitudes" && (
          <PanelSolicitudes solicitudes={solicitudes} />
        )}
      </main>

      <footer>
        <p>Delegación Benito Juárez</p>
      </footer>
    </div>
  );
}

export default App;
