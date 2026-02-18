import React from "react";
import { compressImage } from "../utils/imageCompression";
import { validateFileSize, validateFileType } from "../utils/validations";
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
              type="number"
              min="1950"
              max="2030"
              placeholder="Ex: 1970, 1990"
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

        <div className="form-section-divider">
          <h3>Tipo de inspeção e Local de instalação:</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tipoInspecao">Tipo de Inspeção *</label>
            <select 
              id="tipoInspecao"
              name="tipoInspecao" 
              value={formData.tipoInspecao}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o tipo</option>
              <option value="Inicial">Inicial</option>
              <option value="Periódica Externa">Periódica Externa</option>
              <option value="Periódica Externa e Interna">Periódica Externa e Interna</option>
              <option value="Extraordinária">Extraordinária</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="local">Local *</label>
            <input
              id="local"
              name="local"
              type="text"
              placeholder="Ex: CL67124"
              value={formData.local || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section-divider">
          <h3>Data da inspeção:</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dataInicio">Início:</label>
            <input
              id="dataInicio"
              name="dataInicio"
              type="datetime-local"
              placeholder="Data e Hora de Início"
              value={formData.dataInicio || ""}
              onChange={handleChange}
              min="1950-01-01T00:00"
              max="2100-12-31T23:59"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataFim">Fim:</label>
            <input
              id="dataFim"
              name="dataFim"
              type="datetime-local"
              placeholder="Data e Hora do Fim"
              value={formData.dataFim || ""}
              onChange={handleChange}
              min="1950-01-01T00:00"
              max="2100-12-31T23:59"
            />
          </div>
        </div>

        <div className="form-section-divider">
          <h3>Imagem do Equipamento:</h3>
        </div>

        <div className="form-group">
          <div className="image-upload-area">
            <input
              type="file"
              id="imagemEquipamento"
              name="imagemEquipamento"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  // Validar tamanho (5MB)
                  const sizeValidation = validateFileSize(file, 5);
                  if (!sizeValidation.valid) {
                    alert(sizeValidation.message);
                    return;
                  }
                  
                  // Validar tipo
                  const typeValidation = validateFileType(file, ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']);
                  if (!typeValidation.valid) {
                    alert(typeValidation.message);
                    return;
                  }
                  
                  try {
                    // Comprimir imagem antes de salvar
                    const compressedImage = await compressImage(file, 1920, 1080, 0.8);
                    setFormData({
                      ...formData,
                      imagemEquipamento: compressedImage
                    });
                  } catch (error) {
                    console.error('Erro ao processar imagem:', error);
                    alert('Erro ao processar imagem. Tente novamente.');
                  }
                }
              }}
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="imagemEquipamento" 
              className="image-upload-label"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('drag-over');
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('drag-over');
              }}
              onDrop={async (e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('drag-over');
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                  // Validar tamanho (5MB)
                  const sizeValidation = validateFileSize(file, 5);
                  if (!sizeValidation.valid) {
                    alert(sizeValidation.message);
                    return;
                  }
                  
                  // Validar tipo
                  const typeValidation = validateFileType(file, ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']);
                  if (!typeValidation.valid) {
                    alert(typeValidation.message);
                    return;
                  }
                  
                  try {
                    // Comprimir imagem antes de salvar
                    const compressedImage = await compressImage(file, 1920, 1080, 0.8);
                    setFormData({
                      ...formData,
                      imagemEquipamento: compressedImage
                    });
                  } catch (error) {
                    console.error('Erro ao processar imagem:', error);
                    alert('Erro ao processar imagem. Tente novamente.');
                  }
                }
              }}
            >
              {formData.imagemEquipamento ? (
                <div className="image-preview-container">
                  <img 
                    src={formData.imagemEquipamento} 
                    alt="Equipamento" 
                    className="uploaded-image"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        imagemEquipamento: ""
                      });
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="image-placeholder">
                  <div className="upload-animation">
                    <div className="upload-icon-wrapper">
                      <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="upload-pulse"></div>
                  </div>
                  <p className="upload-text">Clique para anexar imagem do equipamento</p>
                  <p className="upload-hint">ou arraste e solte aqui</p>
                </div>
              )}
            </label>
          </div>
        </div>
      </form>
    </div>
  );

}

