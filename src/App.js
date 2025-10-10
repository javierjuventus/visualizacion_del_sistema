import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = () => {
    if (usuario.trim() === "" || password.trim() === "") {
      setMensaje("⚠️ Por favor, ingresa usuario y contraseña.");
    } else {
      setMensaje(`✅ Bienvenido, ${usuario}`);
    }
  };

  const handleRegister = () => {
    setMensaje("📝 Redirigiendo al registro...");
  };

  // US04: Verificar carga sin errores
  useEffect(() => {
    console.log("✅ Aplicación cargada correctamente");
  }, []);

  return (
    <div className="App">
      <h1 className="titulo">Bienvenido a Ventanilla Única</h1>

      {/* Campos de inicio de sesión */}
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="botones">
        <button onClick={handleLogin}>Iniciar sesión</button>
        <button className="registro" onClick={handleRegister}>Registrarse</button>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <footer>
        <p>Delegación Benito Juárez</p>
      </footer>
    </div>
  );
}

export default App;
