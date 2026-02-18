// Utilitário para compressão de imagens

/**
 * Comprime uma imagem antes de converter para base64
 * @param {File} file - Arquivo de imagem
 * @param {number} maxWidth - Largura máxima (padrão: 1920)
 * @param {number} maxHeight - Altura máxima (padrão: 1080)
 * @param {number} quality - Qualidade da compressão (0-1, padrão: 0.8)
 * @returns {Promise<string>} - Data URL da imagem comprimida
 */
export const compressImage = (file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        // Calcular novas dimensões mantendo proporção
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }
        
        // Criar canvas para redimensionar
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Converter para base64 com compressão
        const compressedDataUrl = canvas.toDataURL(file.type, quality);
        resolve(compressedDataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Erro ao carregar imagem'));
      };
      
      img.src = e.target.result;
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Comprime múltiplas imagens
 * @param {File[]} files - Array de arquivos de imagem
 * @param {number} maxWidth - Largura máxima
 * @param {number} maxHeight - Altura máxima
 * @param {number} quality - Qualidade da compressão
 * @returns {Promise<string[]>} - Array de Data URLs comprimidas
 */
export const compressImages = async (files, maxWidth = 1920, maxHeight = 1080, quality = 0.8) => {
  const promises = files.map(file => compressImage(file, maxWidth, maxHeight, quality));
  return Promise.all(promises);
};

