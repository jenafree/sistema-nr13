import React, { useState } from "react";
import Formulario from "./components/Formulario";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { RelatorioPDF } from "./pdf/RelatorioPDF";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    numeroRelatorio: "",
    cliente: "",
    endereco: "",
    equipamento: "",
    fabricante: "",
    numeroSerie: "",
    anoFabricacao: "",
    tag: "",
    tipo: "",
    tipoInspecao: "",
    pmta: "",
    parecer: ""
  });

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <img 
            src="/logo-souza-aquino.svg" 
            alt="SOUZA&AQUINO Logo" 
            className="logo-image"
          />
        </div>
        <p className="app-subtitle">Sistema de Relatórios NR-13</p>
      </header>

      <main className="app-main">
        <Formulario
          formData={formData}
          setFormData={setFormData}
        />

        <div className="pdf-button-container">
          <PDFDownloadLink
            document={<RelatorioPDF dados={formData} />}
            fileName="relatorio_nr13.pdf"
          >
            {({ loading, error }) => {
              if (error) {
                console.log(error);
                return <button className="btn-pdf btn-error">Erro ao gerar PDF</button>;
              }

              if (loading) {
                return <button className="btn-pdf btn-loading" disabled>Gerando PDF...</button>;
              }

              return <button className="btn-pdf btn-primary">📄 Gerar PDF</button>;
            }}
          </PDFDownloadLink>
        </div>
      </main>
    </div>
  );

}

export default App;
