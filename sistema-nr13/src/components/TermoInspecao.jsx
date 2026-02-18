import React, { useEffect } from "react";
import { compressImage } from "../utils/imageCompression";
import { validateFileSize, validateFileType } from "../utils/validations";
import "../styles/form.css";
import "../styles/termo-inspecao.css";

export default function TermoInspecao({ formData, setFormData }) {

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Gerar texto padrão do termo automaticamente
  useEffect(() => {
    if (!formData.termoTexto && formData.dataFim && formData.tipoInspecao && formData.equipamento && formData.tag && formData.numeroRelatorio) {
      const dataFim = new Date(formData.dataFim);
      const dataFormatada = dataFim.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      
      const textoPadrao = `Em ${dataFormatada} foi finalizada a inspeção de segurança "${formData.tipoInspecao}" no **${formData.equipamento} [${formData.tag}]**, conforme relatório nº **${formData.numeroRelatorio}** que faz parte integrante deste registro de segurança.\n\nPor apresentar integridade estrutural e não haver condições de RGI (Risco Grave e Iminente), este vaso está liberado para seu funcionamento normal por um período de 3 (três) anos, devendo ser submetido a nova inspeção conforme as datas contidas no relatório supracitado.`;
      
      setFormData(prev => ({
        ...prev,
        termoTexto: textoPadrao
      }));
    }
  }, [formData.dataFim, formData.tipoInspecao, formData.equipamento, formData.tag, formData.numeroRelatorio]);

  // Função para upload de imagem
  const handleImageUpload = async (e) => {
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
        setFormData(prev => ({
          ...prev,
          termoImagem: compressedImage
        }));
      } catch (error) {
        console.error('Erro ao processar imagem:', error);
        alert('Erro ao processar imagem. Tente novamente.');
      }
    }
  };

  // Função para drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = async (e) => {
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
        setFormData(prev => ({
          ...prev,
          termoImagem: compressedImage
        }));
      } catch (error) {
        console.error('Erro ao processar imagem:', error);
        alert('Erro ao processar imagem. Tente novamente.');
      }
    } else {
      alert('Por favor, solte apenas arquivos de imagem.');
    }
  };

  // Remover imagem
  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      termoImagem: ""
    }));
  };

  return (
    <div className="formulario-container">
      <h2 className="form-title">TERMO DE INSPEÇÃO</h2>
      
      <form className="form-nr13">
        {/* Texto do Termo */}
        <div className="form-group">
          <label htmlFor="termoTexto">Texto do Termo:</label>
          <textarea
            id="termoTexto"
            name="termoTexto"
            rows="8"
            placeholder="O texto será preenchido automaticamente com base nos dados do relatório..."
            value={formData.termoTexto || ""}
            onChange={handleChange}
            className="termo-textarea"
          />
          <p className="form-hint">
            O texto será gerado automaticamente com base nos dados preenchidos no relatório. 
            Você pode editar livremente conforme necessário.
          </p>
        </div>

        {/* Data e Local */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="termoData">Data:</label>
            <input
              id="termoData"
              name="termoData"
              type="date"
              value={formData.termoData || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="termoLocal">Local:</label>
            <input
              id="termoLocal"
              name="termoLocal"
              type="text"
              placeholder="Ex: Anápolis-GO"
              value={formData.termoLocal || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Dados do Engenheiro */}
        <div className="form-section-divider">
          <h3>Dados do Engenheiro Responsável</h3>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="termoEngenheiroNome">Nome:</label>
            <input
              id="termoEngenheiroNome"
              name="termoEngenheiroNome"
              type="text"
              placeholder="Ex: RONEY DE AQUINO"
              value={formData.termoEngenheiroNome || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="termoEngenheiroTitulo">Título Profissional:</label>
            <input
              id="termoEngenheiroTitulo"
              name="termoEngenheiroTitulo"
              type="text"
              placeholder="Ex: Engenheiro Mecânico"
              value={formData.termoEngenheiroTitulo || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="termoEngenheiroCrea">CREA:</label>
          <input
            id="termoEngenheiroCrea"
            name="termoEngenheiroCrea"
            type="text"
            placeholder="Ex: 1017159246"
            value={formData.termoEngenheiroCrea || ""}
            onChange={handleChange}
          />
        </div>

        {/* Upload de Imagem/Assinatura */}
        <div className="form-section-divider">
          <h3>Imagem/Assinatura</h3>
        </div>

        <div className="form-group">
          <label>Imagem ou Assinatura Digital:</label>
          {!formData.termoImagem ? (
            <div 
              className="image-upload-area termo-upload"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="termoImagem"
                name="termoImagem"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="termoImagem" className="image-upload-label">
                <div className="image-placeholder">
                  <div className="upload-icon-wrapper">
                    <svg className="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="upload-text">Clique para anexar imagem ou assinatura</p>
                  <p className="upload-hint">ou arraste e solte aqui</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="termo-image-preview">
              <img src={formData.termoImagem} alt="Assinatura ou imagem do termo" />
              <button
                type="button"
                className="remove-image-btn"
                onClick={handleRemoveImage}
              >
                ✕ Remover
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

