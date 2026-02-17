import React from "react";
import "../styles/form.css";
import "../styles/instalacoes.css";

export default function Instalacoes({ formData, setFormData }) {

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
      <h2 className="form-title">7. INSTALAÇÕES</h2>
      
      <form className="form-nr13">

        {/* Pergunta 1: Drenos, bocas de visita e instrumentos */}
        <div className="question-block">
          <div className="question-text">
            <p>
              Os drenos, bocas de visita e instrumentos de controle são acessados por meios seguros (subitem 13.5.2.1)?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="acessoSeguroStatus"
                value="Conforme"
                checked={formData.acessoSeguroStatus === "Conforme"}
                onChange={() => handleRadioChange("acessoSeguroStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="acessoSeguroStatus"
                value="Não conforme"
                checked={formData.acessoSeguroStatus === "Não conforme"}
                onChange={() => handleRadioChange("acessoSeguroStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="acessoSeguroStatus"
                value="Não se aplica"
                checked={formData.acessoSeguroStatus === "Não se aplica"}
                onChange={() => handleRadioChange("acessoSeguroStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>
        </div>

        {/* Pergunta 2: Requisitos dos subitens 13.5.2.2 e 13.5.2.3 */}
        <div className="question-block">
          <div className="question-text">
            <p>
              O vaso atende aos requisitos dos subitens 13.5.2.2 e 13.5.2.3, no que diz respeito a saídas desobstruídas, 
              acesso fácil e seguro, ventilação e iluminações convencional e de emergência ?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="requisitosVasoStatus"
                value="Conforme"
                checked={formData.requisitosVasoStatus === "Conforme"}
                onChange={() => handleRadioChange("requisitosVasoStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="requisitosVasoStatus"
                value="Não conforme"
                checked={formData.requisitosVasoStatus === "Não conforme"}
                onChange={() => handleRadioChange("requisitosVasoStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="requisitosVasoStatus"
                value="Não se aplica"
                checked={formData.requisitosVasoStatus === "Não se aplica"}
                onChange={() => handleRadioChange("requisitosVasoStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>
        </div>

      </form>
    </div>
  );
}

