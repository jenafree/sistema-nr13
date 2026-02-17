# 🚀 Git Flow Automático - Sistema NR-13

Scripts para automatizar o fluxo Git: atualizar, subir mudanças e fazer merge.

## 📋 O que os scripts fazem:

1. ✅ **Verifica mudanças não commitadas** - Pergunta se quer commitar
2. ✅ **Atualiza repositório local** - Faz `git pull` do remoto
3. ✅ **Sobe atualizações locais** - Faz `git push` para o remoto
4. ✅ **Faz merge para main** - (Opcional) Merge da branch atual para main

---

## 🎯 Como usar:

### **Opção 1: Script PowerShell (Recomendado)**

```bash
npm run git:flow
```

Ou diretamente:
```powershell
powershell -ExecutionPolicy Bypass -File ./git-flow.ps1
```

### **Opção 2: Script Batch (.bat)**

```bash
npm run git:flow:bat
```

Ou diretamente:
```cmd
git-flow.bat
```

Ou simplesmente dê duplo clique no arquivo `git-flow.bat`

---

## 📝 Fluxo passo a passo:

### **1. Verificação de mudanças**
- Se houver arquivos modificados, pergunta se quer commitar
- Se escolher "S", pede mensagem do commit
- Se não informar mensagem, usa: `"chore: atualizações automáticas"`

### **2. Atualização do remoto**
- Faz `git fetch origin`
- Verifica se há atualizações
- Se houver, faz `git pull origin [branch-atual]`
- Se houver conflitos, para e pede resolução manual

### **3. Push das mudanças**
- Faz `git push origin [branch-atual]`
- Se falhar, mostra erro e para

### **4. Merge para main (Opcional)**
- Se NÃO estiver na branch `main`:
  - Pergunta se quer fazer merge
  - Se "S":
    - Muda para `main`
    - Atualiza `main` com `git pull`
    - Faz merge da branch atual
    - Faz push da `main`
    - Volta para a branch original

---

## ⚠️ Importante:

- **Sempre resolva conflitos manualmente** se aparecerem
- **Verifique as mudanças** antes de fazer merge
- **Use mensagens de commit descritivas** quando possível
- **O script não força nada** - sempre pergunta antes de ações importantes

---

## 🔧 Personalização:

### Mudar mensagem padrão do commit:
Edite o arquivo `git-flow.ps1` ou `git-flow.bat` e altere:
```powershell
$commitMsg = "chore: atualizações automáticas"
```

### Mudar branch padrão (se não for "main"):
Edite o arquivo e altere todas as referências de `main` para sua branch padrão.

---

## 🐛 Troubleshooting:

### Erro: "Execution Policy"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Erro: "Não é um repositório Git"
- Certifique-se de estar na pasta raiz do projeto
- Execute `git init` se necessário

### Erro: "Falha ao fazer pull"
- Pode haver conflitos
- Resolva manualmente: `git pull` e resolva os conflitos
- Depois execute o script novamente

---

## 📚 Exemplos de uso:

### Fluxo completo (com commit):
```bash
npm run git:flow
# Responde "S" para commitar
# Digita mensagem: "feat: adiciona busca de cidade por CNPJ"
# Responde "S" para fazer merge
```

### Apenas atualizar e subir (sem commit):
```bash
npm run git:flow
# Responde "N" para não commitar
# Responde "N" para não fazer merge
```

---

## 🎨 Cores no PowerShell:

- **Cyan**: Títulos e seções
- **Yellow**: Informações e avisos
- **Green**: Sucesso
- **Red**: Erros

---

**Desenvolvido para facilitar o workflow Git do Sistema NR-13** 🚀

