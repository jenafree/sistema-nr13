import React, { useState } from "react";
import { validateFileSize, validateFileType } from "../utils/validations";
import "../styles/form.css";
import "../styles/anexos.css";

export default function Anexos({ formData, setFormData }) {
  const [activeSubTab, setActiveSubTab] = useState("anexo1");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Função para upload de arquivos
  const handleFileUpload = (e, anexoKey) => {
    const files = Array.from(e.target.files);
    
    // Validar tipos de arquivo permitidos
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    
    const validFiles = files.filter(file => {
      // Validar tamanho (10MB para documentos)
      const sizeValidation = validateFileSize(file, 10);
      if (!sizeValidation.valid) {
        alert(`${file.name}: ${sizeValidation.message}`);
        return false;
      }
      
      // Validar tipo
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      const isValidType = allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
      
      if (!isValidType) {
        alert(`${file.name}: Tipo de arquivo não permitido. Use PDF, DOC ou DOCX.`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) {
      return;
    }

    // Converter arquivos para Data URLs (base64)
    const readers = validFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          data: reader.result
        });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setFormData(prev => ({
        ...prev,
        [anexoKey]: [...(prev[anexoKey] || []), ...results]
      }));
    }).catch(error => {
      console.error('Erro ao fazer upload dos arquivos:', error);
      alert('Erro ao fazer upload dos arquivos. Tente novamente.');
    });
  };

  // Função para remover arquivo
  const handleRemoveFile = (anexoKey, index) => {
    setFormData(prev => {
      const files = prev[anexoKey] || [];
      return {
        ...prev,
        [anexoKey]: files.filter((_, i) => i !== index)
      };
    });
  };

  // Função para drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, anexoKey) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx';
    
    // Simular o evento de mudança do input
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    input.files = dataTransfer.files;
    
    const syntheticEvent = {
      target: input
    };
    
    handleFileUpload(syntheticEvent, anexoKey);
  };

  // Função para obter ícone do tipo de arquivo
  const getFileIcon = (fileType, fileName) => {
    if (fileType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
      return '📄';
    }
    if (fileType.includes('word') || fileName.toLowerCase().endsWith('.doc') || fileName.toLowerCase().endsWith('.docx')) {
      return '📝';
    }
    return '📎';
  };

  // Função para formatar tamanho do arquivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="formulario-container">
      <h2 className="form-title">14. ANEXOS</h2>
      
      <form className="form-nr13">
        {/* Sub-abas de navegação */}
        <div className="anexos-sub-tabs">
          <button
            type="button"
            className={`anexo-sub-tab ${activeSubTab === "anexo1" ? "active" : ""}`}
            onClick={() => setActiveSubTab("anexo1")}
          >
            I) Parecer do sistema de degasagem
          </button>
          <button
            type="button"
            className={`anexo-sub-tab ${activeSubTab === "anexo2" ? "active" : ""}`}
            onClick={() => setActiveSubTab("anexo2")}
          >
            II) Fluxograma do sistema
          </button>
          <button
            type="button"
            className={`anexo-sub-tab ${activeSubTab === "anexo3" ? "active" : ""}`}
            onClick={() => setActiveSubTab("anexo3")}
          >
            III) ART (Anotação de Responsabilidade Técnica)
          </button>
        </div>

        {/* Conteúdo das sub-abas */}
        <div className="anexos-content">
          {/* Anexo I */}
          {activeSubTab === "anexo1" && (
            <div className="anexo-section">
              <h3 className="anexo-title">I) Parecer do sistema de degasagem</h3>
              
              <div className="file-upload-area"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "anexo1Files")}
              >
                <input
                  type="file"
                  id="anexo1Files"
                  name="anexo1Files"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={(e) => handleFileUpload(e, "anexo1Files")}
                  style={{ display: 'none' }}
                />
                <label htmlFor="anexo1Files" className="file-upload-label">
                  <div className="file-upload-placeholder">
                    <div className="upload-icon-wrapper">
                      <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="upload-text">Clique para anexar arquivos</p>
                    <p className="upload-hint">ou arraste e solte aqui (PDF, DOC, DOCX)</p>
                    <p className="upload-hint-small">Formatos aceitos: PDF, DOC, DOCX</p>
                  </div>
                </label>
              </div>

              {formData.anexo1Files && formData.anexo1Files.length > 0 && (
                <div className="files-list">
                  {formData.anexo1Files.map((file, index) => (
                    <div key={index} className="file-item">
                      <div className="file-info">
                        <span className="file-icon">{getFileIcon(file.type, file.name)}</span>
                        <div className="file-details">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="remove-file-btn"
                        onClick={() => handleRemoveFile("anexo1Files", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Anexo II */}
          {activeSubTab === "anexo2" && (
            <div className="anexo-section">
              <h3 className="anexo-title">II) Fluxograma do sistema</h3>
              
              <div className="file-upload-area"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "anexo2Files")}
              >
                <input
                  type="file"
                  id="anexo2Files"
                  name="anexo2Files"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={(e) => handleFileUpload(e, "anexo2Files")}
                  style={{ display: 'none' }}
                />
                <label htmlFor="anexo2Files" className="file-upload-label">
                  <div className="file-upload-placeholder">
                    <div className="upload-icon-wrapper">
                      <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="upload-text">Clique para anexar arquivos</p>
                    <p className="upload-hint">ou arraste e solte aqui (PDF, DOC, DOCX)</p>
                    <p className="upload-hint-small">Formatos aceitos: PDF, DOC, DOCX</p>
                  </div>
                </label>
              </div>

              {formData.anexo2Files && formData.anexo2Files.length > 0 && (
                <div className="files-list">
                  {formData.anexo2Files.map((file, index) => (
                    <div key={index} className="file-item">
                      <div className="file-info">
                        <span className="file-icon">{getFileIcon(file.type, file.name)}</span>
                        <div className="file-details">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="remove-file-btn"
                        onClick={() => handleRemoveFile("anexo2Files", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Anexo III */}
          {activeSubTab === "anexo3" && (
            <div className="anexo-section">
              <h3 className="anexo-title">III) ART (Anotação de Responsabilidade Técnica)</h3>
              
              <div className="file-upload-area"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "anexo3Files")}
              >
                <input
                  type="file"
                  id="anexo3Files"
                  name="anexo3Files"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={(e) => handleFileUpload(e, "anexo3Files")}
                  style={{ display: 'none' }}
                />
                <label htmlFor="anexo3Files" className="file-upload-label">
                  <div className="file-upload-placeholder">
                    <div className="upload-icon-wrapper">
                      <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="upload-text">Clique para anexar arquivos</p>
                    <p className="upload-hint">ou arraste e solte aqui (PDF, DOC, DOCX)</p>
                    <p className="upload-hint-small">Formatos aceitos: PDF, DOC, DOCX</p>
                  </div>
                </label>
              </div>

              {formData.anexo3Files && formData.anexo3Files.length > 0 && (
                <div className="files-list">
                  {formData.anexo3Files.map((file, index) => (
                    <div key={index} className="file-item">
                      <div className="file-info">
                        <span className="file-icon">{getFileIcon(file.type, file.name)}</span>
                        <div className="file-details">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="remove-file-btn"
                        onClick={() => handleRemoveFile("anexo3Files", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Campo de Assinatura e Data */}
        <div className="form-section-divider">
          <h3>Assinatura e Data</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="anexosData">Data:</label>
            <input
              id="anexosData"
              name="anexosData"
              type="date"
              value={formData.anexosData || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="anexosAssinatura">PLH responsável pela inspeção:</label>
          <input
            id="anexosAssinatura"
            name="anexosAssinatura"
            type="text"
            placeholder="Nome do responsável"
            value={formData.anexosAssinatura || ""}
            onChange={handleChange}
          />
          <p className="form-hint">(subitem 13.5.4.11 alínea "m)")</p>
        </div>

        <div className="form-group">
          <label htmlFor="anexosTituloProfissional">Título Profissional:</label>
          <input
            id="anexosTituloProfissional"
            name="anexosTituloProfissional"
            type="text"
            placeholder="Ex: Engenheiro Mecânico"
            value={formData.anexosTituloProfissional || ""}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

