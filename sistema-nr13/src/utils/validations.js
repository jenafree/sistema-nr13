// Utilitários de validação

// Validar CNPJ
export const validateCNPJ = (cnpj) => {
  if (!cnpj) return { valid: false, message: "CNPJ é obrigatório" };
  
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
  
  if (cleanCNPJ.length !== 14) {
    return { valid: false, message: "CNPJ deve ter 14 dígitos" };
  }
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanCNPJ)) {
    return { valid: false, message: "CNPJ inválido" };
  }
  
  // Validação dos dígitos verificadores
  let length = cleanCNPJ.length - 2;
  let numbers = cleanCNPJ.substring(0, length);
  const digits = cleanCNPJ.substring(length);
  let sum = 0;
  let pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result != digits.charAt(0)) {
    return { valid: false, message: "CNPJ inválido" };
  }
  
  length = length + 1;
  numbers = cleanCNPJ.substring(0, length);
  sum = 0;
  pos = length - 7;
  
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result != digits.charAt(1)) {
    return { valid: false, message: "CNPJ inválido" };
  }
  
  return { valid: true, message: "CNPJ válido" };
};

// Validar CEP
export const validateCEP = (cep) => {
  if (!cep) return { valid: false, message: "CEP é obrigatório" };
  
  const cleanCEP = cep.replace(/[^\d]/g, '');
  
  if (cleanCEP.length !== 8) {
    return { valid: false, message: "CEP deve ter 8 dígitos" };
  }
  
  return { valid: true, message: "CEP válido" };
};

// Validar CREA
export const validateCREA = (crea) => {
  if (!crea) return { valid: false, message: "CREA é obrigatório" };
  
  const cleanCREA = crea.replace(/[^\d]/g, '');
  
  if (cleanCREA.length < 6 || cleanCREA.length > 10) {
    return { valid: false, message: "CREA deve ter entre 6 e 10 dígitos" };
  }
  
  return { valid: true, message: "CREA válido" };
};

// Validar datas
export const validateDates = (dataInicio, dataFim) => {
  if (!dataInicio || !dataFim) {
    return { valid: true, message: "" }; // Datas opcionais
  }
  
  const inicio = new Date(dataInicio);
  const fim = new Date(dataFim);
  
  if (fim < inicio) {
    return { valid: false, message: "Data de fim deve ser posterior à data de início" };
  }
  
  return { valid: true, message: "Datas válidas" };
};

// Validar tamanho de arquivo
export const validateFileSize = (file, maxSizeMB = 5) => {
  if (!file) return { valid: false, message: "Arquivo não selecionado" };
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // Converter MB para bytes
  
  if (file.size > maxSizeBytes) {
    return { 
      valid: false, 
      message: `Arquivo muito grande. Tamanho máximo: ${maxSizeMB}MB` 
    };
  }
  
  return { valid: true, message: "Arquivo válido" };
};

// Validar tipo de arquivo
export const validateFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']) => {
  if (!file) return { valid: false, message: "Arquivo não selecionado" };
  
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      message: `Tipo de arquivo não permitido. Tipos permitidos: ${allowedTypes.join(', ')}` 
    };
  }
  
  return { valid: true, message: "Tipo de arquivo válido" };
};

