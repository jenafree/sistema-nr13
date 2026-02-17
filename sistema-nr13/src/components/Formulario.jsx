import React from "react";
import "../styles/form.css";

export default function Formulario({ formData, setFormData }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <div className="formulario-container">
      <h2 className="form-title">Formulário NR-13</h2>
      
      <form className="form-nr13">
        <div className="form-group">
          <label htmlFor="numeroRelatorio">Número do Relatório *</label>
          <input
            id="numeroRelatorio"
            name="numeroRelatorio"
            type="text"
            placeholder="Ex: VP_26_284"
            value={formData.numeroRelatorio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="equipamento">Equipamento *</label>
          <input
            id="equipamento"
            name="equipamento"
            type="text"
            placeholder="Ex: TQ. ÁLCOOL QUENTE AP.01"
            value={formData.equipamento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fabricante">Fabricante *</label>
            <input
              id="fabricante"
              name="fabricante"
              type="text"
              placeholder="Ex: ITB"
              value={formData.fabricante}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numeroSerie">Nº de Série *</label>
            <input
              id="numeroSerie"
              name="numeroSerie"
              type="text"
              placeholder="Ex: TQ-01"
              value={formData.numeroSerie}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="anoFabricacao">Ano de Fabricação *</label>
            <input
              id="anoFabricacao"
              name="anoFabricacao"
              type="date"
              value={formData.anoFabricacao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tag">TAG *</label>
            <input
              id="tag"
              name="tag"
              type="text"
              placeholder="Ex: TQ22009"
              value={formData.tag}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tipo">Tipo *</label>
            <select 
              id="tipo"
              name="tipo" 
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o tipo</option>
              <option value="Vertical">Vertical</option>
              <option value="Horizontal">Horizontal</option>
            </select>
          </div>

          <div className="form-section-divider">
          <h3>Tipo de inspeção:</h3>
        </div>
        <label htmlFor="tipo">Tipo *</label>
            <select>
              <option value="">Selecione o tipo</option>
              <option value="Vertical">Inicial</option>
              <option value="Horizontal">Periódica Externa</option>
              <option value="Vertical">Periódica Externa e Interna</option>
              <option value="Horizontal">Extraordinária</option>
            </select>

        <div className="form-section-divider">
          <h3>Local de instalação:</h3>
        </div>
        <label htmlfor="tipo">Local *</label>
        <input
        type='text'
        placeholder="Ex: CL67124"
        value={formData.local}
        onChange={handleChange}
        required
        />
        
        

        <div className="form-section-divider">
          <h3>Data da inspeção:</h3>
        </div>

        
        <div className="form-group">
          <label htmlFor="cliente">Início:</label>
          <input
            id="cliente"
            name="cliente"
            type="text"
            placeholder="Data de Início da Atividade"
            value={formData.cliente}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="cliente">Fim:</label>
          <input
            id="cliente"
            name="cliente"
            type="text"e
            placeholder="Data do fim da Atividade"
            value={formData.clinte}
            onChange={handleChange}
            required
          />
          <div className="form-section-divider">
          
        </div>

        <div className="contato">
          <p>engenharia@souzaaquino.com</p>
          <p>(62) 99271-3016 | (62) 99955-0942</p>
        </div>

        </div>

        <div className="form-group">
          <label htmlFor="cliente">Cliente *</label>
          <input
            id="cliente"
            name="cliente"
            type="text"
            placeholder="Digite o nome do cliente"
            value={formData.cliente}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço *</label>
          <input
            id="endereco"
            name="endereco"
            type="text"
            placeholder="Digite o endereço completo"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
        </div>

        

        

        

          <div className="form-group">
            <label htmlFor="pmta">PMTA (Pressão Máxima de Trabalho Admissível) *</label>
            <input
              id="pmta"
              name="pmta"
              type="text"
              placeholder="Digite o valor da PMTA"
              value={formData.pmta}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="parecer">Parecer Técnico *</label>
          <textarea
            id="parecer"
            name="parecer"
            rows="6"
            placeholder="Digite o parecer técnico detalhado"
            value={formData.parecer}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );

}

