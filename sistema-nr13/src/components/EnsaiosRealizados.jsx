import React, { useState } from "react";
import "../styles/form.css";
import "../styles/ensaios-realizados.css";

export default function EnsaiosRealizados({ formData, setFormData }) {
  const [activeSubTab, setActiveSubTab] = useState("medicaoEspessura");
  const [activeSubSection, setActiveSubSection] = useState("dadosEnsaio"); // Para 10.1.1 dentro de 10.1

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

  // Adicionar nova medição na tabela
  const adicionarMedicao = () => {
    const novaMedicao = {
      id: Date.now(),
      ponto: "",
      espessuraEncontrada: "",
      menorEspessuraPMTA: "",
      espessuraConstrucao: "",
      perdaEspessura: "",
      tempoOperacao: "",
      taxaCorrosao: "",
      foto: "",
      observacoes: ""
    };
    setFormData(prev => ({
      ...prev,
      registroMedicoes: [...(prev.registroMedicoes || []), novaMedicao]
    }));
  };

  // Upload de foto para uma medição específica
  const handleFotoUpload = (id, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        atualizarMedicao(id, "foto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remover medição
  const removerMedicao = (id) => {
    setFormData(prev => ({
      ...prev,
      registroMedicoes: (prev.registroMedicoes || []).filter(m => m.id !== id)
    }));
  };

  // Atualizar medição
  const atualizarMedicao = (id, campo, valor) => {
    setFormData(prev => ({
      ...prev,
      registroMedicoes: (prev.registroMedicoes || []).map(m => 
        m.id === id ? { ...m, [campo]: valor } : m
      )
    }));
  };

  return (
    <div className="formulario-container">
      <h2 className="form-title">10. ENSAIOS REALIZADOS</h2>
      
      <form className="form-nr13">

        {/* Navegação por Sub-abas */}
        <div className="sub-section-tabs">
          <button
            type="button"
            className={`sub-section-tab ${activeSubTab === "medicaoEspessura" ? "active" : ""}`}
            onClick={() => setActiveSubTab("medicaoEspessura")}
          >
            10.1 Medição de espessura por ultrassom
          </button>
          <button
            type="button"
            className={`sub-section-tab ${activeSubTab === "testesPressao" ? "active" : ""}`}
            onClick={() => setActiveSubTab("testesPressao")}
          >
            10.2 Testes com pressão
          </button>
        </div>

        {/* 10.1 Medição de espessura por ultrassom */}
        {activeSubTab === "medicaoEspessura" && (
          <div className="sub-section-content">
            <div className="form-section-divider">
              <h3>10.1 Medição de espessura por ultrassom</h3>
            </div>

            {/* Navegação interna para 10.1.1 */}
            <div className="inner-sub-tabs">
              <button
                type="button"
                className={`inner-sub-tab ${activeSubSection === "dadosEnsaio" ? "active" : ""}`}
                onClick={() => setActiveSubSection("dadosEnsaio")}
              >
                Dados do Ensaio
              </button>
              <button
                type="button"
                className={`inner-sub-tab ${activeSubSection === "registroMedicoes" ? "active" : ""}`}
                onClick={() => setActiveSubSection("registroMedicoes")}
              >
                10.1.1 Registro das medições
              </button>
            </div>

            {/* Dados do Ensaio */}
            {activeSubSection === "dadosEnsaio" && (
              <div className="inner-section-content">
                <div className="form-section-divider-small">
                  <h4>DADOS DO ENSAIO</h4>
                </div>

                <div className="ensaio-data-table">
                  <div className="table-row">
                    <div className="table-cell">
                      <label>Material</label>
                      <input
                        type="text"
                        name="ensaioMaterial"
                        placeholder="Ex: Inox"
                        value={formData.ensaioMaterial || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="table-cell">
                      <label>Condição da superfície</label>
                      <input
                        type="text"
                        name="ensaioCondicaoSuperficie"
                        placeholder="Ex: Metal de base"
                        value={formData.ensaioCondicaoSuperficie || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="table-cell">
                      <label>Acoplante utilizado</label>
                      <input
                        type="text"
                        name="ensaioAcoplante"
                        placeholder="Ex: Carboximetilcelulose"
                        value={formData.ensaioAcoplante || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="table-row">
                    <div className="table-cell">
                      <label>Aparelho utilizado</label>
                      <input
                        type="text"
                        name="ensaioAparelho"
                        placeholder="Ex: AKROM"
                        value={formData.ensaioAparelho || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="table-cell">
                      <label>Modelo</label>
                      <input
                        type="text"
                        name="ensaioModelo"
                        placeholder="Ex: KR225"
                        value={formData.ensaioModelo || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="table-cell">
                      <label>Transdutor</label>
                      <input
                        type="text"
                        name="ensaioTransdutor"
                        placeholder="Ex: 5P_5 MHz"
                        value={formData.ensaioTransdutor || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="table-row">
                    <div className="table-cell">
                      <label>Velocidade sônica (m/s)</label>
                      <input
                        type="text"
                        name="ensaioVelocidadeSonica"
                        placeholder="Ex: 5900"
                        value={formData.ensaioVelocidadeSonica || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="table-cell">
                      <label>Espessura do bloco (mm)</label>
                      <input
                        type="text"
                        name="ensaioEspessuraBloco"
                        placeholder="Ex: 4,00"
                        value={formData.ensaioEspessuraBloco || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="table-cell">
                      <label>Técnica</label>
                      <input
                        type="text"
                        name="ensaioTecnica"
                        placeholder="Ex: A-SCAN"
                        value={formData.ensaioTecnica || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="note-box">
                  <p>
                    <em>O Certificado de calibração do medidor de espessura segue em anexo.</em>
                  </p>
                </div>
              </div>
            )}

            {/* 10.1.1 Registro das medições */}
            {activeSubSection === "registroMedicoes" && (
              <div className="inner-section-content">
                <div className="form-section-divider-small">
                  <h4>10.1.1 Registro das medições</h4>
                </div>

                {/* Lista de medições */}
                <div className="medicoes-list">
                  {(formData.registroMedicoes || []).map((medicao, index) => (
                    <div key={medicao.id} className="medicao-card">
                      <div className="medicao-header">
                        <h5>Medição {index + 1}</h5>
                        <button
                          type="button"
                          className="btn-remove-medicao"
                          onClick={() => removerMedicao(medicao.id)}
                        >
                          ✕ Remover
                        </button>
                      </div>

                      {/* Upload de Imagem */}
                      <div className="medicao-foto-section">
                        <label>Foto do Ponto de Medição</label>
                        <div className="medicao-image-upload">
                          {medicao.foto ? (
                            <div className="medicao-image-preview">
                              <img src={medicao.foto} alt={`Ponto ${medicao.ponto || index + 1}`} />
                              <button
                                type="button"
                                className="btn-remove-image"
                                onClick={() => atualizarMedicao(medicao.id, "foto", "")}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="medicao-image-upload-area">
                              <input
                                type="file"
                                id={`foto-medicao-${medicao.id}`}
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFotoUpload(medicao.id, file);
                                }}
                                style={{ display: 'none' }}
                              />
                              <label htmlFor={`foto-medicao-${medicao.id}`} className="medicao-upload-label">
                                <div className="medicao-upload-icon">
                                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <p>Clique para adicionar foto</p>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tabela REGISTRO / ESPESSURA MÍNIMA */}
                      <div className="medicao-table-section">
                        <h6 className="medicao-table-title">REGISTRO / ESPESSURA MÍNIMA</h6>
                        <table className="medicao-data-table">
                          <thead>
                            <tr>
                              <th>Ponto</th>
                              <th>Espessura encontrada (mm)</th>
                              <th>Menor espessura para PMTA (mm)</th>
                              <th>Espessura de construção (mm)</th>
                              <th>Perda de espessura (mm)</th>
                              <th>Tempo de operação (anos)</th>
                              <th>Taxa de corrosão (mm/ano)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  value={medicao.ponto || ""}
                                  onChange={(e) => atualizarMedicao(medicao.id, "ponto", e.target.value)}
                                  placeholder="Ex: 01 - Tampo inferior"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={medicao.espessuraEncontrada || ""}
                                  onChange={(e) => atualizarMedicao(medicao.id, "espessuraEncontrada", e.target.value)}
                                  placeholder="Ex: 4,00"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={medicao.menorEspessuraPMTA || ""}
                                  onChange={(e) => atualizarMedicao(medicao.id, "menorEspessuraPMTA", e.target.value)}
                                  placeholder="Ex: 3,50"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={medicao.espessuraConstrucao || ""}
                                  onChange={(e) => atualizarMedicao(medicao.id, "espessuraConstrucao", e.target.value)}
                                  placeholder="Ex: 4,00"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={medicao.perdaEspessura || ""}
                                  onChange={(e) => atualizarMedicao(medicao.id, "perdaEspessura", e.target.value)}
                                  placeholder="Ex: 0,00"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={medicao.tempoOperacao || ""}
                                  onChange={(e) => atualizarMedicao(medicao.id, "tempoOperacao", e.target.value)}
                                  placeholder="Ex: 10"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={medicao.taxaCorrosao || ""}
                                  onChange={(e) => atualizarMedicao(medicao.id, "taxaCorrosao", e.target.value)}
                                  placeholder="Ex: 0,000"
                                  className={medicao.taxaCorrosao ? "taxa-corrosao-cell" : ""}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Campo de Observações */}
                      <div className="medicao-observacoes">
                        <label htmlFor={`observacoes-${medicao.id}`}>Observações / Itens:</label>
                        <textarea
                          id={`observacoes-${medicao.id}`}
                          rows="3"
                          value={medicao.observacoes || ""}
                          onChange={(e) => atualizarMedicao(medicao.id, "observacoes", e.target.value)}
                          placeholder="Digite observações ou itens adicionais sobre esta medição..."
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn-add-medicao"
                  onClick={adicionarMedicao}
                >
                  + Adicionar Nova Medição
                </button>
              </div>
            )}
          </div>
        )}

        {/* 10.2 Testes com pressão */}
        {activeSubTab === "testesPressao" && (
          <div className="sub-section-content">
            <div className="form-section-divider">
              <h3>10.2 Testes com pressão</h3>
            </div>

            <div className="testes-pressao-form">
              {/* Seção do vaso de pressão */}
              <div className="form-group">
                <label>Seção do vaso de pressão:</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="testesPressaoSecaoVaso"
                      value="Casco"
                      checked={formData.testesPressaoSecaoVaso === "Casco"}
                      onChange={() => handleRadioChange("testesPressaoSecaoVaso", "Casco")}
                    />
                    <span>Casco</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="testesPressaoSecaoVaso"
                      value="Tubos"
                      checked={formData.testesPressaoSecaoVaso === "Tubos"}
                      onChange={() => handleRadioChange("testesPressaoSecaoVaso", "Tubos")}
                    />
                    <span>Tubos</span>
                  </label>
                </div>
              </div>

              {/* Foi realizado? */}
              <div className="form-group">
                <label>Foi realizado?</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="testesPressaoFoiRealizado"
                      value="Sim"
                      checked={formData.testesPressaoFoiRealizado === "Sim"}
                      onChange={() => handleRadioChange("testesPressaoFoiRealizado", "Sim")}
                    />
                    <span>Sim</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="testesPressaoFoiRealizado"
                      value="Não"
                      checked={formData.testesPressaoFoiRealizado === "Não"}
                      onChange={() => handleRadioChange("testesPressaoFoiRealizado", "Não")}
                    />
                    <span>Não</span>
                  </label>
                </div>
              </div>

              {/* Tipo de teste */}
              <div className="form-group">
                <label>Tipo de teste?</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="testesPressaoTipo"
                      value="Estanqueidade"
                      checked={formData.testesPressaoTipo === "Estanqueidade"}
                      onChange={() => handleRadioChange("testesPressaoTipo", "Estanqueidade")}
                    />
                    <span>Estanqueidade</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="testesPressaoTipo"
                      value="Hidrostático"
                      checked={formData.testesPressaoTipo === "Hidrostático"}
                      onChange={() => handleRadioChange("testesPressaoTipo", "Hidrostático")}
                    />
                    <span>Hidrostático</span>
                  </label>
                </div>
              </div>

              {/* Pressão aplicada */}
              <div className="form-group">
                <label htmlFor="testesPressaoPressaoAplicada">Pressão aplicada:</label>
                <input
                  id="testesPressaoPressaoAplicada"
                  name="testesPressaoPressaoAplicada"
                  type="text"
                  placeholder="Ex: Pressão de trabalho do sistema"
                  value={formData.testesPressaoPressaoAplicada || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Duração do teste */}
              <div className="form-group">
                <label htmlFor="testesPressaoDuracao">Duração do teste:</label>
                <input
                  id="testesPressaoDuracao"
                  name="testesPressaoDuracao"
                  type="text"
                  placeholder="Ex: 1h"
                  value={formData.testesPressaoDuracao || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Foi observado vazamento ou deformação? */}
              <div className="form-group">
                <label>Foi observado vazamento ou deformação?</label>
                <div className="radio-options">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="testesPressaoVazamentoDeformacao"
                      value="Sim"
                      checked={formData.testesPressaoVazamentoDeformacao === "Sim"}
                      onChange={() => handleRadioChange("testesPressaoVazamentoDeformacao", "Sim")}
                    />
                    <span>Sim</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="testesPressaoVazamentoDeformacao"
                      value="Não"
                      checked={formData.testesPressaoVazamentoDeformacao === "Não"}
                      onChange={() => handleRadioChange("testesPressaoVazamentoDeformacao", "Não")}
                    />
                    <span>Não</span>
                  </label>
                </div>
              </div>

              {/* Descrição (quando Sim for selecionado) */}
              {formData.testesPressaoVazamentoDeformacao === "Sim" && (
                <div className="form-group">
                  <label htmlFor="testesPressaoDescricaoVazamento">Descreva:</label>
                  <textarea
                    id="testesPressaoDescricaoVazamento"
                    name="testesPressaoDescricaoVazamento"
                    rows="4"
                    placeholder="Descreva o vazamento ou deformação observada..."
                    value={formData.testesPressaoDescricaoVazamento || ""}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* Observações gerais */}
              <div className="form-group">
                <label htmlFor="testesPressaoObservacoes">Observações:</label>
                <textarea
                  id="testesPressaoObservacoes"
                  name="testesPressaoObservacoes"
                  rows="6"
                  placeholder="Digite as observações sobre os testes com pressão..."
                  value={formData.testesPressaoObservacoes || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}

