// Script interativo para visualizar arquivos protegidos (CommonJS)
const readline = require('readline');
const { viewFile } = require('./protect-files.cjs');

const FILES = [
  'CONTRATO_LICENCA.md',
  'APRESENTACAO_EXECUTIVA.md',
  'PROPOSTA_COMERCIAL.md'
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askPassword() {
  return new Promise((resolve) => {
    rl.question('🔒 Digite a senha: ', (password) => {
      resolve(password);
    });
  });
}

function askFile() {
  return new Promise((resolve) => {
    console.log('\n📄 Arquivos protegidos disponíveis:');
    FILES.forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`);
    });
    
    rl.question('\nEscolha o arquivo (número): ', (answer) => {
      const index = parseInt(answer) - 1;
      if (index >= 0 && index < FILES.length) {
        resolve(FILES[index]);
      } else {
        console.log('❌ Opção inválida');
        resolve(null);
      }
    });
  });
}

async function main() {
  console.log('🔐 Sistema de Proteção de Arquivos - Sistema NR-13\n');
  
  const filename = await askFile();
  if (!filename) {
    rl.close();
    return;
  }
  
  const password = await askPassword();
  
  console.log('\n🔓 Descriptografando...\n');
  const content = viewFile(filename, password);
  
  if (content) {
    console.log('─'.repeat(60));
    console.log(content);
    console.log('─'.repeat(60));
  } else {
    console.log('❌ Senha incorreta!');
  }
  
  rl.close();
}

main();

