# Sistema NR-13 - Gerenciamento de Relatórios de Inspeção

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646cff.svg)

**Sistema completo para geração de relatórios técnicos de inspeção de vasos de pressão conforme NR-13**

[Características](#-características) • [Instalação](#-instalação) • [Uso](#-uso) • [Estrutura](#-estrutura-do-projeto) • [Roadmap](#-roadmap) • [Changelog](#-changelog) • [Suporte](#-suporte)

</div>

---

## 📋 Sobre o Projeto

O **Sistema NR-13** é uma aplicação web moderna desenvolvida em React.js para facilitar a criação, gerenciamento e geração de relatórios técnicos de inspeção de vasos de pressão, totalmente alinhada com as exigências da **Norma Regulamentadora 13 (NR-13)** do Ministério do Trabalho e Emprego.

### 🎯 Objetivo

Automatizar e padronizar o processo de elaboração de relatórios de inspeção, reduzindo erros, economizando tempo e garantindo conformidade com a legislação vigente.

---

## ✨ Características

### 📝 Formulários Completos (16 Abas)

1. **Resumo do Relatório**: Dados principais do equipamento e inspeção
2. **Dados do Contratante**: Integração com APIs (IBGE, ViaCEP, ReceitaWS) para preenchimento automático
3. **Responsabilidades**: Informações do PLH (Profissional Legalmente Habilitado)
4. **Referências Normativas**: Documentação técnica de referência
5. **Informações do Vaso**: Dados operacionais, características construtivas e classificação NR-13
6. **Exame da Documentação**: Verificação de prontuário, registros e certificados
7. **Informações Relevantes do Relatório Anterior**: Histórico de inspeções anteriores
8. **Instalações**: Verificação das instalações do equipamento
9. **Exame Externo**: Registro fotográfico e dados dos instrumentos
10. **Exame Interno**: Observações e documentação fotográfica
11. **Ensaios Realizados**: Medição de espessura e testes com pressão
12. **Recomendações**: Providências necessárias
13. **Conclusão**: Status do vaso e PMTA
14. **Próximas Inspeções**: Agendamento de inspeções periódicas
15. **Anexos**: Upload de documentos (PDF, DOC, DOCX)
16. **Termo de Inspeção**: Documento final com assinatura

### 🚀 Funcionalidades Principais

- ✅ **Geração de PDF**: Exportação automática para PDF formatado com numeração de páginas
- ✅ **Auto-save**: Salvamento automático com debounce de 2 segundos
- ✅ **Validação**: Validação de campos obrigatórios (CNPJ, CEP, CREA, datas, arquivos)
- ✅ **Upload de Imagens**: Suporte a múltiplas imagens com drag & drop e compressão automática
- ✅ **Upload de Documentos**: Anexos em PDF, DOC e DOCX com validação de tamanho
- ✅ **Integração com APIs**: 
  - IBGE (Estados e Municípios)
  - ViaCEP (Busca de endereço)
  - ReceitaWS/BrasilAPI (Consulta CNPJ)
- ✅ **Interface Intuitiva**: Design moderno e responsivo
- ✅ **Indicadores Visuais**: Progresso de preenchimento e indicadores de conteúdo nas abas
- ✅ **Toast Notifications**: Feedback visual para ações do usuário
- ✅ **Navegação por Abas**: 16 abas numeradas para fácil navegação
- ✅ **Barra de Progresso**: Indicador visual de conclusão do formulário

---

## 🛠️ Tecnologias Utilizadas

- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **Vite 7.3.1** - Build tool e dev server ultra-rápido
- **@react-pdf/renderer 4.3.2** - Geração de PDFs a partir de componentes React
- **CSS3** - Estilização moderna e responsiva

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/jenafree/sistema-nr13.git
cd sistema-nr13/sistema-nr13
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

---

## 🎮 Uso

### Fluxo Básico

1. **Preencha o Número do Relatório** no cabeçalho
2. **Navegue pelas abas** usando o menu superior (16 abas numeradas)
3. **Preencha os campos** de cada seção
4. **Anexe documentos e imagens** quando necessário
5. **Valide os campos obrigatórios** (indicados com *)
6. **Gere o PDF** clicando em "Gerar Relatório"

### Funcionalidades Especiais

#### Auto-save
O sistema salva automaticamente seus dados a cada 2 segundos no localStorage do navegador. Um indicador visual mostra quando os dados estão sendo salvos.

#### Salvar Rascunho
Exporte um arquivo JSON com todos os dados preenchidos para backup ou compartilhamento.

#### Limpar Formulário
Remove todos os dados preenchidos (com confirmação).

#### Validação
Antes de gerar o PDF, o sistema valida os campos obrigatórios e exibe avisos se necessário.

#### Compressão de Imagens
As imagens são automaticamente comprimidas antes do upload (máximo 1920x1080px, qualidade 80%).

#### Validação de Arquivos
- Imagens: máximo 5MB (JPEG, PNG, GIF)
- Documentos: máximo 10MB (PDF, DOC, DOCX)

---

## 📁 Estrutura do Projeto

```
sistema-nr13/
├── public/
│   └── logo-souza-aquino.svg
├── src/
│   ├── components/
│   │   ├── Anexos.jsx
│   │   ├── Conclusao.jsx
│   │   ├── DadosContratante.jsx
│   │   ├── EnsaiosRealizados.jsx
│   │   ├── ExameDocumentacao.jsx
│   │   ├── ExameExterno.jsx
│   │   ├── ExameInterno.jsx
│   │   ├── Formulario.jsx
│   │   ├── InformacoesRelatorioAnterior.jsx
│   │   ├── InformacoesVaso.jsx
│   │   ├── Instalacoes.jsx
│   │   ├── ProximasInspecoes.jsx
│   │   ├── Recomendacoes.jsx
│   │   ├── ReferenciasNormativas.jsx
│   │   ├── Responsabilidades.jsx
│   │   ├── TabContent.jsx
│   │   ├── TabsMenu.jsx
│   │   ├── TermoInspecao.jsx
│   │   └── Toast.jsx
│   ├── pdf/
│   │   └── RelatorioPDF.jsx
│   ├── styles/
│   │   ├── anexos.css
│   │   ├── conclusao.css
│   │   ├── ensaios-realizados.css
│   │   ├── exame-documentacao.css
│   │   ├── exame-externo.css
│   │   ├── exame-interno.css
│   │   ├── form.css
│   │   ├── informacoes-relatorio-anterior.css
│   │   ├── informacoes-vaso.css
│   │   ├── instalacoes.css
│   │   ├── proximas-inspecoes.css
│   │   ├── recomendacoes.css
│   │   ├── tabs.css
│   │   ├── termo-inspecao.css
│   │   └── toast.css
│   ├── utils/
│   │   ├── debounce.js
│   │   ├── imageCompression.js
│   │   └── validations.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção

# Preview
npm run preview      # Preview do build de produção

# Lint
npm run lint         # Executa ESLint
```

---

## 📊 Status do Projeto

✅ **Versão 1.0.0 - Estável**

### Funcionalidades Implementadas
- [x] Formulários completos de todas as 16 seções
- [x] Geração de PDF com numeração de páginas
- [x] Upload de imagens e documentos com validação
- [x] Integração com APIs externas (IBGE, ViaCEP, ReceitaWS, BrasilAPI)
- [x] Validação de campos (CNPJ, CEP, CREA, datas, arquivos)
- [x] Auto-save otimizado com debounce
- [x] Compressão automática de imagens
- [x] Interface responsiva
- [x] Indicadores visuais de progresso
- [x] Toast notifications
- [x] Termo de Inspeção com assinatura

### Próximas Melhorias
- [ ] Autenticação de usuários
- [ ] Banco de dados para armazenamento
- [ ] Histórico de relatórios
- [ ] Compartilhamento de relatórios
- [ ] Assinatura digital
- [ ] Dashboard de estatísticas
- [ ] Exportação para outros formatos (Excel, Word)
- [ ] Templates personalizáveis

---

## 🗺️ Roadmap

### ✅ Concluído (v1.0.0)
- Estrutura base do projeto (React + Vite)
- Header profissional com logo e número do relatório
- Sistema de 16 abas conforme sumário NR-13
- Formulários completos de todas as seções
- Upload de imagem com drag-and-drop e animação
- Auto-save automático (localStorage com debounce)
- Recuperação automática de dados ao recarregar
- Validação de campos obrigatórios
- Sistema de notificações Toast
- Indicadores visuais de abas preenchidas
- Barra de progresso global
- Botões principais: Gerar PDF, Salvar Rascunho, Limpar
- Geração de PDF profissional com layout NR-13
- Design responsivo (mobile + desktop)
- Integração com APIs externas
- Compressão automática de imagens
- Validação de arquivos

### 🔄 Em Desenvolvimento
- Melhorias de performance
- Otimizações de UX

### 📅 Planejado
- Autenticação e autorização
- Backend com banco de dados
- API RESTful
- Dashboard administrativo
- Sistema de templates
- Exportação para múltiplos formatos

> Para mais detalhes, consulte o arquivo [ROADMAP.md](./ROADMAP.md)

---

## 📝 Changelog

### [1.0.0] - 2026-02-17

#### ✨ Adicionado
- Interface completa com 16 abas
- Sistema de formulários completo
- Geração de PDF profissional
- Integração com APIs (IBGE, ViaCEP, ReceitaWS, BrasilAPI)
- Auto-save com debounce
- Validação de campos e arquivos
- Compressão automática de imagens
- Sistema de notificações Toast
- Indicadores visuais de progresso
- Upload de imagens e documentos
- Termo de Inspeção com assinatura

#### 🔧 Melhorado
- Performance do auto-save
- Validação de CNPJ, CEP e CREA
- Layout responsivo
- Experiência do usuário

#### 🐛 Corrigido
- Problemas de renderização no PDF
- Validação de arquivos
- Formatação de datas

> Para histórico completo, consulte o arquivo [CHANGELOG.md](./CHANGELOG.md)

---

## 🤝 Para Desenvolvedores

### Estrutura de Componentes

O projeto segue uma arquitetura baseada em componentes React:

- **App.jsx**: Componente principal, gerencia estado global e navegação
- **TabsMenu.jsx**: Menu de navegação entre abas
- **TabContent.jsx**: Renderiza o conteúdo da aba ativa
- **Componentes de Formulário**: Um componente para cada aba (ex: `DadosContratante.jsx`, `InformacoesVaso.jsx`)
- **RelatorioPDF.jsx**: Componente para geração do PDF
- **Toast.jsx**: Sistema de notificações

### Utilitários

- **validations.js**: Funções de validação (CNPJ, CEP, CREA, arquivos)
- **imageCompression.js**: Compressão de imagens antes do upload
- **debounce.js**: Função de debounce para otimização

### Estado Global

O estado do formulário é gerenciado no `App.jsx` através do `formData`, que contém todos os campos de todas as abas. O estado é persistido automaticamente no localStorage.

### Adicionando Novas Funcionalidades

1. Crie o componente na pasta `src/components/`
2. Adicione o componente em `TabContent.jsx`
3. Adicione a aba em `TabsMenu.jsx`
4. Atualize o estado inicial em `App.jsx`
5. Adicione os campos no PDF em `RelatorioPDF.jsx` (se necessário)

> Para mais informações técnicas, consulte o arquivo [HANDOFF.md](./HANDOFF.md)

---

## 🔒 Licença

Este projeto é proprietário. Todos os direitos reservados.

---

## 📞 Suporte

Para dúvidas, sugestões ou problemas:

- **Email**: suporte@jenafreelabs.com
- **Telefone**: (XX) XXXX-XXXX

---

## 👨‍💻 Desenvolvido por

**Neftali** e **Luiz Felipe**

**Jenafree Labs**

*Soluções em Engenharia e Consultoria Técnica*

---

## 📚 Documentação Adicional

- [ROADMAP.md](./ROADMAP.md) - Planejamento e roadmap do projeto
- [CHANGELOG.md](./CHANGELOG.md) - Histórico completo de mudanças
- [HANDOFF.md](./HANDOFF.md) - Guia para desenvolvedores
- [CONTRATO_LICENCA.md](./CONTRATO_LICENCA.md) - Contrato de licença de uso
- [PROPOSTA_COMERCIAL.md](./PROPOSTA_COMERCIAL.md) - Proposta comercial
- [APRESENTACAO_EXECUTIVA.md](./APRESENTACAO_EXECUTIVA.md) - Apresentação executiva
- [ANALISE_PRECIFICACAO.md](./ANALISE_PRECIFICACAO.md) - Análise de precificação
- [RECOMENDACOES.md](./RECOMENDACOES.md) - Recomendações de melhorias

---

<div align="center">

**Sistema NR-13** - Versão 1.0.0

*Facilitando a conformidade com a NR-13*

---

© 2024 Jenafree Labs. Todos os direitos reservados.

</div>
