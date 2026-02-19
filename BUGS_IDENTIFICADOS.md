# 🐛 Bugs e Problemas Identificados no Relatório NR-13

## 📋 Análise do PDF: `relatorio_nr13 (4).pdf`

### 🔴 **BUGS CRÍTICOS**

#### 1. **PMTA com Valor Absurdo**
**Problema:** `3572354 kgf/cm²`
- **Impacto:** Valor completamente irreal para um vaso de pressão
- **Valores típicos:** 1-50 kgf/cm² para a maioria dos vasos
- **Causa:** Falta de validação numérica no campo PMTA
- **Localização:** `src/pdf/RelatorioPDF.jsx:367-370`

**Solução Necessária:**
```javascript
// Adicionar validação no formulário
const validatePMTA = (value) => {
  const num = parseFloat(value);
  if (isNaN(num) || num < 0 || num > 1000) {
    return false; // Valor inválido
  }
  return true;
};
```

---

#### 2. **Termo de Inspeção com Texto de Teste**
**Problema:** Texto "SASASA" no termo de inspeção
- **Impacto:** Relatório não profissional, dados inválidos
- **Causa:** Falta de validação de conteúdo mínimo
- **Localização:** `src/pdf/RelatorioPDF.jsx:403`

**Solução Necessária:**
- Validar comprimento mínimo do texto
- Alertar usuário se texto parecer ser placeholder

---

#### 3. **CNPJ e CREA Sem Formatação**
**Problema:** 
- CNPJ: `41.584.176/0001-15` (OK, mas pode ter problemas)
- CREA: `2515060` (sem formatação, pode estar concatenado com CNPJ)

**Impacto:** Dificulta leitura e pode causar confusão

**Solução Necessária:**
- Formatar CNPJ automaticamente: `XX.XXX.XXX/XXXX-XX`
- Formatar CREA: `XXXXXX-D` ou `XX.XXX-X`
- Validar formato antes de salvar

---

### ⚠️ **PROBLEMAS DE VALIDAÇÃO**

#### 4. **Falta de Validação de Datas Futuras**
**Problema:** Data "18 de fevereiro de 2026" (futura)
- **Impacto:** Relatórios com datas inválidas
- **Causa:** Não há validação de data máxima

**Solução:**
```javascript
const validateDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date <= today;
};
```

---

#### 5. **Ano de Fabricação Sem Validação**
**Problema:** Ano pode ser futuro ou muito antigo
- **Valores esperados:** 1900 - ano atual
- **Causa:** Campo aceita qualquer valor

---

#### 6. **Número de Série Sem Validação**
**Problema:** Pode aceitar valores inválidos ou muito longos
- **Exemplo no PDF:** `135u24524523` (parece válido, mas sem padrão)

---

### 🔵 **PROBLEMAS DE FORMATAÇÃO**

#### 7. **PMTA Sem Formatação Numérica**
**Problema:** Aceita qualquer texto, não apenas números
- **Código atual:** `{dados.pmta ? `${dados.pmta} kgf/cm²` : "-"}`
- **Solução:** Formatar como número com 2 casas decimais

```javascript
const formatPMTA = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "-";
  return `${num.toFixed(2)} kgf/cm²`;
};
```

---

#### 8. **CEP Sem Formatação**
**Problema:** CEP pode estar sem formatação
- **Exemplo:** `75053-290` (OK, mas pode vir sem hífen)
- **Solução:** Formatar automaticamente: `XXXXX-XXX`

---

### 🟡 **PROBLEMAS DE UX/UI**

#### 9. **Falta de Feedback Visual para Valores Inválidos**
**Problema:** Usuário não sabe que PMTA está incorreta até gerar PDF
- **Solução:** Validação em tempo real com mensagens de erro

---

#### 10. **Falta de Máscaras de Input**
**Problema:** Campos como CNPJ, CEP, CREA não têm máscara
- **Solução:** Implementar máscaras de input

---

### 📝 **PROBLEMAS DE DADOS**

#### 11. **Campos Obrigatórios Não Validados**
**Problema:** PDF pode ser gerado com campos vazios
- **Campos críticos:** Número do Relatório, Equipamento, PMTA
- **Solução:** Validação antes de gerar PDF

---

#### 12. **Imagem do Equipamento Pode Falhar**
**Problema:** Se URL da imagem for inválida, PDF pode quebrar
- **Localização:** `src/pdf/RelatorioPDF.jsx:321-330`
- **Solução:** Tratamento de erro para imagens

---

## 🔧 **CORREÇÕES RECOMENDADAS**

### Prioridade ALTA:
1. ✅ Adicionar validação numérica para PMTA (0-1000 kgf/cm²)
2. ✅ Formatar PMTA com 2 casas decimais
3. ✅ Validar datas (não permitir futuras)
4. ✅ Validar campos obrigatórios antes de gerar PDF

### Prioridade MÉDIA:
5. ✅ Adicionar máscaras para CNPJ, CEP, CREA
6. ✅ Formatar automaticamente CNPJ e CREA
7. ✅ Validar comprimento mínimo do termo de inspeção
8. ✅ Tratamento de erro para imagens

### Prioridade BAIXA:
9. ✅ Feedback visual para campos inválidos
10. ✅ Validação de ano de fabricação
11. ✅ Padrão para número de série

---

## 📊 **RESUMO**

- **Bugs Críticos:** 3
- **Problemas de Validação:** 3
- **Problemas de Formatação:** 2
- **Problemas de UX/UI:** 2
- **Problemas de Dados:** 2

**Total:** 12 problemas identificados

---

## 🎯 **PRÓXIMOS PASSOS**

1. Implementar validações críticas
2. Adicionar formatação automática
3. Melhorar feedback ao usuário
4. Testar com dados reais

