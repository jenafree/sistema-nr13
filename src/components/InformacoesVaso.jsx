import React, { useState } from "react";
import "../styles/form.css";
import "../styles/informacoes-vaso.css";

export default function InformacoesVaso({ formData, setFormData }) {
  const [tipoVaso, setTipoVaso] = useState(formData.tipoVasoSelecionado || "casco");
  const [activeSection, setActiveSection] = useState("operacionais");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleTipoVasoChange(tipo) {
    setTipoVaso(tipo);
    setFormData(prev => ({
      ...prev,
      tipoVasoSelecionado: tipo
    }));
  }

  // Função para obter o nome do campo baseado no tipo selecionado
  function getFieldName(field) {
    const fieldMap = {
      "fluido": tipoVaso === "casco" ? "fluidoCasco" : "fluidoTubos",
      "volumeInformado": "volumeInformadoCasco",
      "volumeCalculado": "volumeCalculadoTubos",
      "pressaoProjeto": tipoVaso === "casco" ? "pressaoProjetoCasco" : "pressaoProjetoTubos",
      "pmta": tipoVaso === "casco" ? "pmtaCasco" : "pmtaTubos",
      "limitada": tipoVaso === "casco" ? "limitadaCasco" : "limitadaTubos",
      "pmea": tipoVaso === "casco" ? "pmeaCasco" : "pmeaTubos",
      "limitadaPmea": tipoVaso === "casco" ? "limitadaPmeaCasco" : "limitadaPmeaTubos",
      "pressaoOperacao": tipoVaso === "casco" ? "pressaoOperacaoCasco" : "pressaoOperacaoTubos",
      "pressaoTeste": tipoVaso === "casco" ? "pressaoTesteCasco" : "pressaoTesteTubos",
      "temperaturaProjeto": tipoVaso === "casco" ? "temperaturaProjetoCasco" : "temperaturaProjetoTubos",
      "temperaturaOperacao": tipoVaso === "casco" ? "temperaturaOperacaoCasco" : "temperaturaOperacaoTubos",
      "diametroInterno": "diametroInternoCasco",
      "diametro": "diametroTubos",
      "alturaComprimento": tipoVaso === "casco" ? "alturaComprimentoCasco" : "alturaComprimentoTubos",
      "pinturaExterna": "pinturaExternaCasco",
      "material": "materialCasco",
      "quantidade": "quantidadeTubos",
      "superficieTroca": "superficieTrocaTubos",
      "pv": tipoVaso === "casco" ? "pvCasco" : "pvTubos",
      "classeFluido": tipoVaso === "casco" ? "classeFluidoCasco" : "classeFluidoTubos",
      "grupoRisco": tipoVaso === "casco" ? "grupoRiscoCasco" : "grupoRiscoTubos",
      "categoria": tipoVaso === "casco" ? "categoriaCasco" : "categoriaTubos"
    };
    return fieldMap[field] || field;
  }

  // Função para obter o valor do campo baseado no tipo selecionado
  function getFieldValue(field) {
    const fieldName = getFieldName(field);
    return formData[fieldName] || "";
  }

  // Função para atualizar o campo baseado no tipo selecionado
  function updateField(field, value) {
    const fieldName = getFieldName(field);
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }

  return (
    <div className="formulario-container">
      <h2 className="form-title">4. INFORMAÇÕES DO VASO</h2>
      
      {/* Seletor de Tipo */}
      <div className="tipo-vaso-selector">
        <label className="tipo-vaso-label">Tipo de Vaso:</label>
        <div className="tipo-vaso-buttons">
          <button
            type="button"
            className={`tipo-vaso-btn ${tipoVaso === "casco" ? "active" : ""}`}
            onClick={() => handleTipoVasoChange("casco")}
          >
            CASCO
          </button>
          <button
            type="button"
            className={`tipo-vaso-btn ${tipoVaso === "tubos" ? "active" : ""}`}
            onClick={() => handleTipoVasoChange("tubos")}
          >
            TUBOS / CALANDRA
          </button>
        </div>
      </div>

      <form className="form-nr13">

        {/* Navegação por Seções */}
        <div className="section-tabs">
          <button
            type="button"
            className={`section-tab ${activeSection === "operacionais" ? "active" : ""}`}
            onClick={() => setActiveSection("operacionais")}
          >
            Dados Operacionais
          </button>
          <button
            type="button"
            className={`section-tab ${activeSection === "construtivas" ? "active" : ""}`}
            onClick={() => setActiveSection("construtivas")}
          >
            Características Construtivas
          </button>
          <button
            type="button"
            className={`section-tab ${activeSection === "classificacao" ? "active" : ""}`}
            onClick={() => setActiveSection("classificacao")}
          >
            Classificação NR13
          </button>
        </div>

        {/* 1. DADOS OPERACIONAIS */}
        {activeSection === "operacionais" && (
          <div className="section-content">
            <div className="form-section-divider">
              <h3>1. DADOS OPERACIONAIS - {tipoVaso === "casco" ? "CASCO" : "TUBOS / CALANDRA"}</h3>
            </div>

            <div className="operational-data-single">
              <div className="form-row-three">
                <div className="form-group">
                  <label htmlFor="fluido">Fluido</label>
                  <input
                    id="fluido"
                    name={getFieldName("fluido")}
                    type="text"
                    placeholder="Ex: Álcool"
                    value={getFieldValue("fluido")}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="volume">
                    {tipoVaso === "casco" ? "Volume informado" : "Volume calculado"}
                  </label>
                  <div className="input-with-unit">
                    <input
                      id="volume"
                      name={tipoVaso === "casco" ? "volumeInformadoCasco" : "volumeCalculadoTubos"}
                      type="text"
                      placeholder="Ex: 1,39"
                      value={tipoVaso === "casco" ? (formData.volumeInformadoCasco || "") : (formData.volumeCalculadoTubos || "")}
                      onChange={handleChange}
                    />
                    <span className="unit">m³</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="pressaoProjeto">Pressão de projeto</label>
                  <div className="input-with-unit">
                    <input
                      id="pressaoProjeto"
                      name={getFieldName("pressaoProjeto")}
                      type="text"
                      placeholder="Ex: 1,20"
                      value={getFieldValue("pressaoProjeto")}
                      onChange={handleChange}
                    />
                    <span className="unit">kgf/cm²</span>
                  </div>
                </div>
              </div>

              <div className="vaso-field-group">
                <div className="vaso-field-group-title">Pressões Máximas</div>
                <div className="form-row-four">
                <div className="form-group">
                  <label htmlFor="pmta">P.M.T.A</label>
                  <div className="input-with-unit">
                    <input
                      id="pmta"
                      name={getFieldName("pmta")}
                      type="text"
                      placeholder="Ex: 1,50"
                      value={getFieldValue("pmta")}
                      onChange={handleChange}
                    />
                    <span className="unit">kgf/cm²</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="limitada">Limitada (P.M.T.A)</label>
                  <select
                    id="limitada"
                    className="vaso-select"
                    name={getFieldName("limitada")}
                    value={getFieldValue("limitada")}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="Tampo">Tampo</option>
                    <option value="Costado">Costado</option>
                    <option value="Espelho">Espelho</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="pmea">P.M.E.A</label>
                  <div className="input-with-unit">
                    <input
                      id="pmea"
                      name={getFieldName("pmea")}
                      type="text"
                      placeholder="Ex: 1,50"
                      value={getFieldValue("pmea")}
                      onChange={handleChange}
                    />
                    <span className="unit">kgf/cm²</span>
                  </div>
                  
                </div>

                <div className="form-group">
                  <label htmlFor="limitadaPmea">Limitada (P.M.E.A)</label>
                  <select
                    id="limitadaPmea"
                    className="vaso-select"
                    name={getFieldName("limitadaPmea")}
                    value={getFieldValue("limitadaPmea")}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="Tampo">Tampo</option>
                    <option value="Costado">Costado</option>
                    <option value="Espelho">Espelho</option>
                  </select>
                </div>
              </div>
              </div>

              <div className="vaso-field-group">
                <div className="vaso-field-group-title">Pressões de Operação</div>
                <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pressaoOperacao">Pressão de operação</label>
                  <div className="input-with-unit">
                    <input
                      id="pressaoOperacao"
                      name={getFieldName("pressaoOperacao")}
                      type="text"
                      placeholder="Ex: 0,70"
                      value={getFieldValue("pressaoOperacao")}
                      onChange={handleChange}
                    />
                    <span className="unit">kgf/cm²</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="pressaoTeste">Pressão de teste</label>
                  <div className="input-with-unit">
                    <input
                      id="pressaoTeste"
                      name={getFieldName("pressaoTeste")}
                      type="text"
                      placeholder="Ex: 2,00"
                      value={getFieldValue("pressaoTeste")}
                      onChange={handleChange}
                    />
                    <span className="unit">kgf/cm²</span>
                  </div>
                </div>
              </div>
              </div>

              <div className="vaso-field-group">
                <div className="vaso-field-group-title">Temperaturas</div>
                <div className="form-row">
                <div className="form-group">
                  <label htmlFor="temperaturaProjeto">Temperatura de projeto</label>
                  <div className="input-with-unit">
                    <input
                      id="temperaturaProjeto"
                      name={getFieldName("temperaturaProjeto")}
                      type="text"
                      placeholder="Ex: 50"
                      value={getFieldValue("temperaturaProjeto")}
                      onChange={handleChange}
                    />
                    <span className="unit">°C</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="temperaturaOperacao">Temperatura de operação</label>
                  <div className="input-with-unit">
                    <input
                      id="temperaturaOperacao"
                      name={getFieldName("temperaturaOperacao")}
                      type="text"
                      placeholder="Ex: 45"
                      value={getFieldValue("temperaturaOperacao")}
                      onChange={handleChange}
                    />
                    <span className="unit">°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* 2. CARACTERÍSTICAS CONSTRUTIVAS */}
        {activeSection === "construtivas" && (
          <div className="section-content">
            <div className="form-section-divider">
              <h3>2. CARACTERÍSTICAS CONSTRUTIVAS - {tipoVaso === "casco" ? "CASCO" : "TUBOS / CALANDRA"}</h3>
            </div>

            <div className="construction-data-single">
              {tipoVaso === "casco" ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="diametroInterno">Diâmetro interno</label>
                      <div className="input-with-unit">
                        <input
                          id="diametroInterno"
                          name={getFieldName("diametroInterno")}
                          type="text"
                          placeholder="Ex: 900"
                          value={getFieldValue("diametroInterno")}
                          onChange={handleChange}
                        />
                        <span className="unit">mm</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="alturaComprimento">Altura / comprimento</label>
                      <div className="input-with-unit">
                        <input
                          id="alturaComprimento"
                          name={getFieldName("alturaComprimento")}
                          type="text"
                          placeholder="Ex: 1970"
                          value={getFieldValue("alturaComprimento")}
                          onChange={handleChange}
                        />
                        <span className="unit">mm</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="pinturaExterna">Pintura externa</label>
                      <input
                        id="pinturaExterna"
                        name={getFieldName("pinturaExterna")}
                        type="text"
                        placeholder="Ex: Isolamento térmico"
                        value={getFieldValue("pinturaExterna")}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="material">Material</label>
                      <input
                        id="material"
                        name={getFieldName("material")}
                        type="text"
                        placeholder="Ex: SA-240 304"
                        value={getFieldValue("material")}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="diametroTubos">Diâmetro dos tubos</label>
                      <div className="input-with-unit">
                        <input
                          id="diametroTubos"
                          name="diametroTubos"
                          type="text"
                          placeholder="Ex: 25"
                          value={formData.diametroTubos || ""}
                          onChange={handleChange}
                        />
                        <span className="unit">mm</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="alturaComprimentoTubos">Altura / comprimento</label>
                      <div className="input-with-unit">
                        <input
                          id="alturaComprimentoTubos"
                          name={getFieldName("alturaComprimento")}
                          type="text"
                          placeholder="Ex: 1500"
                          value={getFieldValue("alturaComprimento")}
                          onChange={handleChange}
                        />
                        <span className="unit">mm</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="quantidadeTubos">Quantidade de tubos</label>
                      <input
                        id="quantidadeTubos"
                        name="quantidadeTubos"
                        type="text"
                        placeholder="Ex: 120"
                        value={formData.quantidadeTubos || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="superficieTroca">Superfície de troca</label>
                      <div className="input-with-unit">
                        <input
                          id="superficieTroca"
                          name="superficieTrocaTubos"
                          type="text"
                          placeholder="Ex: 15,5"
                          value={formData.superficieTrocaTubos || ""}
                          onChange={handleChange}
                        />
                        <span className="unit">m²</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* 3. CLASSIFICAÇÃO - NR13 */}
        {activeSection === "classificacao" && (
          <div className="section-content">
            <div className="form-section-divider">
              <h3>3. CLASSIFICAÇÃO - NR13 (SUBITEM 13.5.1.1.3) - {tipoVaso === "casco" ? "CASCO" : "TUBOS / CALANDRA"}</h3>
            </div>

            <div className="classification-data-single">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pv">P.V (*)</label>
                  <input
                    id="pv"
                    name={getFieldName("pv")}
                    type="text"
                    placeholder="Ex: 0,01"
                    value={getFieldValue("pv")}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="classeFluido">Classe do fluído</label>
                  <input
                    id="classeFluido"
                    name={getFieldName("classeFluido")}
                    type="text"
                    placeholder="Ex: A"
                    value={getFieldValue("classeFluido")}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="grupoRisco">Grupo de risco</label>
                  <input
                    id="grupoRisco"
                    name={getFieldName("grupoRisco")}
                    type="text"
                    placeholder="Ex: 5"
                    value={getFieldValue("grupoRisco")}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="categoria">Categoria</label>
                  <input
                    id="categoria"
                    name={getFieldName("categoria")}
                    type="text"
                    placeholder="Ex: III"
                    value={getFieldValue("categoria")}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. CÓDIGO DE PROJETO */}
        <div className="vaso-codigo-secao form-section-divider">
          <h3>4. CÓDIGO DE PROJETO</h3>
        </div>

        <div className="form-group">
          <label htmlFor="codigoProjeto">CÓDIGO DE PROJETO</label>
          <input
            id="codigoProjeto"
            name="codigoProjeto"
            type="text"
            placeholder="Ex: ASME VIII, DIV.I EDIÇÃO 2010 (Adotado)"
            value={formData.codigoProjeto || ""}
            onChange={handleChange}
            className="codigo-projeto-input"
          />
        </div>

        {/* Nota de rodapé */}
        <div className="footnote">
          <p>
            <strong>(*)</strong> A identificação do grupo potencial de risco é realizada entre o produto da pressão de operação e o volume; P (Mpa) x V (m³).
          </p>
        </div>

      </form>
    </div>
  );
}
