import React from "react";
import "../styles/form.css";
import "../styles/informacoes-relatorio-anterior.css";

export default function InformacoesRelatorioAnterior({ formData, setFormData }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleRadioChange(name, value) {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="formulario-container">
      <h2 className="form-title">6. INFORMAÇÕES RELEVANTES DO RELATÓRIO ANTERIOR</h2>
      
      <form className="form-nr13">

        {/* Pergunta 1: Prazo estabelecido */}
        <div className="question-block">
          <div className="question-text">
            <p>
              A presente inspeção foi realizada dentro do prazo estabelecido ?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="inspecaoPrazoStatus"
                value="Conforme"
                checked={formData.inspecaoPrazoStatus === "Conforme"}
                onChange={() => handleRadioChange("inspecaoPrazoStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="inspecaoPrazoStatus"
                value="Não conforme"
                checked={formData.inspecaoPrazoStatus === "Não conforme"}
                onChange={() => handleRadioChange("inspecaoPrazoStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="inspecaoPrazoStatus"
                value="Não se aplica"
                checked={formData.inspecaoPrazoStatus === "Não se aplica"}
                onChange={() => handleRadioChange("inspecaoPrazoStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>
        </div>

        {/* Pergunta 2: Recomendações cumpridas */}
        <div className="question-block">
          <div className="question-text">
            <p>
              As recomendações de relatórios anteriores foram cumpridas ?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="recomendacoesCumpridasStatus"
                value="Conforme"
                checked={formData.recomendacoesCumpridasStatus === "Conforme"}
                onChange={() => handleRadioChange("recomendacoesCumpridasStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="recomendacoesCumpridasStatus"
                value="Não conforme"
                checked={formData.recomendacoesCumpridasStatus === "Não conforme"}
                onChange={() => handleRadioChange("recomendacoesCumpridasStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="recomendacoesCumpridasStatus"
                value="Não havia"
                checked={formData.recomendacoesCumpridasStatus === "Não havia"}
                onChange={() => handleRadioChange("recomendacoesCumpridasStatus", "Não havia")}
              />
              <span>Não havia</span>
            </label>
          </div>
        </div>

      </form>
    </div>
  );
}

