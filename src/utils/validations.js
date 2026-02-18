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

// Validar PMTA (Pressão Máxima de Trabalho Admissível)
export const validatePMTA = (pmta) => {
  if (!pmta) return { valid: false, message: "PMTA é obrigatória" };
  
  // Remove caracteres não numéricos (exceto vírgula e ponto)
  const cleanPMTA = pmta.toString().replace(/[^\d,.]/g, '').replace(',', '.');
  const numPMTA = parseFloat(cleanPMTA);
  
  if (isNaN(numPMTA)) {
    return { valid: false, message: "PMTA deve ser um número válido" };
  }
  
  if (numPMTA < 0) {
    return { valid: false, message: "PMTA não pode ser negativa" };
  }
  
  if (numPMTA > 1000) {
    return { valid: false, message: "PMTA muito alta. Verifique o valor (máximo: 1000 kgf/cm²)" };
  }
  
  return { valid: true, message: "PMTA válida", value: numPMTA };
};

// Validar data não futura
export const validateDateNotFuture = (dateString) => {
  if (!dateString) return { valid: true, message: "" }; // Data opcional
  
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Fim do dia de hoje
  
  if (date > today) {
    return { valid: false, message: "Data não pode ser futura" };
  }
  
  return { valid: true, message: "Data válida" };
};

// Validar ano de fabricação
export const validateYear = (year) => {
  if (!year) return { valid: true, message: "" }; // Ano opcional
  
  const currentYear = new Date().getFullYear();
  const numYear = parseInt(year);
  
  if (isNaN(numYear)) {
    return { valid: false, message: "Ano deve ser um número válido" };
  }
  
  if (numYear < 1900) {
    return { valid: false, message: "Ano muito antigo (mínimo: 1900)" };
  }
  
  if (numYear > currentYear) {
    return { valid: false, message: `Ano não pode ser futuro (máximo: ${currentYear})` };
  }
  
  return { valid: true, message: "Ano válido" };
};

// Formatar PMTA
export const formatPMTA = (value) => {
  if (!value) return "";
  const num = parseFloat(value.toString().replace(',', '.'));
  if (isNaN(num)) return value;
  return num.toFixed(2).replace('.', ',');
};

// Formatar CNPJ
export const formatCNPJ = (cnpj) => {
  if (!cnpj) return "";
  const clean = cnpj.replace(/[^\d]/g, '');
  if (clean.length !== 14) return cnpj;
  return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
};

// Formatar CEP
export const formatCEP = (cep) => {
  if (!cep) return "";
  const clean = cep.replace(/[^\d]/g, '');
  if (clean.length !== 8) return cep;
  return clean.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

// Formatar CREA
export const formatCREA = (crea) => {
  if (!crea) return "";
  const clean = crea.replace(/[^\d]/g, '');
  if (clean.length <= 6) return clean;
  // Formato: XXXXXX-D ou XX.XXX-X
  if (clean.length === 7) {
    return clean.replace(/^(\d{6})(\d{1})$/, '$1-$2');
  }
  return crea; // Retorna original se não se encaixar no padrão
};

