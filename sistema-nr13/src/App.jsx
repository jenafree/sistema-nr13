import React, { useState, useEffect } from "react";
import TabsMenu from "./components/TabsMenu";
import TabContent from "./components/TabContent";
import Toast from "./components/Toast";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { RelatorioPDF } from "./pdf/RelatorioPDF";
import "./App.css";
import "./styles/tabs.css";

function App() {

  const [activeTab, setActiveTab] = useState("resumo");
  const [toast, setToast] = useState(null);
  const [pdfKey, setPdfKey] = useState(0);
  
  // Recuperar dados salvos ao carregar
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('autosave_nr13');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Erro ao recuperar dados salvos:', error);
      }
    }
    return {
      numeroRelatorio: "",
      equipamento: "",
      fabricante: "",
      numeroSerie: "",
      anoFabricacao: "",
      tag: "",
      tipo: "",
      tipoInspecao: "",
      local: "",
      dataInicio: "",
      dataFim: "",
      pmta: "",
      imagemEquipamento: "",
      // Dados do Contratante
      razaoSocial: "",
      cnpj: "",
      cep: "",
      endereco: "",
      cidade: "",
      estado: "",
      // Responsabilidades
      plhNome: "",
      plhTituloProfissional: "",
      plhCrea: "",
      // Informações do Vaso - Dados Operacionais CASCO
      fluidoCasco: "",
      volumeInformadoCasco: "",
      pressaoProjetoCasco: "",
      pmtaCasco: "",
      limitadaCasco: "",
      pmeaCasco: "",
      limitadaPmeaCasco: "",
      pressaoOperacaoCasco: "",
      pressaoTesteCasco: "",
      temperaturaProjetoCasco: "",
      temperaturaOperacaoCasco: "",
      // Informações do Vaso - Dados Operacionais TUBOS/CALANDRA
      fluidoTubos: "",
      volumeCalculadoTubos: "",
      pressaoProjetoTubos: "",
      pmtaTubos: "",
      limitadaTubos: "",
      pmeaTubos: "",
      limitadaPmeaTubos: "",
      pressaoOperacaoTubos: "",
      pressaoTesteTubos: "",
      temperaturaProjetoTubos: "",
      temperaturaOperacaoTubos: "",
      // Informações do Vaso - Características Construtivas CASCO
      diametroInternoCasco: "",
      alturaComprimentoCasco: "",
      pinturaExternaCasco: "",
      materialCasco: "",
      // Informações do Vaso - Características Construtivas TUBOS
      diametroTubos: "",
      alturaComprimentoTubos: "",
      quantidadeTubos: "",
      superficieTrocaTubos: "",
      // Informações do Vaso - Classificação NR13 CASCO
      pvCasco: "",
      classeFluidoCasco: "",
      grupoRiscoCasco: "",
      categoriaCasco: "",
      // Informações do Vaso - Classificação NR13 TUBOS
      pvTubos: "",
      classeFluidoTubos: "",
      grupoRiscoTubos: "",
      categoriaTubos: "",
      // Informações do Vaso - Código de Projeto
      codigoProjeto: "",
      // Informações do Vaso - Tipo selecionado
      tipoVasoSelecionado: "casco",
      // Exame da Documentação
      prontuarioStatus: "",
      prontuarioTipo: "",
      prontuarioAno: "",
      registroSegurancaStatus: "",
      registroSegurancaTipo: "",
      registroSegurancaAno: "",
      relatorioAnteriorStatus: "",
      relatorioAnteriorTipo: "",
      relatorioAnteriorNumero: "",
      parStatus: "",
      certificadoCalibracaoStatus: "",
      testeHidrostaticoStatus: "",
      testeHidrostaticoTipo: "",
      testeHidrostaticoExecutadoPor: "",
      manualOperacaoStatus: "",
      // Informações Relevantes do Relatório Anterior
      inspecaoPrazoStatus: "",
      recomendacoesCumpridasStatus: "",
      // Instalações
      acessoSeguroStatus: "",
      requisitosVasoStatus: "",
      // Exame Externo
      placaIdentificacaoStatus: "",
      adesivoPinturaStatus: "",
      // Exame Externo - 8.1 Registro Fotográfico
      fotosExameExterno: [],
      observacoesFotos: "",
      // Exame Externo - 8.2 Dispositivo de Alívio de Pressão
      dispositivoAlivioInstalacao: "",
      descricaoSistemaAlivio: "",
      tipoValvulaSeguranca: "",
      bloqueioInadvertido: "",
      aberturaPmta: "",
      fabricanteValvula: "",
      numeroSerieValvula: "",
      tagValvula: "",
      diametroConexaoValvula: "",
      pressaoAjusteValvula: "",
      numeroCertificadoValvula: "",
      // Exame Externo - 8.2 Instrumento Indicador de Pressão
      instrumentoPressaoInstalacao: "",
      descricaoSistemaInstrumento: "",
      bloqueioInadvertidoInstrumento: "",
      aberturaPmtaInstrumento: "",
      tipoInstrumentoPrincipal: "",
      fabricanteInstrumento: "",
      numeroSerieInstrumento: "",
      tagInstrumento: "",
      escalaInstrumento: "",
      diametroMostradorInstrumento: "",
      numeroCertificadoInstrumento: "",
      // Exame Interno
      observacoesExameInterno91: "",
      fotosExameInterno91: [],
      observacoesExameInterno92: "",
      fotosExameInterno92: [],
      // Ensaios Realizados - 10.1 Medição de espessura
      ensaioMaterial: "",
      ensaioCondicaoSuperficie: "",
      ensaioAcoplante: "",
      ensaioAparelho: "",
      ensaioModelo: "",
      ensaioTransdutor: "",
      ensaioVelocidadeSonica: "",
      ensaioEspessuraBloco: "",
      ensaioTecnica: "",
      registroMedicoes: [],
      // Ensaios Realizados - 10.2 Testes com pressão
      testesPressaoSecaoVaso: "",
      testesPressaoFoiRealizado: "",
      testesPressaoTipo: "",
      testesPressaoPressaoAplicada: "",
      testesPressaoDuracao: "",
      testesPressaoVazamentoDeformacao: "",
      testesPressaoDescricaoVazamento: "",
      testesPressaoObservacoes: "",
      // Recomendações
      recomendacoes: "",
      // Conclusão
      conclusaoStatus: "",
      conclusaoDescricao: "",
      conclusaoPmta: "",
      // Próximas Inspeções
      proximaInspecaoExameExterno: "",
      proximaInspecaoExameInterno: "",
      // Anexos
      anexo1Files: [],
      anexo2Files: [],
      anexo3Files: [],
      anexosData: "",
      anexosAssinatura: "",
      anexosTituloProfissional: "",
      // Termo de Inspeção
      termoTexto: "",
      termoData: "",
      termoLocal: "",
      termoEngenheiroNome: "",
      termoEngenheiroTitulo: "",
      termoEngenheiroCrea: "",
      termoImagem: ""
    };
  });

  // Auto-save a cada mudança
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('autosave_nr13', JSON.stringify(formData));
    }, 1000); // Salva 1 segundo após parar de digitar

    return () => clearTimeout(timer);
  }, [formData]);

  // Validar campos obrigatórios
  const validateForm = () => {
    const requiredFields = [
      { field: 'numeroRelatorio', label: 'Número do Relatório' },
      { field: 'equipamento', label: 'Equipamento' },
      { field: 'fabricante', label: 'Fabricante' },
      { field: 'numeroSerie', label: 'Número de Série' },
      { field: 'anoFabricacao', label: 'Ano de Fabricação' },
      { field: 'tag', label: 'TAG' },
      { field: 'tipo', label: 'Tipo' },
      { field: 'pmta', label: 'PMTA' }
    ];

    const emptyFields = requiredFields.filter(({ field }) => !formData[field]);

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(f => f.label).join(', ');
      showToast(`Preencha os campos obrigatórios: ${fieldNames}`, 'warning');
      return false;
    }
    return true;
  };

  // Função para mostrar toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Calcular progresso de preenchimento
  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => {
      if (value === "" || value === null || value === undefined) return false;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    }).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <div className="app-container">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <header className="app-header">
        <div className="header-top">
          <div className="logo-container">
            <img 
              src="/logo-souza-aquino.svg" 
              alt="SOUZA&AQUINO Logo" 
              className="logo-image"
            />
          </div>
          <div className="report-number-container">
            <span className="report-label">Relatório Nº</span>
            <input
              type="text"
              name="numeroRelatorio"
              value={formData.numeroRelatorio}
              onChange={(e) => setFormData({...formData, numeroRelatorio: e.target.value})}
              placeholder="VP_00_000"
              className="report-number-input"
            />
          </div>
        </div>
        <div className="header-divider"></div>
        <div className="header-titles">
          <h1 className="main-title">RELATÓRIO TÉCNICO DE INSPEÇÃO – NR13</h1>
          <h2 className="sub-title">VASOS SOB PRESSÃO</h2>
        </div>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <span className="progress-text">{calculateProgress()}% completo</span>
        </div>
        <div className="header-divider"></div>
      </header>

      <main className="app-main">
        <TabsMenu 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          formData={formData}
        />
        
        <TabContent 
          activeTab={activeTab} 
          formData={formData} 
          setFormData={setFormData}
          setActiveTab={setActiveTab}
        />

        <div className="pdf-button-container">
          <div className="buttons-group">
            <PDFDownloadLink
              key={pdfKey}
              document={<RelatorioPDF dados={formData} />}
              fileName={`relatorio_${formData.numeroRelatorio || 'nr13'}.pdf`}
            >
              {({ loading, error }) => {
                if (error) {
                  console.log(error);
                  return <button className="btn-action btn-error">
                    <span className="btn-icon">❌</span>
                    <span>Erro ao gerar PDF</span>
                  </button>;
                }

                if (loading) {
                  return <button className="btn-action btn-loading" disabled>
                    <span className="btn-icon spinning">⏳</span>
                    <span>Gerando PDF...</span>
                  </button>;
                }

                return <button 
                  className="btn-action btn-primary"
                  onClick={() => {
                    if (!validateForm()) {
                      return;
                    }
                    showToast('PDF gerado com sucesso!', 'success');
                    setPdfKey(prev => prev + 1);
                  }}
                >
                  <span className="btn-icon">📄</span>
                  <span>Gerar Relatório</span>
                </button>;
              }}
            </PDFDownloadLink>

            <button 
              className="btn-action btn-save"
              onClick={(e) => {
                const dados = JSON.stringify(formData, null, 2);
                localStorage.setItem('rascunho_nr13', dados);
                const blob = new Blob([dados], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `rascunho_${formData.numeroRelatorio || 'nr13'}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showToast('Rascunho salvo com sucesso!', 'success');
                
                // Feedback visual
                const btn = e.target.closest('.btn-save');
                if (btn) {
                  btn.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                    btn.style.transform = '';
                  }, 200);
                }
              }}
            >
              <span className="btn-icon">💾</span>
              <span>Salvar Rascunho</span>
            </button>

            <button 
              className="btn-action btn-clear"
              onClick={() => {
                if (window.confirm('Tem certeza que deseja limpar todos os campos?')) {
                  // Usar a mesma estrutura inicial do formData
                  const emptyData = {
                    numeroRelatorio: "",
                    equipamento: "",
                    fabricante: "",
                    numeroSerie: "",
                    anoFabricacao: "",
                    tag: "",
                    tipo: "",
                    tipoInspecao: "",
                    local: "",
                    dataInicio: "",
                    dataFim: "",
                    pmta: "",
                    imagemEquipamento: "",
                    razaoSocial: "",
                    cnpj: "",
                    cep: "",
                    endereco: "",
                    cidade: "",
                    estado: "",
                    plhNome: "",
                    plhTituloProfissional: "",
                    plhCrea: "",
                    fluidoCasco: "",
                    volumeInformadoCasco: "",
                    pressaoProjetoCasco: "",
                    pmtaCasco: "",
                    limitadaCasco: "",
                    pmeaCasco: "",
                    limitadaPmeaCasco: "",
                    pressaoOperacaoCasco: "",
                    pressaoTesteCasco: "",
                    temperaturaProjetoCasco: "",
                    temperaturaOperacaoCasco: "",
                    fluidoTubos: "",
                    volumeCalculadoTubos: "",
                    pressaoProjetoTubos: "",
                    pmtaTubos: "",
                    limitadaTubos: "",
                    pmeaTubos: "",
                    limitadaPmeaTubos: "",
                    pressaoOperacaoTubos: "",
                    pressaoTesteTubos: "",
                    temperaturaProjetoTubos: "",
                    temperaturaOperacaoTubos: "",
                    diametroInternoCasco: "",
                    alturaComprimentoCasco: "",
                    pinturaExternaCasco: "",
                    materialCasco: "",
                    diametroTubos: "",
                    alturaComprimentoTubos: "",
                    quantidadeTubos: "",
                    superficieTrocaTubos: "",
                    pvCasco: "",
                    classeFluidoCasco: "",
                    grupoRiscoCasco: "",
                    categoriaCasco: "",
                    pvTubos: "",
                    classeFluidoTubos: "",
                    grupoRiscoTubos: "",
                    categoriaTubos: "",
                    codigoProjeto: "",
                    tipoVasoSelecionado: "casco",
                    prontuarioStatus: "",
                    prontuarioTipo: "",
                    prontuarioAno: "",
                    registroSegurancaStatus: "",
                    registroSegurancaTipo: "",
                    registroSegurancaAno: "",
                    relatorioAnteriorStatus: "",
                    relatorioAnteriorTipo: "",
                    relatorioAnteriorNumero: "",
                    parStatus: "",
                    certificadoCalibracaoStatus: "",
                    testeHidrostaticoStatus: "",
                    testeHidrostaticoTipo: "",
                    testeHidrostaticoExecutadoPor: "",
                    manualOperacaoStatus: "",
                    inspecaoPrazoStatus: "",
                    recomendacoesCumpridasStatus: "",
                    acessoSeguroStatus: "",
                    requisitosVasoStatus: "",
                    placaIdentificacaoStatus: "",
                    adesivoPinturaStatus: "",
                    fotosExameExterno: [],
                    observacoesFotos: "",
                    dispositivoAlivioInstalacao: "",
                    descricaoSistemaAlivio: "",
                    tipoValvulaSeguranca: "",
                    bloqueioInadvertido: "",
                    aberturaPmta: "",
                    fabricanteValvula: "",
                    numeroSerieValvula: "",
                    tagValvula: "",
                    diametroConexaoValvula: "",
                    pressaoAjusteValvula: "",
                    numeroCertificadoValvula: "",
                    instrumentoPressaoInstalacao: "",
                    descricaoSistemaInstrumento: "",
                    bloqueioInadvertidoInstrumento: "",
                    aberturaPmtaInstrumento: "",
                    tipoInstrumentoPrincipal: "",
                    fabricanteInstrumento: "",
                    numeroSerieInstrumento: "",
                    tagInstrumento: "",
                    escalaInstrumento: "",
                    diametroMostradorInstrumento: "",
                    numeroCertificadoInstrumento: "",
                    observacoesExameInterno91: "",
                    fotosExameInterno91: [],
                    observacoesExameInterno92: "",
                    fotosExameInterno92: [],
                    ensaioMaterial: "",
                    ensaioCondicaoSuperficie: "",
                    ensaioAcoplante: "",
                    ensaioAparelho: "",
                    ensaioModelo: "",
                    ensaioTransdutor: "",
                    ensaioVelocidadeSonica: "",
                    ensaioEspessuraBloco: "",
                    ensaioTecnica: "",
                    registroMedicoes: [],
                    testesPressaoSecaoVaso: "",
                    testesPressaoFoiRealizado: "",
                    testesPressaoTipo: "",
                    testesPressaoPressaoAplicada: "",
                    testesPressaoDuracao: "",
                    testesPressaoVazamentoDeformacao: "",
                    testesPressaoDescricaoVazamento: "",
                    testesPressaoObservacoes: "",
                    recomendacoes: "",
                    conclusaoStatus: "",
                    conclusaoDescricao: "",
                    conclusaoPmta: "",
                    proximaInspecaoExameExterno: "",
                    proximaInspecaoExameInterno: "",
                    anexo1Files: [],
                    anexo2Files: [],
                    anexo3Files: [],
                    anexosData: "",
                    anexosAssinatura: "",
                    anexosTituloProfissional: "",
                    termoTexto: "",
                    termoData: "",
                    termoLocal: "",
                    termoEngenheiroNome: "",
                    termoEngenheiroTitulo: "",
                    termoEngenheiroCrea: "",
                    termoImagem: ""
                  };
                  setFormData(emptyData);
                  localStorage.removeItem('autosave_nr13');
                  showToast('Todos os campos foram limpos', 'info');
                }
              }}
            >
              <span className="btn-icon">🗑️</span>
              <span>Limpar</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );

}

export default App;
