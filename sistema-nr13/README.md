# Sistema NR-13 - Relatório Técnico de Inspeção

Sistema web para geração de relatórios técnicos de inspeção de vasos sob pressão conforme NR-13.

## 🚀 Funcionalidades Implementadas (Branch Core)

### ✅ Estrutura Principal
- **Header Profissional**: Logo da empresa, número do relatório e títulos
- **Sistema de Abas**: 15 abas organizadas conforme sumário do relatório oficial
- **Barra de Progresso**: Indicador visual do preenchimento do formulário

### 📝 Formulário Principal
- Campos completos para informações do vaso:
  - Equipamento, Fabricante, Nº de Série
  - Ano de Fabricação (1950-2030)
  - TAG, Tipo (Vertical/Horizontal)
  - PMTA (Pressão Máxima de Trabalho Admissível)
  - Tipo de Inspeção (Inicial, Periódica, Extraordinária)
  - Local de Instalação
  - Data/Hora de Início e Fim da Inspeção
- **Upload de Imagem**: Área com drag-and-drop e animação para foto do equipamento

### 💾 Persistência de Dados
- **Auto-save**: Salvamento automático no localStorage a cada 1 segundo
- **Recuperação Automática**: Dados restaurados ao recarregar a página
- **Salvar Rascunho**: Download de arquivo JSON com os dados
- **Limpar Dados**: Opção para resetar todos os campos

### 📄 Geração de PDF
- Geração de PDF profissional com @react-pdf/renderer
- Layout alinhado ao modelo oficial NR-13
- Validação de campos obrigatórios antes de gerar
- Nome do arquivo dinâmico baseado no número do relatório

### 🎨 Interface e UX
- **Notificações Toast**: Feedback visual para ações do usuário
- **Indicadores de Abas**: Marcação visual de abas com conteúdo preenchido
- **Animações**: Botões, ícones e transições suaves
- **Responsivo**: Layout adaptado para desktop e mobile

### 🎯 Botões de Ação
1. **Gerar Relatório** (Roxo): Valida e gera o PDF
2. **Salvar Rascunho** (Verde): Salva e baixa JSON
3. **Limpar** (Vermelho): Reseta todos os campos

## 🛠️ Tecnologias

- **React 19.2.0**: Framework principal
- **Vite 7.3.1**: Build tool
- **@react-pdf/renderer 4.3.2**: Geração de PDF
- **CSS3**: Estilização com animações e gradientes

## 📦 Instalação

```bash
npm install
```

## 🚀 Executar

```bash
npm run dev
```

Acesse: `http://localhost:5173`

## 📂 Estrutura de Arquivos

```
src/
├── components/
│   ├── Formulario.jsx       # Formulário principal
│   ├── TabsMenu.jsx          # Menu de navegação das abas
│   ├── TabContent.jsx        # Conteúdo das abas
│   └── Toast.jsx             # Componente de notificações
├── pdf/
│   └── RelatorioPDF.jsx      # Template do PDF
├── styles/
│   ├── form.css              # Estilos do formulário
│   ├── tabs.css              # Estilos das abas
│   ├── toast.css             # Estilos das notificações
│   └── tab-resumo.css        # Estilos do resumo
├── App.jsx                   # Componente principal
└── App.css                   # Estilos globais
```

## 🎯 Próximos Passos (Branches Futuras)

Cada aba terá sua branch específica para desenvolvimento:
- `feature/dados-contratante`
- `feature/responsabilidades`
- `feature/referencias-normativas`
- `feature/exame-documentacao`
- `feature/relatorio-anterior`
- `feature/instalacoes`
- `feature/exame-externo`
- `feature/exame-interno`
- `feature/ensaios-realizados`
- `feature/recomendacoes`
- `feature/conclusao`
- `feature/proximas-inspecoes`
- `feature/anexos`

## 📝 Validações Implementadas

Campos obrigatórios validados antes de gerar PDF:
- Número do Relatório
- Equipamento
- Fabricante
- Número de Série
- Ano de Fabricação
- TAG
- Tipo
- PMTA

## 🎨 Paleta de Cores

- **Primário**: Gradiente roxo (#667eea → #764ba2)
- **Sucesso**: Verde (#10b981 → #059669)
- **Erro**: Vermelho (#ef4444 → #dc2626)
- **Info**: Azul (#3b82f6 → #2563eb)
- **Warning**: Laranja (#f59e0b → #d97706)

## 📄 Licença

Desenvolvido para SOUZA&AQUINO - Maestria em Engenharia Mecânica
