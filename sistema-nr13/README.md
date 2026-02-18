# Sistema NR-13 - Gerenciamento de Relatórios de Inspeção

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646cff.svg)

**Sistema completo para geração de relatórios técnicos de inspeção de vasos de pressão conforme NR-13**

[Características](#-características) • [Instalação](#-instalação) • [Uso](#-uso) • [Estrutura](#-estrutura-do-projeto) • [Suporte](#-suporte)

</div>

---

## 📋 Sobre o Projeto

O **Sistema NR-13** é uma aplicação web moderna desenvolvida em React.js para facilitar a criação, gerenciamento e geração de relatórios técnicos de inspeção de vasos de pressão, totalmente alinhada com as exigências da **Norma Regulamentadora 13 (NR-13)** do Ministério do Trabalho e Emprego.

### 🎯 Objetivo

Automatizar e padronizar o processo de elaboração de relatórios de inspeção, reduzindo erros, economizando tempo e garantindo conformidade com a legislação vigente.

---

## ✨ Características

### 📝 Formulários Completos
- **Resumo do Relatório**: Dados principais do equipamento e inspeção
- **Dados do Contratante**: Integração com APIs (IBGE, ViaCEP, ReceitaWS) para preenchimento automático
- **Responsabilidades**: Informações do PLH (Profissional Legalmente Habilitado)
- **Informações do Vaso**: Dados operacionais, características construtivas e classificação NR-13
- **Exame da Documentação**: Verificação de prontuário, registros e certificados
- **Exame Externo**: Registro fotográfico e dados dos instrumentos
- **Exame Interno**: Observações e documentação fotográfica
- **Ensaios Realizados**: Medição de espessura e testes com pressão
- **Recomendações**: Providências necessárias
- **Conclusão**: Status do vaso e PMTA
- **Próximas Inspeções**: Agendamento de inspeções periódicas
- **Anexos**: Upload de documentos (PDF, DOC, DOCX)

### 🚀 Funcionalidades Principais

- ✅ **Geração de PDF**: Exportação automática para PDF formatado
- ✅ **Auto-save**: Salvamento automático a cada segundo
- ✅ **Validação**: Validação de campos obrigatórios
- ✅ **Upload de Imagens**: Suporte a múltiplas imagens com drag & drop
- ✅ **Upload de Documentos**: Anexos em PDF, DOC e DOCX
- ✅ **Integração com APIs**: 
  - IBGE (Estados e Municípios)
  - ViaCEP (Busca de endereço)
  - ReceitaWS/BrasilAPI (Consulta CNPJ)
- ✅ **Interface Intuitiva**: Design moderno e responsivo
- ✅ **Indicadores Visuais**: Progresso de preenchimento e indicadores de conteúdo
- ✅ **Toast Notifications**: Feedback visual para ações do usuário

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
git clone <url-do-repositorio>
cd sistema-nr13
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
2. **Navegue pelas abas** usando o menu superior
3. **Preencha os campos** de cada seção
4. **Anexe documentos e imagens** quando necessário
5. **Valide os campos obrigatórios** (indicados com *)
6. **Gere o PDF** clicando em "Gerar Relatório"

### Funcionalidades Especiais

#### Auto-save
O sistema salva automaticamente seus dados a cada segundo no localStorage do navegador.

#### Salvar Rascunho
Exporte um arquivo JSON com todos os dados preenchidos para backup ou compartilhamento.

#### Limpar Formulário
Remove todos os dados preenchidos (com confirmação).

#### Validação
Antes de gerar o PDF, o sistema valida os campos obrigatórios e exibe avisos se necessário.

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
│   │   ├── Responsabilidades.jsx
│   │   ├── TabContent.jsx
│   │   ├── TabsMenu.jsx
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
│   │   └── toast.css
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
- [x] Formulários completos de todas as seções
- [x] Geração de PDF
- [x] Upload de imagens e documentos
- [x] Integração com APIs externas
- [x] Validação de campos
- [x] Auto-save
- [x] Interface responsiva

### Próximas Melhorias
- [ ] Autenticação de usuários
- [ ] Banco de dados para armazenamento
- [ ] Histórico de relatórios
- [ ] Compartilhamento de relatórios
- [ ] Assinatura digital
- [ ] Dashboard de estatísticas

---

## 🤝 Contribuindo

Este é um projeto proprietário. Para sugestões ou melhorias, entre em contato com a equipe de desenvolvimento.

---

## 📄 Licença

Este projeto é proprietário. Todos os direitos reservados.

---

## 📞 Suporte

Para dúvidas, sugestões ou problemas:

- **Email**: suporte@souzaaquino.com.br
- **Telefone**: (XX) XXXX-XXXX

---

## 👨‍💻 Desenvolvido por

**SOUZA&AQUINO Engenharia**

*Soluções em Engenharia e Consultoria Técnica*

---

<div align="center">

**Sistema NR-13** - Versão 1.0.0

*Facilitando a conformidade com a NR-13*

</div>
