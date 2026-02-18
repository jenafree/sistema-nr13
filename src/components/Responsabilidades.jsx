import React from "react";
import "../styles/form.css";

export default function Responsabilidades({ formData, setFormData }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <div className="formulario-container">
      <h2 className="form-title">Responsabilidades da Inspeção</h2>

      <form className="form-nr13">

        <div className="form-section-divider">
          <h3>PLH (Profissional Legalmente Habilitado)</h3>
        </div>

        <div className="form-group">
          <label htmlFor="plhNome">Nome *</label>
          <input
            id="plhNome"
            name="plhNome"
            type="text"
            placeholder="Ex: Roney de Aquino"
            value={formData.plhNome || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="plhTituloProfissional">Título profissional *</label>
          <input
            id="plhTituloProfissional"
            name="plhTituloProfissional"
            type="text"
            placeholder="Ex: Engenheiro Mecânico"
            value={formData.plhTituloProfissional || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="plhCrea">CREA *</label>
          <input
            id="plhCrea"
            name="plhCrea"
            type="text"
            placeholder="Ex: 1017159246"
            value={formData.plhCrea || ""}
            onChange={handleChange}
            required
          />
        </div>

      </form>
    </div>
  );
}

