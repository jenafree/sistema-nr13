# 🔍 Solução: Página Branca

## ⚠️ Problema Identificado

A página está aparecendo em branco em `http://localhost:5173/sistema-nr13/`

## ✅ Soluções

### 1. Verificar se o Servidor está Rodando

Abra o terminal e execute:

```bash
cd D:\SitemaNR13
npm run dev
```

Você deve ver algo como::
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 2. Acessar a URL Correta

**IMPORTANTE:** Com a configuração `base: '/sistema-nr13/'` no `vite.config.js`, você precisa acessar:

```
http://localhost:5173/sistema-nr13/
```

**OU** remover o base do vite.config.js para acessar diretamente:

```
http://localhost:5173/
```

### 3. Verificar Erros no Console do Navegador

1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Procure por erros em vermelho
4. Copie e me envie os erros

### 4. Verificar Erros no Terminal

Olhe o terminal onde o `npm run dev` está rodando e veja se há erros.

### 5. Limpar Cache e Reinstalar

```bash
cd D:\SitemaNR13
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

### 6. Verificar se o React está Renderizando

Abra o DevTools (F12) → Console e digite:

```javascript
document.getElementById('root')
```

Se retornar `null`, há um problema com o HTML.

### 7. Solução Rápida: Remover Base Path

Se o problema persistir, edite `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base: '/sistema-nr13/',  // Comente ou remova esta linha
})
```

Depois acesse: `http://localhost:5173/`

## 🆘 Ainda com Problemas?

Envie:
1. Mensagens de erro do console do navegador (F12)
2. Mensagens de erro do terminal
3. Screenshot da página

