// Script para proteger arquivos com senha (CommonJS)
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PASSWORD = 'abc123';
const SALT = 'sistema-nr13-salt-2024';

// Arquivos a serem protegidos
const FILES_TO_PROTECT = [
  'CONTRATO_LICENCA.md',
  'APRESENTACAO_EXECUTIVA.md',
  'PROPOSTA_COMERCIAL.md'
];

// Função para criptografar
function encrypt(text, password) {
  const key = crypto.scryptSync(password, SALT, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
}

// Função para descriptografar
function decrypt(encryptedText, password) {
  const key = crypto.scryptSync(password, SALT, 32);
  const parts = encryptedText.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Proteger arquivos
function protectFiles() {
  const rootDir = path.join(__dirname, '..');
  
  FILES_TO_PROTECT.forEach(filename => {
    const filePath = path.join(rootDir, filename);
    const encryptedPath = path.join(rootDir, filename + '.encrypted');
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const encrypted = encrypt(content, PASSWORD);
      fs.writeFileSync(encryptedPath, encrypted);
      fs.unlinkSync(filePath); // Remove arquivo original
      console.log(`✅ ${filename} protegido e criptografado`);
    }
  });
}

// Desproteger arquivos
function unprotectFiles() {
  const rootDir = path.join(__dirname, '..');
  
  FILES_TO_PROTECT.forEach(filename => {
    const encryptedPath = path.join(rootDir, filename + '.encrypted');
    const filePath = path.join(rootDir, filename);
    
    if (fs.existsSync(encryptedPath)) {
      const encrypted = fs.readFileSync(encryptedPath, 'utf8');
      try {
        const decrypted = decrypt(encrypted, PASSWORD);
        fs.writeFileSync(filePath, decrypted);
        console.log(`✅ ${filename} descriptografado e restaurado`);
      } catch (error) {
        console.error(`❌ Erro ao descriptografar ${filename}:`, error.message);
      }
    }
  });
}

// Visualizar arquivo protegido
function viewFile(filename, password) {
  const rootDir = path.join(__dirname, '..');
  const encryptedPath = path.join(rootDir, filename + '.encrypted');
  
  if (!fs.existsSync(encryptedPath)) {
    console.error(`❌ Arquivo ${filename} não encontrado ou não está protegido`);
    return null;
  }
  
  try {
    const encrypted = fs.readFileSync(encryptedPath, 'utf8');
    const decrypted = decrypt(encrypted, password);
    return decrypted;
  } catch (error) {
    console.error(`❌ Senha incorreta ou arquivo corrompido`);
    return null;
  }
}

// CLI
const command = process.argv[2];
const filename = process.argv[3];

if (command === 'protect') {
  protectFiles();
} else if (command === 'unprotect') {
  unprotectFiles();
} else if (command === 'view') {
  if (!filename) {
    console.error('❌ Especifique o nome do arquivo');
    process.exit(1);
  }
  const content = viewFile(filename, PASSWORD);
  if (content) {
    console.log(content);
  } else {
    process.exit(1);
  }
} else {
  console.log('Uso:');
  console.log('  node scripts/protect-files.cjs protect    - Protege os arquivos');
  console.log('  node scripts/protect-files.cjs unprotect  - Desprotege os arquivos');
  console.log('  node scripts/protect-files.cjs view <arquivo> - Visualiza arquivo protegido');
}

module.exports = { protectFiles, unprotectFiles, viewFile };

