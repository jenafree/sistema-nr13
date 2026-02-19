import React from "react";

function App() {
  return (
    <div style={{ padding: "50px", textAlign: "center", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <h1 style={{ color: "#333", fontSize: "3rem" }}>🎉 TESTE - APLICAÇÃO FUNCIONANDO!</h1>
      <p style={{ fontSize: "1.5rem", color: "#666" }}>Se você está vendo isso, o React está carregando corretamente!</p>
      <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h2>✅ Sistema NR-13</h2>
        <p>Servidor: Rodando</p>
        <p>React: Funcionando</p>
        <p>Vite: OK</p>
      </div>
    </div>
  );
}

export default App;

