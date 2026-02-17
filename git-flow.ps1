# Git Flow Automático - Sistema NR-13
# Script PowerShell para Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   GIT FLOW AUTOMATICO - Sistema NR-13" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos em um repositório Git
if (-not (Test-Path .git)) {
    Write-Host "[ERRO] Este diretório não é um repositório Git!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Obter o nome da branch atual
$CURRENT_BRANCH = git rev-parse --abbrev-ref HEAD
Write-Host "[INFO] Branch atual: $CURRENT_BRANCH" -ForegroundColor Yellow
Write-Host ""

# Verificar se há mudanças não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "[AVISO] Há mudanças não commitadas!" -ForegroundColor Yellow
    Write-Host ""
    $commitChanges = Read-Host "Deseja commitar as mudanças? (S/N)"
    
    if ($commitChanges -eq "S" -or $commitChanges -eq "s") {
        Write-Host ""
        $commitMsg = Read-Host "Digite a mensagem do commit (ou Enter para usar padrão)"
        if ([string]::IsNullOrWhiteSpace($commitMsg)) {
            $commitMsg = "chore: atualizações automáticas"
        }
        Write-Host ""
        Write-Host "[INFO] Adicionando arquivos..." -ForegroundColor Yellow
        git add .
        Write-Host "[INFO] Fazendo commit..." -ForegroundColor Yellow
        git commit -m $commitMsg
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[ERRO] Falha ao fazer commit!" -ForegroundColor Red
            Read-Host "Pressione Enter para sair"
            exit 1
        }
        Write-Host "[OK] Commit realizado!" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "[INFO] Pulando commit. Continuando..." -ForegroundColor Yellow
        Write-Host ""
    }
}

# Passo 1: Atualizar repositório local com remoto
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Passo 1: Atualizando com repositório remoto..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[INFO] Buscando atualizações do remoto..." -ForegroundColor Yellow
git fetch origin
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha ao buscar do repositório remoto!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se há atualizações
$localCommit = git rev-parse HEAD
$remoteCommit = git rev-parse "origin/$CURRENT_BRANCH" 2>$null

if ($localCommit -ne $remoteCommit) {
    Write-Host "[INFO] Há atualizações no repositório remoto." -ForegroundColor Yellow
    Write-Host "[INFO] Fazendo pull..." -ForegroundColor Yellow
    git pull origin $CURRENT_BRANCH
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERRO] Falha ao fazer pull! Pode haver conflitos." -ForegroundColor Red
        Write-Host "[INFO] Resolva os conflitos manualmente e execute novamente." -ForegroundColor Yellow
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    Write-Host "[OK] Pull realizado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "[INFO] Nenhuma atualização no repositório remoto." -ForegroundColor Green
}
Write-Host ""

# Passo 2: Subir atualizações locais
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Passo 2: Subindo atualizações locais..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[INFO] Fazendo push..." -ForegroundColor Yellow
git push origin $CURRENT_BRANCH
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERRO] Falha ao fazer push!" -ForegroundColor Red
    Write-Host "[INFO] Verifique se você tem permissão ou se há conflitos." -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}
Write-Host "[OK] Push realizado com sucesso!" -ForegroundColor Green
Write-Host ""

# Passo 3: Merge para main (se não estiver na main)
if ($CURRENT_BRANCH -ne "main") {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Passo 3: Fazendo merge para main..." -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "[INFO] Você está na branch: $CURRENT_BRANCH" -ForegroundColor Yellow
    $doMerge = Read-Host "Deseja fazer merge para main? (S/N)"
    
    if ($doMerge -eq "S" -or $doMerge -eq "s") {
        Write-Host ""
        Write-Host "[INFO] Mudando para branch main..." -ForegroundColor Yellow
        git checkout main
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[ERRO] Falha ao mudar para branch main!" -ForegroundColor Red
            Read-Host "Pressione Enter para sair"
            exit 1
        }
        
        Write-Host "[INFO] Atualizando main..." -ForegroundColor Yellow
        git pull origin main
        
        Write-Host "[INFO] Fazendo merge de $CURRENT_BRANCH para main..." -ForegroundColor Yellow
        git merge $CURRENT_BRANCH --no-edit
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[ERRO] Falha ao fazer merge! Pode haver conflitos." -ForegroundColor Red
            Write-Host "[INFO] Resolva os conflitos manualmente." -ForegroundColor Yellow
            Read-Host "Pressione Enter para sair"
            exit 1
        }
        
        Write-Host "[INFO] Fazendo push da main..." -ForegroundColor Yellow
        git push origin main
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[ERRO] Falha ao fazer push da main!" -ForegroundColor Red
            Read-Host "Pressione Enter para sair"
            exit 1
        }
        
        Write-Host "[OK] Merge realizado com sucesso!" -ForegroundColor Green
        Write-Host ""
        Write-Host "[INFO] Voltando para branch $CURRENT_BRANCH..." -ForegroundColor Yellow
        git checkout $CURRENT_BRANCH
    } else {
        Write-Host "[INFO] Merge cancelado pelo usuário." -ForegroundColor Yellow
    }
} else {
    Write-Host "[INFO] Você já está na branch main. Nenhum merge necessário." -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   FLUXO GIT CONCLUIDO COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Pressione Enter para sair"

