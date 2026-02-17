import React from "react";
import "../styles/form.css";
import "../styles/exame-documentacao.css";

export default function ExameDocumentacao({ formData, setFormData }) {

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
      <h2 className="form-title">5. EXAME DA DOCUMENTAÇÃO</h2>
      
      <form className="form-nr13">

        {/* Pergunta 1: Prontuário */}
        <div className="question-block">
          <div className="question-text">
            <p>
              O prontuário está de acordo com o subitem 13.5.1.5 alínea "a)"; apresenta as premissas de projeto, 
              dados dos dispositivos de segurança e memorial de cálculo?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="prontuarioStatus"
                value="Conforme"
                checked={formData.prontuarioStatus === "Conforme"}
                onChange={() => handleRadioChange("prontuarioStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="prontuarioStatus"
                value="Não conforme"
                checked={formData.prontuarioStatus === "Não conforme"}
                onChange={() => handleRadioChange("prontuarioStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="prontuarioStatus"
                value="Não se aplica"
                checked={formData.prontuarioStatus === "Não se aplica"}
                onChange={() => handleRadioChange("prontuarioStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>

          <div className="additional-options">
            <label className="radio-option">
              <input
                type="radio"
                name="prontuarioTipo"
                value="Fabricação"
                checked={formData.prontuarioTipo === "Fabricação"}
                onChange={() => handleRadioChange("prontuarioTipo", "Fabricação")}
              />
              <span>Fabricação</span>
            </label>
            <div className="radio-option-with-input">
              <label className="radio-option">
                <input
                  type="radio"
                  name="prontuarioTipo"
                  value="Reconstituído"
                  checked={formData.prontuarioTipo === "Reconstituído"}
                  onChange={() => handleRadioChange("prontuarioTipo", "Reconstituído")}
                />
                <span>Reconstituído</span>
              </label>
              <div className="input-field-inline">
                <label htmlFor="prontuarioAno">Ano:</label>
                <input
                  id="prontuarioAno"
                  name="prontuarioAno"
                  type="text"
                  placeholder="Ex: 2023"
                  value={formData.prontuarioAno || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pergunta 2: Registro de segurança */}
        <div className="question-block">
          <div className="question-text">
            <p>
              O registro de segurança está de acordo com o subitem 13.5.1.7 ?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="registroSegurancaStatus"
                value="Conforme"
                checked={formData.registroSegurancaStatus === "Conforme"}
                onChange={() => handleRadioChange("registroSegurancaStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="registroSegurancaStatus"
                value="Não conforme"
                checked={formData.registroSegurancaStatus === "Não conforme"}
                onChange={() => handleRadioChange("registroSegurancaStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="registroSegurancaStatus"
                value="Não se aplica"
                checked={formData.registroSegurancaStatus === "Não se aplica"}
                onChange={() => handleRadioChange("registroSegurancaStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>

          <div className="additional-options">
            <label className="radio-option">
              <input
                type="radio"
                name="registroSegurancaTipo"
                value="Sistema informatizado"
                checked={formData.registroSegurancaTipo === "Sistema informatizado"}
                onChange={() => handleRadioChange("registroSegurancaTipo", "Sistema informatizado")}
              />
              <span>Sistema informatizado</span>
            </label>
            <div className="radio-option-with-input">
              <label className="radio-option">
                <input
                  type="radio"
                  name="registroSegurancaTipo"
                  value="Pasta ou livro com páginas numeradas"
                  checked={formData.registroSegurancaTipo === "Pasta ou livro com páginas numeradas"}
                  onChange={() => handleRadioChange("registroSegurancaTipo", "Pasta ou livro com páginas numeradas")}
                />
                <span>Pasta ou livro com páginas numeradas</span>
              </label>
              <div className="input-field-inline">
                <label htmlFor="registroSegurancaAno">Ano:</label>
                <input
                  id="registroSegurancaAno"
                  name="registroSegurancaAno"
                  type="text"
                  placeholder="Ex: 2023"
                  value={formData.registroSegurancaAno || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pergunta 3: Relatório de inspeção anterior */}
        <div className="question-block">
          <div className="question-text">
            <p>
              Relatório de inspeção anterior está de acordo com o subitem 13.5.1.5 alínea "d)" ?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="relatorioAnteriorStatus"
                value="Conforme"
                checked={formData.relatorioAnteriorStatus === "Conforme"}
                onChange={() => handleRadioChange("relatorioAnteriorStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="relatorioAnteriorStatus"
                value="Não conforme"
                checked={formData.relatorioAnteriorStatus === "Não conforme"}
                onChange={() => handleRadioChange("relatorioAnteriorStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="relatorioAnteriorStatus"
                value="Não se aplica"
                checked={formData.relatorioAnteriorStatus === "Não se aplica"}
                onChange={() => handleRadioChange("relatorioAnteriorStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>

          <div className="additional-options">
            <label className="radio-option">
              <input
                type="radio"
                name="relatorioAnteriorTipo"
                value="Inicial"
                checked={formData.relatorioAnteriorTipo === "Inicial"}
                onChange={() => handleRadioChange("relatorioAnteriorTipo", "Inicial")}
              />
              <span>Inicial</span>
            </label>
            <div className="radio-option-with-input">
              <label className="radio-option">
                <input
                  type="radio"
                  name="relatorioAnteriorTipo"
                  value="Periódico"
                  checked={formData.relatorioAnteriorTipo === "Periódico"}
                  onChange={() => handleRadioChange("relatorioAnteriorTipo", "Periódico")}
                />
                <span>Periódico</span>
              </label>
              <div className="input-field-inline">
                <label htmlFor="relatorioAnteriorNumero">Nº do relatório:</label>
                <input
                  id="relatorioAnteriorNumero"
                  name="relatorioAnteriorNumero"
                  type="text"
                  placeholder="Ex: 885402/2023"
                  value={formData.relatorioAnteriorNumero || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pergunta 4: PAR */}
        <div className="question-block">
          <div className="question-text">
            <p>
              PAR (Projeto de Alteração e Reparo) está de acordo com o subitem 13.5.1.5 alínea "c)"?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="parStatus"
                value="Conforme"
                checked={formData.parStatus === "Conforme"}
                onChange={() => handleRadioChange("parStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="parStatus"
                value="Não conforme"
                checked={formData.parStatus === "Não conforme"}
                onChange={() => handleRadioChange("parStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="parStatus"
                value="Não se aplica"
                checked={formData.parStatus === "Não se aplica"}
                onChange={() => handleRadioChange("parStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>
        </div>

        {/* Pergunta 5: Certificado de calibração */}
        <div className="question-block">
          <div className="question-text">
            <p>
              Certificado de calibração dos dispositivos de segurança estão de acordo com o subitem 13.5.1.5 alínea "e)"?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="certificadoCalibracaoStatus"
                value="Conforme"
                checked={formData.certificadoCalibracaoStatus === "Conforme"}
                onChange={() => handleRadioChange("certificadoCalibracaoStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="certificadoCalibracaoStatus"
                value="Não conforme"
                checked={formData.certificadoCalibracaoStatus === "Não conforme"}
                onChange={() => handleRadioChange("certificadoCalibracaoStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="certificadoCalibracaoStatus"
                value="Não se aplica"
                checked={formData.certificadoCalibracaoStatus === "Não se aplica"}
                onChange={() => handleRadioChange("certificadoCalibracaoStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>
        </div>

        {/* Pergunta 6: Teste hidrostático */}
        <div className="question-block">
          <div className="question-text">
            <p>
              Documentação que comprove a realização de teste hidrostático na fase de fabricação está de acordo com o subitem 13.5.4.3 ?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="testeHidrostaticoStatus"
                value="Conforme"
                checked={formData.testeHidrostaticoStatus === "Conforme"}
                onChange={() => handleRadioChange("testeHidrostaticoStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="testeHidrostaticoStatus"
                value="Não conforme"
                checked={formData.testeHidrostaticoStatus === "Não conforme"}
                onChange={() => handleRadioChange("testeHidrostaticoStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="testeHidrostaticoStatus"
                value="Não se aplica"
                checked={formData.testeHidrostaticoStatus === "Não se aplica"}
                onChange={() => handleRadioChange("testeHidrostaticoStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>

          <div className="additional-options">
            <label className="radio-option">
              <input
                type="radio"
                name="testeHidrostaticoTipo"
                value="Não realizado a critério do PLH"
                checked={formData.testeHidrostaticoTipo === "Não realizado a critério do PLH"}
                onChange={() => handleRadioChange("testeHidrostaticoTipo", "Não realizado a critério do PLH")}
              />
              <span>Não realizado a critério do PLH</span>
            </label>
            <div className="radio-option-with-input">
              <label className="radio-option">
                <input
                  type="radio"
                  name="testeHidrostaticoTipo"
                  value="Realizado"
                  checked={formData.testeHidrostaticoTipo === "Realizado"}
                  onChange={() => handleRadioChange("testeHidrostaticoTipo", "Realizado")}
                />
                <span>Realizado</span>
              </label>
              <div className="input-field-inline">
                <label htmlFor="testeHidrostaticoExecutadoPor">Executado por:</label>
                <input
                  id="testeHidrostaticoExecutadoPor"
                  name="testeHidrostaticoExecutadoPor"
                  type="text"
                  placeholder="Ex: ITB na fabricação"
                  value={formData.testeHidrostaticoExecutadoPor || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="note-box">
            <p><strong>Nota</strong> – Na falta de comprovação de que o teste tenha sido realizado na fase de fabricação, se aplicará o disposto a seguir:</p>
            <ul>
              <li>a) para vasos de pressão fabricados ou importados a partir de 2 de maio de 2014, o TH deve ser feito durante a inspeção inicial; ou</li>
              <li>b) para os vasos de pressão em operação antes de 02 de maio de 2014, a execução do TH correspondente ao da fabricação fica a critério do PLH e, caso este julgue necessário, deve ser executado até a próxima inspeção de segurança periódica interna.</li>
            </ul>
          </div>
        </div>

        {/* Pergunta 7: Manual de operação */}
        <div className="question-block">
          <div className="question-text">
            <p>
              Possui manual de operação e profissional capacitado, para vasos de categoria I ou II (subitem 13.5.3.1 e 13.5.3.2)?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="manualOperacaoStatus"
                value="Conforme"
                checked={formData.manualOperacaoStatus === "Conforme"}
                onChange={() => handleRadioChange("manualOperacaoStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="manualOperacaoStatus"
                value="Não conforme"
                checked={formData.manualOperacaoStatus === "Não conforme"}
                onChange={() => handleRadioChange("manualOperacaoStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="manualOperacaoStatus"
                value="Não se aplica"
                checked={formData.manualOperacaoStatus === "Não se aplica"}
                onChange={() => handleRadioChange("manualOperacaoStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>
        </div>

      </form>
    </div>
  );
}

