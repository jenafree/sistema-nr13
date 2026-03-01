import React from "react";
import "../styles/tabs.css";

// Páginas 2 e 3 unidas: Responsabilidades + Referências Normativas
const tabs = [
  { id: "resumo", label: "Resumo do Equipamento", icon: "📋", number: 1 },
  { id: "dadosContratante", label: "Dados do Contratante", icon: "👤", number: 2 },
  { id: "responsabilidades", label: "Responsabilidades e Referências", icon: "📋", number: 3 },
  { id: "informacoesVaso", label: "Informações do Vaso", icon: "🏭", number: 4 }
  // === PÁGINAS COMENTADAS (ativação futura) ===
  // { id: "resumo", label: "Resumo do Relatório", icon: "📋", number: 1 },
  // { id: "exameDocumentacao", label: "Exame da Documentação", icon: "📄", number: 6 },
  // { id: "relatorioAnterior", label: "Relatório Anterior", icon: "📊", number: 7 },
  // { id: "instalacoes", label: "Instalações", icon: "🔧", number: 8 },
  // { id: "exameExterno", label: "Exame Externo", icon: "🔍", number: 9 },
  // { id: "exameInterno", label: "Exame Interno", icon: "🔬", number: 10 },
  // { id: "ensaios", label: "Ensaios Realizados", icon: "⚗️", number: 11 },
  // { id: "recomendacoes", label: "Recomendações", icon: "💡", number: 12 },
  // { id: "conclusao", label: "Conclusão", icon: "✅", number: 13 },
  // { id: "proximasInspecoes", label: "Próximas Inspeções", icon: "📅", number: 14 },
  // { id: "anexos", label: "Anexos", icon: "📎", number: 15 },
  // { id: "termoInspecao", label: "Termo de Inspeção", icon: "📜", number: 16 }
];

export default function TabsMenu({ activeTab, setActiveTab, formData }) {
  
  const hasContent = (tabId) => {
    if (tabId === "resumo") {
      return formData.equipamento || formData.fabricante || formData.numeroSerie ||
             formData.anoFabricacao || formData.tag || formData.tipo || formData.pmta;
    }
    if (tabId === "dadosContratante") {
      return formData.razaoSocial || formData.cnpj || formData.endereco || formData.cep || formData.cidade || formData.estado;
    }
    if (tabId === "responsabilidades") {
      return formData.plhNome || formData.plhTituloProfissional || formData.plhCrea;
    }
    if (tabId === "informacoesVaso") {
      // Conforme PDF: ou é CASCO ou é TUBOS/CALANDRA – só valida os campos do tipo selecionado
      const tipoVaso = formData.tipoVasoSelecionado || "casco";
      if (tipoVaso === "casco") {
        return formData.fluidoCasco || formData.volumeInformadoCasco || formData.pressaoProjetoCasco ||
               formData.pmtaCasco || formData.diametroInternoCasco || formData.materialCasco ||
               formData.pvCasco || formData.classeFluidoCasco || formData.codigoProjeto;
      }
      return formData.fluidoTubos || formData.volumeCalculadoTubos || formData.pressaoProjetoTubos ||
             formData.pmtaTubos || formData.diametroTubos || formData.quantidadeTubos ||
             formData.pvTubos || formData.classeFluidoTubos || formData.codigoProjeto;
    }
    return false;
  };

  return (
    <div className="tabs-container">
      <div className="tabs-scroll">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-tab-id={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""} ${hasContent(tab.id) ? "has-content" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-number">{tab.number}</span>
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {hasContent(tab.id) && <span className="tab-indicator">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

