import React from "react";
import "../styles/form.css";
import "../styles/recomendacoes.css";

export default function Recomendacoes({ formData, setFormData }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="formulario-container">
      <h2 className="form-title">11. RECOMENDAÇÕES E PROVIDÊNCIAS NECESSÁRIAS</h2>
      
      <form className="form-nr13">
        <div className="form-group">
          <label htmlFor="recomendacoes">Recomendações e Providências Necessárias:</label>
          <textarea
            id="recomendacoes"
            name="recomendacoes"
            rows="10"
            placeholder="Ex: I) Não há. Ou descreva as recomendações e providências necessárias..."
            value={formData.recomendacoes || ""}
            onChange={handleChange}
            className="recomendacoes-textarea"
          />
        </div>
      </form>
    </div>
  );
}

