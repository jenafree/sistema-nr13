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
import ExameInterno from "./ExameInterno";
import EnsaiosRealizados from "./EnsaiosRealizados";
import Recomendacoes from "./Recomendacoes";
import Conclusao from "./Conclusao";
import ProximasInspecoes from "./ProximasInspecoes";
import Anexos from "./Anexos";
import TermoInspecao from "./TermoInspecao";
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
      
      case "termoInspecao":
        return (
          <TermoInspecao
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
          <ExameInterno
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "ensaios":
        return (
          <EnsaiosRealizados
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "recomendacoes":
        return (
          <Recomendacoes
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "conclusao":
        return (
          <Conclusao
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "proximasInspecoes":
        return (
          <ProximasInspecoes
            formData={formData}
            setFormData={setFormData}
          />
        );
      
      case "anexos":
        return (
          <Anexos
            formData={formData}
            setFormData={setFormData}
          />
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

