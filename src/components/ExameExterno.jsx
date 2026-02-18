import React, { useState } from "react";
import "../styles/form.css";
import "../styles/exame-externo.css";

export default function ExameExterno({ formData, setFormData }) {
  const [activeSubTab, setActiveSubTab] = useState("geral");

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
      <h2 className="form-title">8. EXAME EXTERNO</h2>
      
      <form className="form-nr13">

        {/* Pergunta 1: Placa de identificação */}
        <div className="question-block">
          <div className="question-text">
            <p>
              Possui placa de identificação (subitem 13.5.1.3)?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="placaIdentificacaoStatus"
                value="Conforme"
                checked={formData.placaIdentificacaoStatus === "Conforme"}
                onChange={() => handleRadioChange("placaIdentificacaoStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="placaIdentificacaoStatus"
                value="Não conforme"
                checked={formData.placaIdentificacaoStatus === "Não conforme"}
                onChange={() => handleRadioChange("placaIdentificacaoStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="placaIdentificacaoStatus"
                value="Não se aplica"
                checked={formData.placaIdentificacaoStatus === "Não se aplica"}
                onChange={() => handleRadioChange("placaIdentificacaoStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>

          <div className="note-box">
            <p>
              <strong>Nota</strong> – De acordo com o subitem 13.5.1.3 a placa de identificação indelével deve conter no mínimo 
              as seguintes informações: fabricante, número de identificação, ano de fabricação, pressão máxima de trabalho 
              admissível e código de construção e ano de edição.
            </p>
          </div>
        </div>

        {/* Pergunta 2: Adesivo/pintura */}
        <div className="question-block">
          <div className="question-text">
            <p>
              Adesivo/ pintura com a categoria e seu número ou código de identificação (subitem 13.5.1.4)?
            </p>
          </div>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="adesivoPinturaStatus"
                value="Conforme"
                checked={formData.adesivoPinturaStatus === "Conforme"}
                onChange={() => handleRadioChange("adesivoPinturaStatus", "Conforme")}
              />
              <span>Conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="adesivoPinturaStatus"
                value="Não conforme"
                checked={formData.adesivoPinturaStatus === "Não conforme"}
                onChange={() => handleRadioChange("adesivoPinturaStatus", "Não conforme")}
              />
              <span>Não conforme</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="adesivoPinturaStatus"
                value="Não se aplica"
                checked={formData.adesivoPinturaStatus === "Não se aplica"}
                onChange={() => handleRadioChange("adesivoPinturaStatus", "Não se aplica")}
              />
              <span>Não se aplica</span>
            </label>
          </div>
        </div>

        {/* Navegação por Sub-abas */}
        <div className="sub-section-tabs">
          <button
            type="button"
            className={`sub-section-tab ${activeSubTab === "registroFotografico" ? "active" : ""}`}
            onClick={() => setActiveSubTab("registroFotografico")}
          >
            8.1 Registro Fotográfico
          </button>
          <button
            type="button"
            className={`sub-section-tab ${activeSubTab === "instrumentos" ? "active" : ""}`}
            onClick={() => setActiveSubTab("instrumentos")}
          >
            8.2 Dados dos Instrumentos
          </button>
        </div>

        {/* 8.1 Registro Fotográfico */}
        {activeSubTab === "registroFotografico" && (
          <div className="sub-section-content">
            <div className="form-section-divider">
              <h3>8.1 Registro Fotográfico</h3>
            </div>

            <div className="photo-upload-section">
              <div className="form-group">
                <label>Upload de Fotos</label>
                <div className="image-upload-area">
                  <input
                    type="file"
                    id="fotosExameExterno"
                    name="fotosExameExterno"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const readers = files.map(file => {
                        return new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.onloadend = () => resolve(reader.result);
                          reader.readAsDataURL(file);
                        });
                      });

                      Promise.all(readers).then(results => {
                        setFormData(prev => ({
                          ...prev,
                          fotosExameExterno: [...(prev.fotosExameExterno || []), ...results]
                        }));
                      });
                    }}
                    style={{ display: 'none' }}
                  />
                  <label 
                    htmlFor="fotosExameExterno" 
                    className="image-upload-label"
                  >
                    <div className="image-placeholder">
                      <div className="upload-icon-wrapper">
                        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="upload-text">Clique para anexar fotos do exame externo</p>
                      <p className="upload-hint">ou arraste e solte aqui (múltiplas imagens)</p>
                    </div>
                  </label>
                </div>
              </div>

              {formData.fotosExameExterno && formData.fotosExameExterno.length > 0 && (
                <div className="photos-grid">
                  {formData.fotosExameExterno.map((foto, index) => (
                    <div key={index} className="photo-item">
                      <img src={foto} alt={`Foto ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-photo-btn"
                        onClick={() => {
                          const novasFotos = formData.fotosExameExterno.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            fotosExameExterno: novasFotos
                          }));
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="observacoesFotos">Observações sobre as fotos:</label>
                <textarea
                  id="observacoesFotos"
                  name="observacoesFotos"
                  rows="3"
                  placeholder="Ex: Não foram identificados defeitos nas chapas, soldas ou estrutura de sustentação."
                  value={formData.observacoesFotos || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* 8.2 Dados dos Instrumentos */}
        {activeSubTab === "instrumentos" && (
          <div className="sub-section-content">
            <div className="form-section-divider">
              <h3>8.2 Dados dos instrumentos de controle e dos dispositivos de alívio de pressão</h3>
            </div>

            {/* Dispositivo de Alívio de Pressão */}
            <div className="question-block">
              <h4 className="subsection-title">DISPOSITIVO DE ALÍVIO DE PRESSÃO</h4>

              <div className="form-group">
                <label>Tipo de instalação:</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="dispositivoAlivioInstalacao"
                      value="Instalado direto no vaso"
                      checked={formData.dispositivoAlivioInstalacao === "Instalado direto no vaso"}
                      onChange={() => handleRadioChange("dispositivoAlivioInstalacao", "Instalado direto no vaso")}
                    />
                    <span>Instalado direto no vaso</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="dispositivoAlivioInstalacao"
                      value="Instalado no sistema que o inclui"
                      checked={formData.dispositivoAlivioInstalacao === "Instalado no sistema que o inclui"}
                      onChange={() => handleRadioChange("dispositivoAlivioInstalacao", "Instalado no sistema que o inclui")}
                    />
                    <span>Instalado no sistema que o inclui</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="dispositivoAlivioInstalacao"
                      value="Suporta vácuo total"
                      checked={formData.dispositivoAlivioInstalacao === "Suporta vácuo total"}
                      onChange={() => handleRadioChange("dispositivoAlivioInstalacao", "Suporta vácuo total")}
                    />
                    <span>Suporta vácuo total</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="dispositivoAlivioInstalacao"
                      value="Não possui"
                      checked={formData.dispositivoAlivioInstalacao === "Não possui"}
                      onChange={() => handleRadioChange("dispositivoAlivioInstalacao", "Não possui")}
                    />
                    <span>Não possui</span>
                  </label>
                </div>
              </div>

              {formData.dispositivoAlivioInstalacao === "Instalado no sistema que o inclui" && (
                <div className="note-box">
                  <p>
                    <strong>Descrição do sistema que o inclui (subitem 13.5.1.2 alínea "a"):</strong>
                  </p>
                  <textarea
                    id="descricaoSistemaAlivio"
                    name="descricaoSistemaAlivio"
                    rows="3"
                    placeholder='Ex: Possui sistema denominado "Degasagem" para alívio de sobre pressão. (Vide fluxograma e parecer em anexo)'
                    value={formData.descricaoSistemaAlivio || ""}
                    onChange={handleChange}
                    className="note-textarea"
                  />
                </div>
              )}

              <div className="form-section-divider-small">
                <h5>Dados da válvula de segurança principal:</h5>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de válvula:</label>
                  <div className="radio-options">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="tipoValvulaSeguranca"
                        value="Segurança"
                        checked={formData.tipoValvulaSeguranca === "Segurança"}
                        onChange={() => handleRadioChange("tipoValvulaSeguranca", "Segurança")}
                      />
                      <span>Segurança</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="tipoValvulaSeguranca"
                        value="Alívio"
                        checked={formData.tipoValvulaSeguranca === "Alívio"}
                        onChange={() => handleRadioChange("tipoValvulaSeguranca", "Alívio")}
                      />
                      <span>Alívio</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="tipoValvulaSeguranca"
                        value="N/A"
                        checked={formData.tipoValvulaSeguranca === "N/A"}
                        onChange={() => handleRadioChange("tipoValvulaSeguranca", "N/A")}
                      />
                      <span>N/A</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Bloqueio inadvertido:</label>
                  <div className="radio-options">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="bloqueioInadvertido"
                        value="Sim"
                        checked={formData.bloqueioInadvertido === "Sim"}
                        onChange={() => handleRadioChange("bloqueioInadvertido", "Sim")}
                      />
                      <span>Sim</span>
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="bloqueioInadvertido"
                        value="Não"
                        checked={formData.bloqueioInadvertido === "Não"}
                        onChange={() => handleRadioChange("bloqueioInadvertido", "Não")}
                      />
                      <span>Não</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Abertura ≤ PMTA:</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="aberturaPmta"
                      value="Sim"
                      checked={formData.aberturaPmta === "Sim"}
                      onChange={() => handleRadioChange("aberturaPmta", "Sim")}
                    />
                    <span>Sim</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="aberturaPmta"
                      value="Não"
                      checked={formData.aberturaPmta === "Não"}
                      onChange={() => handleRadioChange("aberturaPmta", "Não")}
                    />
                    <span>Não</span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fabricanteValvula">Fabricante:</label>
                  <input
                    id="fabricanteValvula"
                    name="fabricanteValvula"
                    type="text"
                    placeholder="---"
                    value={formData.fabricanteValvula || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numeroSerieValvula">Nº de série:</label>
                  <input
                    id="numeroSerieValvula"
                    name="numeroSerieValvula"
                    type="text"
                    placeholder="---"
                    value={formData.numeroSerieValvula || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tagValvula">TAG:</label>
                  <input
                    id="tagValvula"
                    name="tagValvula"
                    type="text"
                    placeholder="---"
                    value={formData.tagValvula || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="diametroConexaoValvula">Diâmetro da conexão:</label>
                  <input
                    id="diametroConexaoValvula"
                    name="diametroConexaoValvula"
                    type="text"
                    placeholder="---"
                    value={formData.diametroConexaoValvula || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pressaoAjusteValvula">Pressão de ajuste:</label>
                  <input
                    id="pressaoAjusteValvula"
                    name="pressaoAjusteValvula"
                    type="text"
                    placeholder="---"
                    value={formData.pressaoAjusteValvula || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numeroCertificadoValvula">Nº do certificado:</label>
                  <input
                    id="numeroCertificadoValvula"
                    name="numeroCertificadoValvula"
                    type="text"
                    placeholder="---"
                    value={formData.numeroCertificadoValvula || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Instrumento Indicador de Pressão */}
            <div className="question-block">
              <h4 className="subsection-title">INSTRUMENTO INDICADOR DE PRESSÃO</h4>

              <div className="form-group">
                <label>Tipo de instalação:</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="instrumentoPressaoInstalacao"
                      value="Instalado direto no vaso"
                      checked={formData.instrumentoPressaoInstalacao === "Instalado direto no vaso"}
                      onChange={() => handleRadioChange("instrumentoPressaoInstalacao", "Instalado direto no vaso")}
                    />
                    <span>Instalado direto no vaso</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="instrumentoPressaoInstalacao"
                      value="Instalado no sistema que o inclui"
                      checked={formData.instrumentoPressaoInstalacao === "Instalado no sistema que o inclui"}
                      onChange={() => handleRadioChange("instrumentoPressaoInstalacao", "Instalado no sistema que o inclui")}
                    />
                    <span>Instalado no sistema que o inclui</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="instrumentoPressaoInstalacao"
                      value="Suporta vácuo total"
                      checked={formData.instrumentoPressaoInstalacao === "Suporta vácuo total"}
                      onChange={() => handleRadioChange("instrumentoPressaoInstalacao", "Suporta vácuo total")}
                    />
                    <span>Suporta vácuo total</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="instrumentoPressaoInstalacao"
                      value="Não possui"
                      checked={formData.instrumentoPressaoInstalacao === "Não possui"}
                      onChange={() => handleRadioChange("instrumentoPressaoInstalacao", "Não possui")}
                    />
                    <span>Não possui</span>
                  </label>
                </div>
              </div>

              {formData.instrumentoPressaoInstalacao === "Instalado no sistema que o inclui" && (
                <div className="note-box">
                  <p>
                    <strong>Descrição do sistema que o inclui (subitem 13.5.1.2 alínea "d"):</strong>
                  </p>
                  <textarea
                    id="descricaoSistemaInstrumento"
                    name="descricaoSistemaInstrumento"
                    rows="3"
                    placeholder="Ex: Possui transmissores de pressão e temperatura no sistema que o inclui com as informações transmitidas na sala de controle. (Vide fluxograma em anexo)"
                    value={formData.descricaoSistemaInstrumento || ""}
                    onChange={handleChange}
                    className="note-textarea"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Bloqueio inadvertido:</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="bloqueioInadvertidoInstrumento"
                      value="Sim"
                      checked={formData.bloqueioInadvertidoInstrumento === "Sim"}
                      onChange={() => handleRadioChange("bloqueioInadvertidoInstrumento", "Sim")}
                    />
                    <span>Sim</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="bloqueioInadvertidoInstrumento"
                      value="Não"
                      checked={formData.bloqueioInadvertidoInstrumento === "Não"}
                      onChange={() => handleRadioChange("bloqueioInadvertidoInstrumento", "Não")}
                    />
                    <span>Não</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Abertura ≤ PMTA:</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="aberturaPmtaInstrumento"
                      value="Sim"
                      checked={formData.aberturaPmtaInstrumento === "Sim"}
                      onChange={() => handleRadioChange("aberturaPmtaInstrumento", "Sim")}
                    />
                    <span>Sim</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="aberturaPmtaInstrumento"
                      value="Não"
                      checked={formData.aberturaPmtaInstrumento === "Não"}
                      onChange={() => handleRadioChange("aberturaPmtaInstrumento", "Não")}
                    />
                    <span>Não</span>
                  </label>
                </div>
              </div>

              <div className="form-section-divider-small">
                <h5>Dados do instrumento principal:</h5>
              </div>

              <div className="form-group">
                <label>Tipo de instrumento:</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="tipoInstrumentoPrincipal"
                      value="Manômetro"
                      checked={formData.tipoInstrumentoPrincipal === "Manômetro"}
                      onChange={() => handleRadioChange("tipoInstrumentoPrincipal", "Manômetro")}
                    />
                    <span>Manômetro</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="tipoInstrumentoPrincipal"
                      value="Manovacuômetro"
                      checked={formData.tipoInstrumentoPrincipal === "Manovacuômetro"}
                      onChange={() => handleRadioChange("tipoInstrumentoPrincipal", "Manovacuômetro")}
                    />
                    <span>Manovacuômetro</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="tipoInstrumentoPrincipal"
                      value="Transmissor de pressão"
                      checked={formData.tipoInstrumentoPrincipal === "Transmissor de pressão"}
                      onChange={() => handleRadioChange("tipoInstrumentoPrincipal", "Transmissor de pressão")}
                    />
                    <span>Transmissor de pressão</span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fabricanteInstrumento">Fabricante:</label>
                  <input
                    id="fabricanteInstrumento"
                    name="fabricanteInstrumento"
                    type="text"
                    placeholder="---"
                    value={formData.fabricanteInstrumento || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numeroSerieInstrumento">Nº de série:</label>
                  <input
                    id="numeroSerieInstrumento"
                    name="numeroSerieInstrumento"
                    type="text"
                    placeholder="---"
                    value={formData.numeroSerieInstrumento || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tagInstrumento">TAG:</label>
                  <input
                    id="tagInstrumento"
                    name="tagInstrumento"
                    type="text"
                    placeholder="---"
                    value={formData.tagInstrumento || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="escalaInstrumento">Escala:</label>
                  <input
                    id="escalaInstrumento"
                    name="escalaInstrumento"
                    type="text"
                    placeholder="---"
                    value={formData.escalaInstrumento || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="diametroMostradorInstrumento">Diâmetro do mostrador:</label>
                  <input
                    id="diametroMostradorInstrumento"
                    name="diametroMostradorInstrumento"
                    type="text"
                    placeholder="---"
                    value={formData.diametroMostradorInstrumento || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="numeroCertificadoInstrumento">Nº do certificado:</label>
                  <input
                    id="numeroCertificadoInstrumento"
                    name="numeroCertificadoInstrumento"
                    type="text"
                    placeholder="---"
                    value={formData.numeroCertificadoInstrumento || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
