# Sistema NR-13 - Gerenciamento de Relatorios de Inspecao

Sistema completo para geracao de relatorios tecnicos de inspecao de vasos de pressao conforme NR-13.

## Sobre o Projeto

O Sistema NR-13 e uma aplicacao web moderna desenvolvida em React.js para facilitar a criacao, gerenciamento e geracao de relatorios tecnicos de inspecao de vasos de pressao, totalmente alinhada com as exigencias da Norma Regulamentadora 13 (NR-13) do Ministerio do Trabalho e Emprego.

### Objetivo

Automatizar e padronizar o processo de elaboracao de relatorios de inspecao, reduzindo erros, economizando tempo e garantindo conformidade com a legislacao vigente.

## Caracteristicas

### Formularios Completos
- Resumo do Relatorio: Dados principais do equipamento e inspecao
- Dados do Contratante: Integracao com APIs (IBGE, ViaCEP, ReceitaWS) para preenchimento automatico
- Responsabilidades: Informacoes do PLH (Profissional Legalmente Habilitado)
- Informacoes do Vaso: Dados operacionais, caracteristicas construtivas e classificacao NR-13
- Exame da Documentacao: Verificacao de prontuario, registros e certificados
- Exame Externo: Registro fotografico e dados dos instrumentos
- Exame Interno: Observacoes e documentacao fotografica
- Ensaios Realizados: Medicao de espessura e testes com pressao
- Recomendacoes: Providencias necessarias
- Conclusao: Status do vaso e PMTA
- Proximas Inspecoes: Agendamento de inspecoes periodicas
- Anexos: Upload de documentos (PDF, DOC, DOCX)

### Funcionalidades Principais

- Geracao de PDF: Exportacao automatica para PDF formatado
- Auto-save: Salvamento automatico a cada segundo
- Validacao: Validacao de campos obrigatorios
- Upload de Imagens: Suporte a multiplas imagens com drag & drop
- Upload de Documentos: Anexos em PDF, DOC e DOCX
- Integracao com APIs: 
  - IBGE (Estados e Municipios)
  - ViaCEP (Busca de endereco)
  - ReceitaWS/BrasilAPI (Consulta CNPJ)
- Interface Intuitiva: Design moderno e responsivo
- Indicadores Visuais: Progresso de preenchimento e indicadores de conteudo
- Toast Notifications: Feedback visual para acoes do usuario

## Tecnologias Utilizadas

- React 19.2.0 - Biblioteca JavaScript para construcao de interfaces
- Vite 7.3.1 - Build tool e dev server ultra-rapido
- @react-pdf/renderer 4.3.2 - Geracao de PDFs a partir de componentes React
- CSS3 - Estilizacao moderna e responsiva

## Instalacao

### Pre-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passos

1. Clone o repositorio
```bash
git clone <url-do-repositorio>
cd sistema-nr13
```

2. Instale as dependencias
```bash
npm install
```

3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

4. Acesse no navegador
```
http://localhost:5173
```

## Uso

### Fluxo Basico

1. Preencha o Numero do Relatorio no cabecalho
2. Navegue pelas abas usando o menu superior
3. Preencha os campos de cada secao
4. Anexe documentos e imagens quando necessario
5. Valide os campos obrigatorios (indicados com *)
6. Gere o PDF clicando em "Gerar Relatorio"

### Funcionalidades Especiais

#### Auto-save
O sistema salva automaticamente seus dados a cada segundo no localStorage do navegador.

#### Salvar Rascunho
Exporte um arquivo JSON com todos os dados preenchidos para backup ou compartilhamento.

#### Limpar Formulario
Remove todos os dados preenchidos (com confirmacao).

#### Validacao
Antes de gerar o PDF, o sistema valida os campos obrigatorios e exibe avisos se necessario.

## Estrutura do Projeto

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

## Scripts Disponiveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de producao

# Preview
npm run preview      # Preview do build de producao

# Lint
npm run lint         # Executa ESLint
```

## Status do Projeto

Versao 1.0.0 - Estavel

### Funcionalidades Implementadas
- [x] Formularios completos de todas as secoes
- [x] Geracao de PDF
- [x] Upload de imagens e documentos
- [x] Integracao com APIs externas
- [x] Validacao de campos
- [x] Auto-save
- [x] Interface responsiva

### Proximas Melhorias
- [ ] Autenticacao de usuarios
- [ ] Banco de dados para armazenamento
- [ ] Historico de relatorios
- [ ] Compartilhamento de relatorios
- [ ] Assinatura digital
- [ ] Dashboard de estatisticas

## Contribuindo

Este e um projeto proprietario. Para sugestoes ou melhorias, entre em contato com a equipe de desenvolvimento.

## Licenca

Este projeto e proprietario. Todos os direitos reservados.

## Suporte

Para duvidas, sugestoes ou problemas:

- Email: suporte@souzaaquino.com.br
- Telefone: (XX) XXXX-XXXX

## Desenvolvido por

SOUZA&AQUINO Engenharia

Solucoes em Engenharia e Consultoria Tecnica

---

Sistema NR-13 - Versao 1.0.0

Facilitando a conformidade com a NR-13

