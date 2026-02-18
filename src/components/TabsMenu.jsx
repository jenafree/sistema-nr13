import React from "react";
import "../styles/tabs.css";

const tabs = [
  { id: "resumo", label: "Resumo do Relatório", icon: "📋", number: 1 },
  { id: "dadosContratante", label: "Dados do Contratante", icon: "👤", number: 2 },
  { id: "responsabilidades", label: "Responsabilidades", icon: "📋", number: 3 },
  { id: "referencias", label: "Referências Normativas", icon: "📚", number: 4 },
  { id: "informacoesVaso", label: "Informações do Vaso", icon: "🏭", number: 5 },
  { id: "exameDocumentacao", label: "Exame da Documentação", icon: "📄", number: 6 },
  { id: "relatorioAnterior", label: "Relatório Anterior", icon: "📊", number: 7 },
  { id: "instalacoes", label: "Instalações", icon: "🔧", number: 8 },
  { id: "exameExterno", label: "Exame Externo", icon: "🔍", number: 9 },
  { id: "exameInterno", label: "Exame Interno", icon: "🔬", number: 10 },
  { id: "ensaios", label: "Ensaios Realizados", icon: "⚗️", number: 11 },
  { id: "recomendacoes", label: "Recomendações", icon: "💡", number: 12 },
  { id: "conclusao", label: "Conclusão", icon: "✅", number: 13 },
  { id: "proximasInspecoes", label: "Próximas Inspeções", icon: "📅", number: 14 },
  { id: "anexos", label: "Anexos", icon: "📎", number: 15 },
  { id: "termoInspecao", label: "Termo de Inspeção", icon: "📜", number: 16 }
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
    if (tabId === "exameDocumentacao") {
      return formData.prontuarioStatus || formData.registroSegurancaStatus || 
             formData.relatorioAnteriorStatus || formData.parStatus || 
             formData.certificadoCalibracaoStatus || formData.testeHidrostaticoStatus ||
             formData.manualOperacaoStatus;
    }
    if (tabId === "relatorioAnterior") {
      return formData.inspecaoPrazoStatus || formData.recomendacoesCumpridasStatus;
    }
    if (tabId === "instalacoes") {
      return formData.acessoSeguroStatus || formData.requisitosVasoStatus;
    }
    if (tabId === "exameExterno") {
      return formData.placaIdentificacaoStatus || formData.adesivoPinturaStatus ||
             (formData.fotosExameExterno && Array.isArray(formData.fotosExameExterno) && formData.fotosExameExterno.length > 0) ||
             formData.observacoesFotos || formData.dispositivoAlivioInstalacao ||
             formData.tipoValvulaSeguranca || formData.fabricanteValvula ||
             formData.instrumentoPressaoInstalacao || formData.tipoInstrumentoPrincipal ||
             formData.fabricanteInstrumento;
    }
    if (tabId === "exameInterno") {
      return formData.observacoesExameInterno91 || formData.observacoesExameInterno92 ||
             (formData.fotosExameInterno91 && Array.isArray(formData.fotosExameInterno91) && formData.fotosExameInterno91.length > 0) ||
             (formData.fotosExameInterno92 && Array.isArray(formData.fotosExameInterno92) && formData.fotosExameInterno92.length > 0);
    }
    if (tabId === "ensaios") {
      return formData.ensaioMaterial || formData.ensaioAparelho || formData.ensaioModelo ||
             (formData.registroMedicoes && Array.isArray(formData.registroMedicoes) && formData.registroMedicoes.length > 0) ||
             formData.testesPressaoSecaoVaso || formData.testesPressaoFoiRealizado ||
             formData.testesPressaoTipo || formData.testesPressaoPressaoAplicada ||
             formData.testesPressaoDuracao || formData.testesPressaoVazamentoDeformacao ||
             formData.testesPressaoDescricaoVazamento || formData.testesPressaoObservacoes;
    }
    if (tabId === "recomendacoes") {
      return formData.recomendacoes && formData.recomendacoes.trim() !== "";
    }
    if (tabId === "conclusao") {
      return formData.conclusaoStatus || formData.conclusaoDescricao || formData.conclusaoPmta;
    }
    if (tabId === "proximasInspecoes") {
      return formData.proximaInspecaoExameExterno || formData.proximaInspecaoExameInterno;
    }
    if (tabId === "anexos") {
      return (formData.anexo1Files && Array.isArray(formData.anexo1Files) && formData.anexo1Files.length > 0) ||
             (formData.anexo2Files && Array.isArray(formData.anexo2Files) && formData.anexo2Files.length > 0) ||
             (formData.anexo3Files && Array.isArray(formData.anexo3Files) && formData.anexo3Files.length > 0) ||
             formData.anexosData || formData.anexosAssinatura || formData.anexosTituloProfissional;
    }
    if (tabId === "termoInspecao") {
      return formData.termoTexto || formData.termoData || formData.termoLocal || 
             formData.termoEngenheiroNome || formData.termoEngenheiroCrea || 
             formData.termoImagem;
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

