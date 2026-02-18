import React, { useEffect } from "react";
import "../styles/form.css";
import "../styles/conclusao.css";

export default function Conclusao({ formData, setFormData }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleRadioChange(name, value) {
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Atualizar texto padrão baseado na seleção
      if (name === "conclusaoStatus") {
        const pmtaValue = prev.conclusaoPmta || "1,50";
        
        switch (value) {
          case "Apto a operar":
            newData.conclusaoDescricao = `O vaso inspecionado pode operar normalmente, uma vez que não foram observados defeitos estruturais ou condições de RGI (Risco Grave e Iminente).\n\nO valor da PMTA a ser adotada é de **${pmtaValue} kgf/cm²**.`;
            break;
          case "Inapto":
            // Para Inapto, não preencher automaticamente - deixar o usuário editar livremente
            newData.conclusaoDescricao = prev.conclusaoDescricao || "";
            break;
          case "Condenado":
            newData.conclusaoDescricao = `O vaso inspecionado encontra-se condenado, tendo sido identificadas falhas estruturais e/ou condições que inviabilizam sua recuperação técnica segura. As não conformidades observadas comprometem definitivamente sua integridade operacional conforme os requisitos da NR-13. Recomenda-se a retirada imediata de operação e a desativação permanente do equipamento, não sendo permitida sua reutilização para fins operacionais.\n\nO valor da PMTA a ser adotada é de **${pmtaValue} kgf/cm²**.`;
            break;
          default:
            newData.conclusaoDescricao = "";
        }
      }
      
      return newData;
    });
  }

  // Atualizar descrição quando PMTA mudar (mantendo o texto padrão)
  // Não atualizar para "Inapto" - deixar o usuário editar livremente
  useEffect(() => {
    if (formData.conclusaoStatus && formData.conclusaoPmta && formData.conclusaoStatus !== "Inapto") {
      const pmtaValue = formData.conclusaoPmta;
      let descricao = "";
      
      switch (formData.conclusaoStatus) {
        case "Apto a operar":
          descricao = `O vaso inspecionado pode operar normalmente, uma vez que não foram observados defeitos estruturais ou condições de RGI (Risco Grave e Iminente).\n\nO valor da PMTA a ser adotada é de **${pmtaValue} kgf/cm²**.`;
          break;
        case "Condenado":
          descricao = `O vaso inspecionado encontra-se condenado, tendo sido identificadas falhas estruturais e/ou condições que inviabilizam sua recuperação técnica segura. As não conformidades observadas comprometem definitivamente sua integridade operacional conforme os requisitos da NR-13. Recomenda-se a retirada imediata de operação e a desativação permanente do equipamento, não sendo permitida sua reutilização para fins operacionais.\n\nO valor da PMTA a ser adotada é de **${pmtaValue} kgf/cm²**.`;
          break;
      }
      
      // Atualizar apenas se o texto atual corresponde ao padrão anterior
      const currentDesc = formData.conclusaoDescricao || "";
      const isDefaultText = currentDesc.includes("O valor da PMTA a ser adotada é de");
      
      if (isDefaultText && descricao) {
        setFormData(prev => ({ ...prev, conclusaoDescricao: descricao }));
      }
    }
  }, [formData.conclusaoPmta, formData.conclusaoStatus]);

  return (
    <div className="formulario-container">
      <h2 className="form-title">12. CONCLUSÃO</h2>
      
      <form className="form-nr13">
        {/* Status do vaso */}
        <div className="form-group">
          <label>Status do vaso:</label>
          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="conclusaoStatus"
                value="Apto a operar"
                checked={formData.conclusaoStatus === "Apto a operar"}
                onChange={() => handleRadioChange("conclusaoStatus", "Apto a operar")}
              />
              <span>Apto a operar</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="conclusaoStatus"
                value="Inapto"
                checked={formData.conclusaoStatus === "Inapto"}
                onChange={() => handleRadioChange("conclusaoStatus", "Inapto")}
              />
              <span>Inapto</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="conclusaoStatus"
                value="Condenado"
                checked={formData.conclusaoStatus === "Condenado"}
                onChange={() => handleRadioChange("conclusaoStatus", "Condenado")}
              />
              <span>Condenado</span>
            </label>
          </div>
        </div>

        {/* Descrição/Justificativa */}
        <div className="form-group">
          <label htmlFor="conclusaoDescricao">Descrição:</label>
          {formData.conclusaoStatus === "Inapto" ? (
            <textarea
              id="conclusaoDescricao"
              name="conclusaoDescricao"
              rows="6"
              placeholder="Digite a descrição da conclusão..."
              value={formData.conclusaoDescricao || ""}
              onChange={handleChange}
              className="conclusao-textarea"
            />
          ) : (
            <div className="conclusao-textarea-wrapper">
              <textarea
                id="conclusaoDescricao"
                name="conclusaoDescricao"
                rows="6"
                placeholder="Selecione o status do vaso para preencher automaticamente..."
                value={formData.conclusaoDescricao || ""}
                onChange={handleChange}
                className="conclusao-textarea"
              />
              {formData.conclusaoDescricao && (
                <div className="conclusao-preview">
                  <p className="preview-label">Preview (como aparecerá no PDF):</p>
                  <div className="preview-content">
                    {formData.conclusaoDescricao.split('\n').map((line, index) => {
                      // Processar linhas com **texto** para negrito
                      const parts = line.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={index} style={{ margin: '0.5rem 0' }}>
                          {parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              const boldText = part.slice(2, -2);
                              return <strong key={i} style={{ fontWeight: 'bold' }}>{boldText}</strong>;
                            }
                            return <span key={i}>{part}</span>;
                          })}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* PMTA a ser adotada */}
        <div className="form-group">
          <label htmlFor="conclusaoPmta">PMTA a ser adotada:</label>
          <div className="input-with-unit">
            <input
              id="conclusaoPmta"
              name="conclusaoPmta"
              type="text"
              placeholder="Ex: 1,50"
              value={formData.conclusaoPmta || ""}
              onChange={(e) => {
                handleChange(e);
                // Atualizar o texto da descrição quando PMTA mudar (exceto para Inapto)
                if (formData.conclusaoStatus && formData.conclusaoStatus !== "Inapto") {
                  const pmtaValue = e.target.value || "1,50";
                  let descricao = "";
                  
                  switch (formData.conclusaoStatus) {
                    case "Apto a operar":
                      descricao = `O vaso inspecionado pode operar normalmente, uma vez que não foram observados defeitos estruturais ou condições de RGI (Risco Grave e Iminente).\n\nO valor da PMTA a ser adotada é de **${pmtaValue} kgf/cm²**.`;
                      break;
                    case "Condenado":
                      descricao = `O vaso inspecionado encontra-se condenado, tendo sido identificadas falhas estruturais e/ou condições que inviabilizam sua recuperação técnica segura. As não conformidades observadas comprometem definitivamente sua integridade operacional conforme os requisitos da NR-13. Recomenda-se a retirada imediata de operação e a desativação permanente do equipamento, não sendo permitida sua reutilização para fins operacionais.\n\nO valor da PMTA a ser adotada é de **${pmtaValue} kgf/cm²**.`;
                      break;
                  }
                  
                  // Atualizar apenas se o texto atual corresponde ao padrão
                  const currentDesc = formData.conclusaoDescricao || "";
                  const isDefaultText = currentDesc.includes("O valor da PMTA a ser adotada é de");
                  
                  if (isDefaultText && descricao) {
                    setFormData(prev => ({ ...prev, conclusaoDescricao: descricao }));
                  }
                }
              }}
            />
            <span className="unit">kgf/cm²</span>
          </div>
        </div>
      </form>
    </div>
  );
}

