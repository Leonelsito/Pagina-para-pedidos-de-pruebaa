import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const productos = [
  { id: 1, nombre: "Hierro 4,2mm", precio: 3300 },
  { id: 2, nombre: "Hierro 6mm", precio: 5400 },
  { id: 3, nombre: "Hierro 8mm", precio: 8600 },
  { id: 4, nombre: "Hierro 10mm", precio: 13600 },
  { id: 5, nombre: "Alambre N°16 X KG ", precio: 5500 },
  { id: 6, nombre: "Cemento Loma Negra 50kg", precio: 11000 },
  { id: 7, nombre: "Flete General", precio: 10500 },
];

export default function App() {
  const [carro, setCarro] = useState([]);
  const [tipoObra, setTipoObra] = useState("todos");

  const agregarAlCarro = (producto) => {
    const existe = carro.find((item) => item.id === producto.id);
    if (existe) {
      setCarro(
        carro.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarro([...carro, { ...producto, cantidad: 1 }]);
    }
  };

  const quitarDelCarro = (id) => {
    setCarro(
      carro
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const total = carro.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  const enviarWhatsApp = () => {
    const mensaje =
      carro
        .map((p) => `• ${p.cantidad}x ${p.nombre}: $${p.precio * p.cantidad}`)
        .join("%0A") + `%0A%0ATotal: $${total}`;
    const link = `https://wa.me/543624172843?text=${mensaje}`;
    window.open(link, "_blank");
  };

  return (
    <div
      style={{
        backgroundColor: "#e5e5e5",
        minHeight: "100vh",
        color: "black",
        padding: "1rem",
      }}
    >
      <header
        style={{
          backgroundColor: "#FFD700",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "black" }}>LEVEL CORRALON METALURGICO</h1>
        <p>
          Materiales de construcción con entrega en Resistencia, Fontana,
          Barranqueras y Vilelas
        </p>
      </header>

      <div style={{ margin: "1rem 0" }}>
        <label>Filtrar por tipo de obra:</label>
        <select value={tipoObra} onChange={(e) => setTipoObra(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="losa">Losa</option>
          <option value="techo">Techo</option>
          <option value="revoque">Revoque</option>
          <option value="cimientos">Cimientos</option>
        </select>
      </div>

      {productos.map((producto) => (
        <div
          key={producto.id}
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2>{producto.nombre}</h2>
          <p>Precio: ${producto.precio}</p>
          <button
            onClick={() => agregarAlCarro(producto)}
            style={{
              backgroundColor: "#FFD700",
              color: "black",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Agregar al carro
          </button>
        </div>
      ))}

      <div style={{ marginTop: "2rem" }}>
        <h3>Carro ({carro.length} productos)</h3>
        <ul>
          {carro.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "1rem",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ minWidth: "30px", fontWeight: "bold" }}>
                {item.cantidad}x
              </span>
              <span style={{ flex: 1 }}>{item.nombre}</span>
              <span>${item.precio * item.cantidad}</span>
              <button
                onClick={() => quitarDelCarro(item.id)}
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "0.25rem 0.5rem",
                  cursor: "pointer",
                }}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
        <p>
          <strong>Total: ${total}</strong>
        </p>
        <button
          onClick={enviarWhatsApp}
          style={{
            backgroundColor: "#25D366",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Enviar pedido por WhatsApp
        </button>
      </div>
    </div>
  );
}
