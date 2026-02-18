# 🚀 Guia de Deploy - GitHub Pages

Este documento explica como publicar o site no GitHub Pages.

## 📋 Pré-requisitos

1. Repositório configurado no GitHub: `jenafree/sistema-nr13`
2. Node.js e npm instalados
3. Git configurado

## 🔧 Configuração

### 1. Instalar dependências

```bash
npm install
```

Isso instalará o pacote `gh-pages` necessário para o deploy.

### 2. Verificar configurações

- ✅ `vite.config.js` - base path configurado como `/sistema-nr13/`
- ✅ `package.json` - homepage: `https://jenafree.github.io/sistema-nr13`
- ✅ `package.json` - scripts de deploy configurados

## 🚀 Comandos para Publicar

### Opção 1: Deploy Completo (Recomendado)

```bash
npm run deploy
```

Este comando:
1. Executa `predeploy` (que faz o build)
2. Publica a pasta `dist` na branch `gh-pages`

### Opção 2: Build e Deploy Separados

```bash
# 1. Gerar build
npm run build

# 2. Publicar no GitHub Pages
npm run deploy
```

## 📝 O que acontece

1. **Build**: O Vite gera os arquivos estáticos na pasta `dist/`
2. **Deploy**: O `gh-pages` cria/atualiza a branch `gh-pages` no GitHub
3. **Publicação**: O GitHub Pages serve o site automaticamente

## 🌐 URL do Site

Após o deploy, o site estará disponível em:

**https://jenafree.github.io/sistema-nr13**

## ⚙️ Configuração no GitHub

1. Acesse: `Settings` > `Pages` no repositório
2. Verifique se a branch `gh-pages` está selecionada
3. O site será publicado automaticamente

## 🔄 Atualizar o Site

Para atualizar o site após fazer alterações:

```bash
# Fazer suas alterações no código...

# Fazer commit
git add .
git commit -m "Atualizações no site"

# Fazer push
git push

# Publicar no GitHub Pages
npm run deploy
```

## 🐛 Troubleshooting

### Erro: "gh-pages command not found"
```bash
npm install
```

### Erro: "Repository not found"
Verifique se o repositório remoto está configurado:
```bash
git remote -v
```

### Site não carrega corretamente
- Verifique se o `base` no `vite.config.js` está correto: `/sistema-nr13/`
- Verifique se a branch `gh-pages` foi criada no GitHub
- Aguarde alguns minutos para o GitHub processar

## 📚 Scripts Disponíveis

- `npm run build` - Gera build de produção
- `npm run deploy` - Build + Deploy no GitHub Pages
- `npm run preview` - Preview local do build

---

**Nota**: A pasta `dist` está no `.gitignore` e não será commitada na branch principal. Ela será publicada apenas na branch `gh-pages`.

