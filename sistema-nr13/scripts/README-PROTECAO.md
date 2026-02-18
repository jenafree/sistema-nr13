# 🔐 Sistema de Proteção de Arquivos

Este sistema permite proteger arquivos sensíveis com criptografia AES-256.

## 📄 Arquivos Protegidos

Os seguintes arquivos são protegidos por senha:

- `CONTRATO_LICENCA.md`
- `APRESENTACAO_EXECUTIVA.md`
- `PROPOSTA_COMERCIAL.md`

## 🔑 Senha

**Senha padrão:** `abc123`

## 🚀 Como Usar

### Proteger Arquivos

Para criptografar os arquivos sensíveis:

```bash
npm run protect:files
```

Isso irá:
- Criptografar os arquivos usando AES-256
- Criar arquivos `.encrypted`
- Remover os arquivos originais

### Visualizar Arquivos Protegidos

Para visualizar um arquivo protegido (solicita senha):

```bash
npm run view:protected
```

O script irá:
1. Mostrar lista de arquivos disponíveis
2. Solicitar qual arquivo deseja visualizar
3. Solicitar a senha
4. Exibir o conteúdo descriptografado

### Desproteger Arquivos

Para descriptografar e restaurar os arquivos originais:

```bash
npm run unprotect:files
```

⚠️ **Atenção:** Isso irá restaurar os arquivos originais sem proteção.

## 🔒 Segurança

- Os arquivos são criptografados usando **AES-256-CBC**
- A senha é derivada usando **scrypt**
- Os arquivos `.encrypted` são adicionados ao `.gitignore` automaticamente
- Os arquivos originais são removidos após criptografia

## 📝 Notas

- Os arquivos protegidos não devem ser commitados no Git
- Mantenha a senha segura
- Faça backup dos arquivos antes de proteger
- Para alterar a senha, edite `scripts/protect-files.cjs`

## 🛠️ Uso Avançado

### Visualizar arquivo específico via linha de comando

```bash
node scripts/protect-files.cjs view CONTRATO_LICENCA.md
```

### Proteger apenas um arquivo específico

Edite o array `FILES_TO_PROTECT` em `scripts/protect-files.cjs` e execute:

```bash
npm run protect:files
```

