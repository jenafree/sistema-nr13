import React from "react";
import Formulario from "./Formulario";
import DadosContratante from "./DadosContratante";
import "../styles/tab-resumo.css";

export default function TabContent({ activeTab, formData, setFormData, setActiveTab }) {
  const renderContent = () => {
    switch (activeTab) {
      case "resumo":
        return (
          <Formulario
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "informacoesVaso":
        return (
          <Formulario
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "dadosContratante":
        return (
          <DadosContratante
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "responsabilidades":
        return (
          <div className="tab-content-placeholder">
            <h3>Responsabilidades da Inspeção</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "referencias":
        return (
          <div className="tab-content-placeholder">
            <h3>Referências Normativas</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "exameDocumentacao":
        return (
          <div className="tab-content-placeholder">
            <h3>Exame da Documentação</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "relatorioAnterior":
        return (
          <div className="tab-content-placeholder">
            <h3>Informações do Relatório Anterior</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "instalacoes":
        return (
          <div className="tab-content-placeholder">
            <h3>Instalações</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "exameExterno":
        return (
          <div className="tab-content-placeholder">
            <h3>Exame Externo</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "exameInterno":
        return (
          <div className="tab-content-placeholder">
            <h3>Exame Interno</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "ensaios":
        return (
          <div className="tab-content-placeholder">
            <h3>Ensaios Realizados</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "recomendacoes":
        return (
          <div className="tab-content-placeholder">
            <h3>Recomendações e Providências Necessárias</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "conclusao":
        return (
          <div className="tab-content-placeholder">
            <h3>Conclusão</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "proximasInspecoes":
        return (
          <div className="tab-content-placeholder">
            <h3>Data das Próximas Inspeções</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      case "anexos":
        return (
          <div className="tab-content-placeholder">
            <h3>Anexos</h3>
            <p>Conteúdo a ser desenvolvido nesta aba.</p>
          </div>
        );
      
      default:
        return (
          <Formulario
            formData={formData}
            setFormData={setFormData}
          />
        );
    }
  };

  return <div className="tab-content-wrapper">{renderContent()}</div>;
}

