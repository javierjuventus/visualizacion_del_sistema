import { useState } from "react";

function ChatAyuda() {
  const [mostrarChat, setMostrarChat] = useState(false);
  const [mensajes, setMensajes] = useState([
    { id: 1, texto: "Hola, ¿en qué puedo ayudarte?", sender: "bot" },
    { id: 2, texto: "Nuestro horario de atención es de lunes a viernes de 9:00 a 15:00 hrs.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setMostrarChat(!mostrarChat);

  // Función para generar respuestas automáticas del bot
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes("hola")) return "¡Hola! ¿Cómo estás?";
    if (msg.includes("adiós") || msg.includes("chao")) return "¡Hasta luego! 😊";
    if (msg.includes("ayuda")) return "Claro, dime qué necesitas y te ayudaré.";
    if (msg.includes("horario")) return "Nuestro horario es de lunes a viernes de 9:00 a 15:00 hrs.";
    
    // Respuesta genérica si no hay coincidencias
    return "Interesante, cuéntame más...";
  };

  const enviarMensaje = () => {
    if (input.trim() === "") return;

    // Agregar mensaje del usuario
    const nuevoMensaje = { id: Date.now(), texto: input, sender: "user" };
    setMensajes((prev) => [...prev, nuevoMensaje]);

    // Limpiar input
    setInput("");

    // Generar respuesta del bot con pequeño retraso para simular conversación
    setTimeout(() => {
      const respuestaBot = { id: Date.now() + 1, texto: getBotResponse(input), sender: "bot" };
      setMensajes((prev) => [...prev, respuestaBot]);
    }, 500);
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {/* Botón para abrir/cerrar chat */}
      <button
        onClick={toggleChat}
        aria-label="Abrir chat"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "50%",
          width: 60,
          height: 60,
          fontSize: 24,
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        💬
      </button>

      {/* Ventana de chat */}
      {mostrarChat && (
        <div
          style={{
            width: 320,
            height: 400,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: 10,
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {/* Título y leyenda */}
          <div
            style={{
              padding: 10,
              borderBottom: "1px solid #ccc",
              fontWeight: "bold",
              fontSize: 14,
              color: "black",
              backgroundColor: "#f5f5f5",
              textAlign: "center",
            }}
          >
            Chat de ayuda
            <br />
            Atención de lunes a viernes de 9:00 a 15:00
          </div>

          {/* Área de mensajes */}
          <div
            style={{
              flex: 1,
              padding: 10,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {mensajes.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === "user" ? "#007bff" : "#f1f1f1",
                  color: msg.sender === "user" ? "#fff" : "#000",
                  padding: "8px 12px",
                  borderRadius: 10,
                  maxWidth: "80%",
                  wordWrap: "break-word",
                }}
              >
                {msg.texto}
              </div>
            ))}
          </div>

          {/* Input y botón enviar */}
          <div
            style={{
              padding: 10,
              display: "flex",
              borderTop: "1px solid #ccc",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              onKeyDown={(e) => {
                if (e.key === "Enter") enviarMensaje();
              }}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 5,
                border: "1px solid #ccc",
                marginRight: 8,
                fontSize: 14,
              }}
            />
            <button
              onClick={enviarMensaje}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 5,
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatAyuda;
