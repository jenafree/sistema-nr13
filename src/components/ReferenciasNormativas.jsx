import React from "react";
import "../styles/form.css";

export default function ReferenciasNormativas() {
  return (
    <div className="formulario-container">
      <h2 className="form-title">Referências Normativas</h2>

      <form className="form-nr13">
        <div className="form-section-divider">
          <h3>3. Referências Normativas</h3>
        </div>

        <p className="referencias-intro">
          Principais normas utilizadas na elaboração deste relatório técnico de
          inspeção de vasos sob pressão.
        </p>

        <div className="referencias-grid">
          <div className="referencia-card">
            <span className="referencia-chip">NR13</span>
            <h4 className="referencia-titulo">
              Caldeiras, Vasos de Pressão, Tubulações e Tanques Metálicos de
              Armazenamento
            </h4>
            <p className="referencia-detalhes">
              Portaria MTP nº 4.219, de 20 de dezembro de 2022.
            </p>
          </div>

          <div className="referencia-card">
            <span className="referencia-chip">ASME</span>
            <h4 className="referencia-titulo">Seção VIII, Divisão 1</h4>
            <p className="referencia-detalhes">
              Código ASME para projeto, fabricação e inspeção de vasos sob
              pressão.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

