import React, { useState, useRef, useEffect } from "react";
import "./Login.css";

// Cores do design system NR-13
const TUBES_COLORS = ["#0D2149", "#1FA35F", "#35A7FF"];
const TUBES_LIGHTS = ["#1FA35F", "#35A7FF", "#0D2149", "#53bc28"];

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [shake, setShake] = useState(false);
  const canvasRef = useRef(null);
  const tubesRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    const initTubes = async () => {
      try {
        const { Tubes1Cursor } = await import("threejs-components");
        const app = Tubes1Cursor(canvas, {
          tubes: {
            colors: TUBES_COLORS,
            lights: {
              intensity: 200,
              colors: TUBES_LIGHTS,
            },
          },
        });
        if (!disposed) tubesRef.current = app;
      } catch (err) {
        console.warn("TubesCursor não disponível (WebGPU?), usando fundo padrão.", err);
      }
    };
    initTubes();
    return () => {
      disposed = true;
      tubesRef.current?.dispose?.();
      tubesRef.current = null;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");
    setShake(false);

    if (!usuario.trim() || !senha.trim()) {
      setErro("Preencha usuário e senha.");
      triggerShake();
      return;
    }

    setCarregando(true);

    setTimeout(() => {
      if (usuario === "admin" && senha === "nr13") {
        onLogin({ usuario });
      } else {
        setErro("Usuário ou senha inválidos.");
        triggerShake();
      }
      setCarregando(false);
    }, 500);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="login-wrapper">
      <canvas ref={canvasRef} id="login-tubes-canvas" className="login-tubes-canvas" aria-hidden="true" />
      <div className="login-bg-fallback" role="presentation" />
      <div className={`login-container ${shake ? "shake" : ""}`}>
        <h2 className="login-title">NR-13 - Acesso</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className={`login-input-group ${usuario ? "has-value" : ""}`}>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder=" "
              autoComplete="username"
              disabled={carregando}
              required
            />
            <label htmlFor="usuario">Usuário</label>
          </div>
          <div className={`login-input-group ${senha ? "has-value" : ""}`}>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder=" "
              autoComplete="current-password"
              disabled={carregando}
              required
            />
            <label htmlFor="senha">Senha</label>
          </div>
          {erro && <p className="login-erro">{erro}</p>}
          <button type="submit" className="login-btn" disabled={carregando}>
            {carregando ? (
              <>
                <span className="login-spinner"></span>
                <span>Entrando...</span>
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
