# 🤝 HANDOFF - Passagem de Bastão

**De:** Neftali  
**Para:** Luiz Felipe  
**Data:** 17/02/2026  
**Branch atual:** `core` (ou `main` se já foi mergeada)

---

## 👋 Olá, Luiz Felipe!

Estou passando o projeto para você. Tudo está funcionando e documentado. Este arquivo é um guia rápido para você começar.

---

## 🎯 O QUE ESTÁ PRONTO

### ✅ Sistema funcionando 100%
- Interface completa e bonita
- Formulário principal funcionando
- PDF gerando corretamente
- Auto-save automático (nunca perde dados!)
- Validações funcionando
- Notificações visuais (aqueles toasts verdes/vermelhos)
- 15 abas criadas (só 2 com conteúdo, o resto é pra você fazer)

### 📁 Arquivos Importantes
```
sistema-nr13/
├── README.md          👈 LEIA ISSO PRIMEIRO
├── ROADMAP.md         👈 SEU GUIA DE TRABALHO
├── CHANGELOG.md       👈 HISTÓRICO DO QUE FOI FEITO
└── src/
    ├── App.jsx        👈 Arquivo principal (tem tudo aqui)
    ├── components/    👈 Componentes React
    └── styles/        👈 CSS de cada componente
```

---

## 🚀 COMEÇANDO AGORA

### 1️⃣ **Primeiro: Rodar o projeto**
```bash
# Abrir terminal na pasta do projeto
cd "D:\SitemaNR13\sistema nr-13\sistema-nr13"

# Instalar dependências (se ainda não fez)
npm install

# Rodar o projeto
npm run dev
```

**Vai abrir em:** `http://localhost:5173` ou `http://localhost:5174`

### 2️⃣ **Testar se está tudo OK**
- [ ] Abriu o site?
- [ ] Consegue preencher os campos?
- [ ] Clicou em "Salvar Rascunho" e apareceu notificação verde?
- [ ] Clicou em "Gerar Relatório" e baixou o PDF?
- [ ] Recarregou a página e os dados continuam lá? (auto-save)

**Se tudo isso funcionou, está perfeito! 🎉**

---

## 🎯 SEU PRIMEIRO TRABALHO

### Fazer a aba "Dados do Contratante"

**Por que começar por essa?**
- É simples (só formulário, sem complicação)
- Você vai aprender o padrão do código
- Depois fica fácil fazer as outras

### 📋 Passo a Passo Detalhado

#### **PASSO 1: Criar a branch**
```bash
git checkout -b feature/dados-contratante
```

#### **PASSO 2: Criar o componente**
Criar arquivo: `src/components/DadosContratante.jsx`

```jsx
import React from "react";
import "../styles/dados-contratante.css";

export default function DadosContratante({ formData, setFormData }) {
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <div className="formulario-container">
      <h2 className="form-title">Dados do Contratante</h2>
      
      <form className="form-nr13">
        
        <div className="form-group">
          <label htmlFor="nomeEmpresa">Nome da Empresa *</label>
          <input
            id="nomeEmpresa"
            name="nomeEmpresa"
            type="text"
            placeholder="Ex: Empresa ABC Ltda"
            value={formData.nomeEmpresa || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cnpj">CNPJ *</label>
          <input
            id="cnpj"
            name="cnpj"
            type="text"
            placeholder="00.000.000/0000-00"
            value={formData.cnpj || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* ADICIONE MAIS CAMPOS AQUI:
            - endereco
            - cidade
            - estado
            - cep
            - telefone
            - email
            - responsavelTecnico
        */}

      </form>
    </div>
  );
}
```

#### **PASSO 3: Criar o CSS**
Criar arquivo: `src/styles/dados-contratante.css`

```css
/* Você pode copiar o estilo de form.css ou criar o seu */
```

#### **PASSO 4: Adicionar campos no App.jsx**

Abrir `src/App.jsx` e procurar onde está:
```jsx
const [formData, setFormData] = useState({
```

Adicionar seus novos campos:
```jsx
const [formData, setFormData] = useState(() => {
  const saved = localStorage.getItem('autosave_nr13');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Erro ao recuperar dados salvos:', error);
    }
  }
  return {
    numeroRelatorio: "",
    equipamento: "",
    // ... outros campos existentes ...
    
    // 👇 SEUS NOVOS CAMPOS AQUI
    nomeEmpresa: "",
    cnpj: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
    email: "",
    responsavelTecnico: ""
  };
});
```

#### **PASSO 5: Integrar no TabContent.jsx**

Abrir `src/components/TabContent.jsx`

1. Importar seu componente no topo:
```jsx
import DadosContratante from "./DadosContratante";
```

2. Procurar o `case "dadosContratante":` e substituir por:
```jsx
case "dadosContratante":
  return (
    <DadosContratante
      formData={formData}
      setFormData={setFormData}
    />
  );
```

#### **PASSO 6: Testar**
- Salvar todos os arquivos
- Ir na aba "Dados do Contratante"
- Preencher os campos
- Verificar se está salvando (recarregar a página)
- Testar o botão "Salvar Rascunho"

#### **PASSO 7: Adicionar no PDF** (opcional por enquanto)

Abrir `src/pdf/RelatorioPDF.jsx` e adicionar uma seção:
```jsx
<View style={styles.section}>
  <Text style={styles.label}>Dados do Contratante</Text>
  <Text style={styles.value}>Empresa: {dados.nomeEmpresa || "-"}</Text>
  <Text style={styles.value}>CNPJ: {dados.cnpj || "-"}</Text>
  {/* ... outros campos ... */}
</View>
```

#### **PASSO 8: Commitar**
```bash
git add .
git commit -m "feat: adiciona formulário de dados do contratante"
git push origin feature/dados-contratante
```

---

## 🆘 SE DER PROBLEMA

### Erro: "Cannot find module"
```bash
# Reinstalar dependências
npm install
```

### Erro: "Port already in use"
```bash
# Matar o processo e rodar de novo
# No Windows: Ctrl+C no terminal e rodar npm run dev novamente
```

### Página em branco
- Abrir o console do navegador (F12)
- Ver qual é o erro
- Geralmente é erro de sintaxe (vírgula faltando, parêntese, etc)

### Auto-save não funciona
- Verificar se o campo tem `name="nomeCorreto"`
- Verificar se tem `onChange={handleChange}`
- Verificar se o nome do campo está no `formData`

---

## 💡 DICAS IMPORTANTES

### ✅ FAÇA:
- Copie o padrão dos componentes existentes (Formulario.jsx)
- Use os mesmos estilos (form.css)
- Teste sempre depois de cada mudança
- Commit frequentemente
- Leia os comentários no código

### ❌ NÃO FAÇA:
- Não mude a estrutura do App.jsx sem necessidade
- Não delete arquivos existentes
- Não commite código que não funciona
- Não esqueça de testar no mobile (F12 > modo responsivo)

---

## 📚 ARQUIVOS PARA CONSULTAR

1. **README.md** - Visão geral do projeto
2. **ROADMAP.md** - Lista completa de todas as abas que faltam
3. **CHANGELOG.md** - O que já foi feito
4. **src/components/Formulario.jsx** - Exemplo perfeito de como fazer um formulário
5. **src/App.jsx** - Onde está toda a lógica principal

---

## 🎯 PRÓXIMAS ABAS (depois de Dados do Contratante)

1. ✅ Dados do Contratante (você vai fazer agora)
2. Exame Externo (tem upload de múltiplas fotos)
3. Exame Interno (parecido com o externo)
4. Ensaios Realizados (tem tabelas)
5. Recomendações (lista dinâmica)
6. ... (veja ROADMAP.md para lista completa)

---

## 🤙 CONTATO

**Neftali** (desenvolvedor anterior)
- Se tiver dúvida, pode perguntar
- Deixei tudo documentado, mas qualquer coisa...

---

## ✅ CHECKLIST ANTES DE COMEÇAR

- [ ] Li o README.md
- [ ] Li o ROADMAP.md
- [ ] Rodei `npm install`
- [ ] Rodei `npm run dev`
- [ ] Testei o sistema e está funcionando
- [ ] Entendi a estrutura de pastas
- [ ] Criei minha branch `feature/dados-contratante`
- [ ] Estou pronto para começar! 🚀

---

## 🎉 MENSAGEM FINAL

O projeto está **100% funcional** e bem estruturado. Você só precisa seguir o padrão que já existe.

**Copie o que já está feito e adapte para sua aba.**

Cada aba nova vai ficar mais fácil. A primeira é sempre a mais difícil porque você está aprendendo.

**Boa sorte e bom código! 💪**

Se precisar de ajuda, o código está todo comentado e os arquivos de documentação têm tudo explicado.

---

**Última atualização:** 17/02/2026 às 09:10  
**Status do projeto:** ✅ Pronto para desenvolvimento  
**Próximo passo:** Feature "Dados do Contratante"

