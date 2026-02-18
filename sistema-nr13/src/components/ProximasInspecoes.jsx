import React from "react";
import "../styles/form.css";
import "../styles/proximas-inspecoes.css";

export default function ProximasInspecoes({ formData, setFormData }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="formulario-container">
      <h2 className="form-title">13. DATA DAS PRÓXIMAS INSPEÇÕES</h2>
      
      <form className="form-nr13">
        <div className="proximas-inspecoes-intro">
          <p>De acordo com sua categoria, o vaso deve ser submetido a nova inspeção nas seguintes datas:</p>
        </div>

        {/* a) Periódica */}
        <div className="inspecao-section">
          <h3 className="inspecao-section-title">a) Periódica:</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="proximaInspecaoExameExterno">Exame externo:</label>
              <input
                id="proximaInspecaoExameExterno"
                name="proximaInspecaoExameExterno"
                type="date"
                value={formData.proximaInspecaoExameExterno || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="proximaInspecaoExameInterno">Exame interno:</label>
              <input
                id="proximaInspecaoExameInterno"
                name="proximaInspecaoExameInterno"
                type="date"
                value={formData.proximaInspecaoExameInterno || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* b) Extraordinária */}
        <div className="inspecao-section">
          <h3 className="inspecao-section-title">b) Extraordinária:</h3>
          
          <div className="inspecao-extraordinaria-info">
            <p>A inspeção extraordinária deve ser realizada:</p>
            <ul className="inspecao-extraordinaria-list">
              <li>sempre que o vaso de pressão for danificado por acidente ou outra ocorrência que comprometa sua segurança;</li>
              <li>quando o vaso de pressão for submetido a reparo ou alterações importantes, capazes de alterar sua condição de segurança;</li>
              <li>antes de o vaso de pressão ser recolocado em funcionamento, quando permanecer inativo por mais de 12 (doze) meses; ou</li>
              <li>quando houver alteração do local de instalação do vaso de pressão, exceto para vasos móveis.</li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

