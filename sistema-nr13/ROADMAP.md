# 🗺️ ROADMAP - Sistema NR-13

## 📌 Status Atual: **BRANCH CORE COMPLETA** ✅

**Última atualização:** 17/02/2026  
**Desenvolvedor atual:** Luiz Felipe  
**Desenvolvedor anterior:** Neftali

---

## ✅ CONCLUÍDO - Branch `core` (v1.0)

### Funcionalidades Implementadas:
- [x] Estrutura base do projeto (React + Vite)
- [x] Header profissional com logo e número do relatório
- [x] Sistema de 15 abas conforme sumário NR-13
- [x] Formulário completo "Informações do Vaso"
- [x] Upload de imagem com drag-and-drop e animação
- [x] Auto-save automático (localStorage)
- [x] Recuperação automática de dados ao recarregar
- [x] Validação de campos obrigatórios
- [x] Sistema de notificações Toast
- [x] Indicadores visuais de abas preenchidas
- [x] Barra de progresso global
- [x] 3 botões principais: Gerar PDF, Salvar Rascunho, Limpar
- [x] Geração de PDF básico com layout NR-13
- [x] Design responsivo (mobile + desktop)

### Arquivos Criados:
```
src/
├── components/
│   ├── Formulario.jsx          ✅ COMPLETO
│   ├── TabsMenu.jsx             ✅ COMPLETO
│   ├── TabContent.jsx           ✅ ESTRUTURA PRONTA
│   └── Toast.jsx                ✅ COMPLETO
├── pdf/
│   └── RelatorioPDF.jsx         ✅ BÁSICO IMPLEMENTADO
├── styles/
│   ├── form.css                 ✅ COMPLETO
│   ├── tabs.css                 ✅ COMPLETO
│   ├── toast.css                ✅ COMPLETO
│   └── tab-resumo.css           ✅ COMPLETO
├── App.jsx                      ✅ COMPLETO
└── App.css                      ✅ COMPLETO
```

---

## 🚀 PRÓXIMOS PASSOS - Desenvolvimento das Abas

### 📋 Estratégia de Desenvolvimento:
Cada aba será desenvolvida em uma **branch separada** e depois mesclada na `main`.

### 🎯 Prioridade 1 - Abas Críticas (Semana 1-2)

#### 1. **Branch: `feature/dados-contratante`**
**Responsável:** Luiz Felipe  
**Prazo sugerido:** 2-3 dias  
**Descrição:** Formulário com dados da empresa contratante

**Campos necessários:**
- Nome da empresa
- CNPJ
- Endereço completo (Rua, Número, Bairro, Cidade, Estado, CEP)
- Telefone
- E-mail
- Responsável técnico
- Registro profissional (CREA/etc)

**Arquivos a criar:**
- `src/components/DadosContratante.jsx`
- `src/styles/dados-contratante.css`

**Integração:**
- Adicionar campos no `formData` do `App.jsx`
- Atualizar `TabContent.jsx` para renderizar o novo componente
- Adicionar seção no `RelatorioPDF.jsx`

---

#### 2. **Branch: `feature/exame-externo`**
**Responsável:** A definir  
**Prazo sugerido:** 3-4 dias  
**Descrição:** Registro de inspeção externa do vaso

**Campos necessários:**
- Estado geral do equipamento
- Pintura/Revestimento
- Corrosão (localização e severidade)
- Deformações
- Vazamentos
- Suportes e fixações
- Válvulas de segurança
- Instrumentação
- **Galeria de fotos** (múltiplas imagens)
- Observações gerais

**Funcionalidades especiais:**
- Upload múltiplo de imagens
- Checkbox para itens conformes/não conformes
- Campo de texto para cada item

---

#### 3. **Branch: `feature/exame-interno`**
**Responsável:** A definir  
**Prazo sugerido:** 3-4 dias  
**Descrição:** Registro de inspeção interna do vaso

**Campos necessários:**
- Condições de abertura
- Estado interno do casco
- Corrosão interna
- Incrustações
- Soldas internas
- Bocais e flanges
- **Galeria de fotos internas**
- Observações

---

### 🎯 Prioridade 2 - Abas Importantes (Semana 3-4)

#### 4. **Branch: `feature/ensaios-realizados`**
**Campos:**
- Teste hidrostático (pressão, duração, resultado)
- Medição de espessura por ultrassom (tabela com pontos)
- Líquido penetrante
- Partículas magnéticas
- Outros ensaios não destrutivos
- Resultados e laudos

#### 5. **Branch: `feature/recomendacoes`**
**Campos:**
- Lista de recomendações (adicionar/remover dinamicamente)
- Nível de criticidade (baixa, média, alta, crítica)
- Prazo para correção
- Responsável pela ação

#### 6. **Branch: `feature/conclusao`**
**Campos:**
- Parecer final (aprovado/reprovado/aprovado com restrições)
- Justificativa
- Assinatura digital do responsável técnico
- Data da conclusão

---

### 🎯 Prioridade 3 - Abas Complementares (Semana 5-6)

#### 7. **Branch: `feature/responsabilidades`**
- Texto padrão editável
- Responsáveis pela inspeção
- Equipe técnica

#### 8. **Branch: `feature/referencias-normativas`**
- Lista de normas aplicáveis (NR-13, ASME, etc)
- Checkbox para marcar as utilizadas

#### 9. **Branch: `feature/exame-documentacao`**
- Checklist de documentos verificados
- Projeto de fabricação
- Relatórios anteriores
- Certificados

#### 10. **Branch: `feature/relatorio-anterior`**
- Número do relatório anterior
- Data da última inspeção
- Principais recomendações anteriores
- Status das pendências

#### 11. **Branch: `feature/instalacoes`**
- Descrição do local
- Condições ambientais
- Acessibilidade
- Fotos do local

#### 12. **Branch: `feature/proximas-inspecoes`**
- Data prevista próxima inspeção externa
- Data prevista próxima inspeção interna
- Observações

#### 13. **Branch: `feature/anexos`**
- Upload de múltiplos arquivos (PDFs, imagens, etc)
- Lista de anexos com preview
- Download individual

---

## 🛠️ MELHORIAS TÉCNICAS FUTURAS

### Backend (Opcional - Fase 2)
- [ ] API REST com Node.js + Express
- [ ] Banco de dados (PostgreSQL ou MongoDB)
- [ ] Autenticação de usuários
- [ ] Controle de acesso por perfil
- [ ] Histórico de relatórios
- [ ] Busca e filtros

### Features Avançadas
- [ ] Assinatura digital
- [ ] Geração de QR Code no PDF
- [ ] Envio por e-mail
- [ ] Templates personalizáveis
- [ ] Exportar para Word
- [ ] Modo offline (PWA)
- [ ] Impressão otimizada

### Melhorias de UX
- [ ] Tour guiado (primeira vez)
- [ ] Atalhos de teclado
- [ ] Modo escuro
- [ ] Internacionalização (PT/EN/ES)
- [ ] Acessibilidade (WCAG)

---

## 📝 CONVENÇÕES DE DESENVOLVIMENTO

### Nomenclatura de Branches:
```
feature/nome-da-aba      # Para novas funcionalidades
bugfix/descricao         # Para correções
hotfix/descricao         # Para correções urgentes
refactor/descricao       # Para refatorações
```

### Commits:
```
feat: adiciona formulário de dados do contratante
fix: corrige validação de campos obrigatórios
style: ajusta espaçamento do header
refactor: reorganiza estrutura de pastas
docs: atualiza README com novas instruções
```

### Workflow Git:
```bash
# 1. Criar nova branch a partir da main
git checkout main
git pull origin main
git checkout -b feature/dados-contratante

# 2. Desenvolver e commitar
git add .
git commit -m "feat: adiciona formulário dados contratante"

# 3. Push para o repositório
git push origin feature/dados-contratante

# 4. Criar Pull Request no GitHub
# 5. Após aprovação, fazer merge na main
```

---

## 📞 CONTATOS

**Neftali** - Desenvolvedor inicial (core)  
**Luiz Felipe** - Desenvolvedor atual (features)

---

## 🎯 OBJETIVO FINAL

Sistema completo para geração de **Relatórios Técnicos de Inspeção NR-13** com:
- ✅ Interface profissional e intuitiva
- ✅ Validações e segurança
- ✅ PDF de alta qualidade
- ✅ Persistência de dados
- ✅ Todas as 15 seções do relatório oficial

---

## 📊 PROGRESSO GERAL

```
[████████░░░░░░░░░░░░] 35% - Core completo
```

**Abas completas:** 2/15 (Resumo + Informações do Vaso)  
**Abas pendentes:** 13/15

---

## 🚦 COMO COMEÇAR (Para Luiz Felipe)

### 1. **Clonar e configurar** (se ainda não fez):
```bash
git clone <url-do-repositorio>
cd sistema-nr13
npm install
npm run dev
```

### 2. **Criar primeira branch de feature**:
```bash
git checkout -b feature/dados-contratante
```

### 3. **Estrutura sugerida para nova aba**:

**Arquivo:** `src/components/DadosContratante.jsx`
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
    <div className="dados-contratante-container">
      <h2 className="form-title">Dados do Contratante</h2>
      
      <form className="form-nr13">
        {/* Seus campos aqui */}
      </form>
    </div>
  );
}
```

### 4. **Integrar no TabContent.jsx**:
```jsx
import DadosContratante from "./DadosContratante";

// No switch case:
case "dadosContratante":
  return (
    <DadosContratante
      formData={formData}
      setFormData={setFormData}
    />
  );
```

### 5. **Adicionar campos no App.jsx**:
```jsx
const [formData, setFormData] = useState({
  // ... campos existentes ...
  nomeEmpresa: "",
  cnpj: "",
  endereco: "",
  // etc...
});
```

### 6. **Atualizar PDF (RelatorioPDF.jsx)**:
Adicionar seção com os novos dados.

---

## 💡 DICAS IMPORTANTES

1. **Sempre testar antes de commitar**
2. **Manter o padrão de código existente**
3. **Documentar funções complexas**
4. **Usar os componentes Toast para feedback**
5. **Validar campos obrigatórios**
6. **Testar responsividade (mobile)**
7. **Verificar se o PDF está renderizando corretamente**

---

## 🆘 PROBLEMAS COMUNS

### Erro ao gerar PDF:
- Verificar se todos os campos estão no `formData`
- Checar se não há valores `undefined` no PDF

### Auto-save não funciona:
- Verificar se o campo tem `name` e `onChange`
- Conferir se está usando `setFormData` corretamente

### Aba não aparece:
- Verificar se adicionou o `case` no `TabContent.jsx`
- Confirmar que o `id` da aba está correto no `TabsMenu.jsx`

---

**BOA SORTE, LUIZ FELIPE! 🚀**

Qualquer dúvida, consulte o código existente ou o README.md.

