import React from "react";
import Formulario from "./Formulario";
import DadosContratante from "./DadosContratante";
import Responsabilidades from "./Responsabilidades";
import InformacoesVaso from "./InformacoesVaso";
import ReferenciasNormativas from "./ReferenciasNormativas";
import ExameDocumentacao from "./ExameDocumentacao";
import InformacoesRelatorioAnterior from "./InformacoesRelatorioAnterior";
import Instalacoes from "./Instalacoes";
import ExameExterno from "./ExameExterno";
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
          <InformacoesVaso
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
          <Responsabilidades
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "referencias":
        return (
          <ReferenciasNormativas />
        );
      
      case "exameDocumentacao":
        return (
          <ExameDocumentacao
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "relatorioAnterior":
        return (
          <InformacoesRelatorioAnterior
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "instalacoes":
        return (
          <Instalacoes
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "exameExterno":
        return (
          <ExameExterno
            formData={formData}
            setFormData={setFormData}
          />
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

