import React, { useState } from "react";
import "../styles/form.css";
import "../styles/exame-interno.css";

export default function ExameInterno({ formData, setFormData }) {
  const [activeSubTab, setActiveSubTab] = useState("outros1");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleRadioChange(name, value) {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handlePhotoUpload = (e, subTab) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    const fieldName = subTab === "outros1" ? "fotosExameInterno91" : "fotosExameInterno92";
    
    files.forEach(file => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            [fieldName]: [...(prev[fieldName] || []), reader.result]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="formulario-container">
      <h2 className="form-title">9. EXAME INTERNO</h2>
      
      <form className="form-nr13">

        {/* Navegação por Sub-abas */}
        <div className="sub-section-tabs">
          <button
            type="button"
            className={`sub-section-tab ${activeSubTab === "outros1" ? "active" : ""}`}
            onClick={() => setActiveSubTab("outros1")}
          >
            9.1 Outros
          </button>
          <button
            type="button"
            className={`sub-section-tab ${activeSubTab === "outros2" ? "active" : ""}`}
            onClick={() => setActiveSubTab("outros2")}
          >
            9.2 Outros
          </button>
        </div>

        {/* 9.1 Outros */}
        {activeSubTab === "outros1" && (
          <div className="sub-section-content">
            <div className="form-section-divider">
              <h3>9.1 Outros</h3>
            </div>

            <div className="form-group">
              <label htmlFor="observacoesExameInterno91">Observações:</label>
              <textarea
                id="observacoesExameInterno91"
                name="observacoesExameInterno91"
                rows="6"
                placeholder="Digite as observações do exame interno (9.1)..."
                value={formData.observacoesExameInterno91 || ""}
                onChange={handleChange}
              />
            </div>

            <div className="photo-upload-section">
              <div className="form-group">
                <label>Upload de Fotos (9.1)</label>
                <div 
                  className="image-upload-area"
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); }}
                  onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); handlePhotoUpload(e, "outros1"); }}
                >
                  <input
                    type="file"
                    id="fotosExameInterno91"
                    name="fotosExameInterno91"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, "outros1")}
                    style={{ display: 'none' }}
                  />
                  <label 
                    htmlFor="fotosExameInterno91" 
                    className="image-upload-label"
                  >
                    <div className="image-placeholder">
                      <div className="upload-icon-wrapper">
                        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="upload-text">Clique para anexar fotos do exame interno (9.1)</p>
                      <p className="upload-hint">ou arraste e solte aqui (múltiplas imagens)</p>
                    </div>
                  </label>
                </div>
              </div>

              {formData.fotosExameInterno91 && formData.fotosExameInterno91.length > 0 && (
                <div className="photos-grid">
                  {formData.fotosExameInterno91.map((foto, index) => (
                    <div key={index} className="photo-item">
                      <img src={foto} alt={`Foto ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-photo-btn"
                        onClick={() => {
                          const novasFotos = formData.fotosExameInterno91.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            fotosExameInterno91: novasFotos
                          }));
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 9.2 Outros */}
        {activeSubTab === "outros2" && (
          <div className="sub-section-content">
            <div className="form-section-divider">
              <h3>9.2 Outros</h3>
            </div>

            <div className="form-group">
              <label htmlFor="observacoesExameInterno92">Observações:</label>
              <textarea
                id="observacoesExameInterno92"
                name="observacoesExameInterno92"
                rows="6"
                placeholder="Digite as observações do exame interno (9.2)..."
                value={formData.observacoesExameInterno92 || ""}
                onChange={handleChange}
              />
            </div>

            <div className="photo-upload-section">
              <div className="form-group">
                <label>Upload de Fotos (9.2)</label>
                <div 
                  className="image-upload-area"
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); }}
                  onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drag-over'); handlePhotoUpload(e, "outros2"); }}
                >
                  <input
                    type="file"
                    id="fotosExameInterno92"
                    name="fotosExameInterno92"
                    accept="image/*"
                    multiple
                    onChange={(e) => handlePhotoUpload(e, "outros2")}
                    style={{ display: 'none' }}
                  />
                  <label 
                    htmlFor="fotosExameInterno92" 
                    className="image-upload-label"
                  >
                    <div className="image-placeholder">
                      <div className="upload-icon-wrapper">
                        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="upload-text">Clique para anexar fotos do exame interno (9.2)</p>
                      <p className="upload-hint">ou arraste e solte aqui (múltiplas imagens)</p>
                    </div>
                  </label>
                </div>
              </div>

              {formData.fotosExameInterno && formData.fotosExameInterno.length > 0 && (
                <div className="photos-grid">
                  {formData.fotosExameInterno.map((foto, index) => (
                    <div key={index} className="photo-item">
                      <img src={foto} alt={`Foto ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-photo-btn"
                        onClick={() => {
                          const novasFotos = formData.fotosExameInterno.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            fotosExameInterno: novasFotos
                          }));
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </form>
    </div>
  );
}

