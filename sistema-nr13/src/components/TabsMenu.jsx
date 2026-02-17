import React from "react";
import "../styles/tabs.css";

const tabs = [
  { id: "resumo", label: "Resumo do Relatório", icon: "📋" },
  { id: "dadosContratante", label: "Dados do Contratante", icon: "👤" },
  { id: "responsabilidades", label: "Responsabilidades", icon: "📋" },
  { id: "referencias", label: "Referências Normativas", icon: "📚" },
  { id: "informacoesVaso", label: "Informações do Vaso", icon: "🏭" },
  { id: "exameDocumentacao", label: "Exame da Documentação", icon: "📄" },
  { id: "relatorioAnterior", label: "Relatório Anterior", icon: "📊" },
  { id: "instalacoes", label: "Instalações", icon: "🔧" },
  { id: "exameExterno", label: "Exame Externo", icon: "🔍" },
  { id: "exameInterno", label: "Exame Interno", icon: "🔬" },
  { id: "ensaios", label: "Ensaios Realizados", icon: "⚗️" },
  { id: "recomendacoes", label: "Recomendações", icon: "💡" },
  { id: "conclusao", label: "Conclusão", icon: "✅" },
  { id: "proximasInspecoes", label: "Próximas Inspeções", icon: "📅" },
  { id: "anexos", label: "Anexos", icon: "📎" }
];

export default function TabsMenu({ activeTab, setActiveTab, formData }) {
  
  // Verificar se a aba tem conteúdo preenchido
  const hasContent = (tabId) => {
    if (tabId === "resumo") {
      // Verificar campos principais
      return formData.equipamento || formData.fabricante || formData.numeroSerie || formData.tag || formData.tipo || formData.pmta || formData.tipoInspecao || formData.local || formData.dataInicio || formData.dataFim || formData.imagemEquipamento;
    }
    if (tabId === "informacoesVaso") {
      // Verifica campos de CASCO ou TUBOS
      return formData.fluidoCasco || formData.volumeInformadoCasco || formData.pressaoProjetoCasco || 
             formData.pmtaCasco || formData.diametroInternoCasco || formData.materialCasco || 
             formData.pvCasco || formData.classeFluidoCasco || formData.codigoProjeto ||
             formData.fluidoTubos || formData.volumeCalculadoTubos || formData.pressaoProjetoTubos ||
             formData.pmtaTubos || formData.diametroTubos || formData.quantidadeTubos ||
             formData.pvTubos || formData.classeFluidoTubos;
    }
    if (tabId === "dadosContratante") {
      // Verificar campos do contratante
      return formData.razaoSocial || formData.cnpj || formData.endereco || formData.cep || formData.cidade || formData.estado;
    }
    if (tabId === "responsabilidades") {
      return formData.plhNome || formData.plhTituloProfissional || formData.plhCrea;
    }
    // Outras abas ainda não têm conteúdo
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
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
            {hasContent(tab.id) && <span className="tab-indicator">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

