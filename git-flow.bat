@echo off
echo ========================================
echo    GIT FLOW AUTOMATICO - Sistema NR-13
echo ========================================
echo.

REM Verificar se estamos em um repositório Git
git rev-parse --git-dir >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Este diretorio nao e um repositorio Git!
    pause
    exit /b 1
)

REM Obter o nome da branch atual
for /f "tokens=*" %%i in ('git rev-parse --abbrev-ref HEAD') do set CURRENT_BRANCH=%%i
echo [INFO] Branch atual: %CURRENT_BRANCH%
echo.

REM Verificar se há mudanças não commitadas
git diff --quiet
if %errorlevel% neq 0 (
    echo [AVISO] Ha mudancas nao commitadas!
    echo.
    echo Deseja commitar as mudancas? (S/N)
    set /p COMMIT_CHANGES=
    if /i "%COMMIT_CHANGES%"=="S" (
        echo.
        echo Digite a mensagem do commit:
        set /p COMMIT_MSG=
        if "%COMMIT_MSG%"=="" (
            set COMMIT_MSG=chore: atualizacoes automaticas
        )
        echo.
        echo [INFO] Adicionando arquivos...
        git add .
        echo [INFO] Fazendo commit...
        git commit -m "%COMMIT_MSG%"
        echo [OK] Commit realizado!
        echo.
    ) else (
        echo [INFO] Pulando commit. Continuando...
        echo.
    )
)

REM Passo 1: Atualizar repositório local com remoto
echo ========================================
echo Passo 1: Atualizando com repositorio remoto...
echo ========================================
echo.
git fetch origin
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao buscar do repositorio remoto!
    pause
    exit /b 1
)

REM Verificar se há atualizações na branch remota
git diff HEAD origin/%CURRENT_BRANCH% >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Ha atualizacoes no repositorio remoto.
    echo [INFO] Fazendo pull...
    git pull origin %CURRENT_BRANCH%
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao fazer pull! Pode haver conflitos.
        echo [INFO] Resolva os conflitos manualmente e execute novamente.
        pause
        exit /b 1
    )
    echo [OK] Pull realizado com sucesso!
) else (
    echo [INFO] Nenhuma atualizacao no repositorio remoto.
)
echo.

REM Passo 2: Subir atualizações locais
echo ========================================
echo Passo 2: Subindo atualizacoes locais...
echo ========================================
echo.
git push origin %CURRENT_BRANCH%
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao fazer push!
    echo [INFO] Verifique se voce tem permissao ou se ha conflitos.
    pause
    exit /b 1
)
echo [OK] Push realizado com sucesso!
echo.

REM Passo 3: Merge para main (se não estiver na main)
if /i not "%CURRENT_BRANCH%"=="main" (
    echo ========================================
    echo Passo 3: Fazendo merge para main...
    echo ========================================
    echo.
    echo [INFO] Voce esta na branch: %CURRENT_BRANCH%
    echo [INFO] Deseja fazer merge para main? (S/N)
    set /p DO_MERGE=
    
    if /i "%DO_MERGE%"=="S" (
        echo.
        echo [INFO] Mudando para branch main...
        git checkout main
        if %errorlevel% neq 0 (
            echo [ERRO] Falha ao mudar para branch main!
            pause
            exit /b 1
        )
        
        echo [INFO] Atualizando main...
        git pull origin main
        
        echo [INFO] Fazendo merge de %CURRENT_BRANCH% para main...
        git merge %CURRENT_BRANCH% --no-edit
        if %errorlevel% neq 0 (
            echo [ERRO] Falha ao fazer merge! Pode haver conflitos.
            echo [INFO] Resolva os conflitos manualmente.
            pause
            exit /b 1
        )
        
        echo [INFO] Fazendo push da main...
        git push origin main
        if %errorlevel% neq 0 (
            echo [ERRO] Falha ao fazer push da main!
            pause
            exit /b 1
        )
        
        echo [OK] Merge realizado com sucesso!
        echo.
        echo [INFO] Voltando para branch %CURRENT_BRANCH%...
        git checkout %CURRENT_BRANCH%
    ) else (
        echo [INFO] Merge cancelado pelo usuario.
    )
) else (
    echo [INFO] Voce ja esta na branch main. Nenhum merge necessario.
)

echo.
echo ========================================
echo    FLUXO GIT CONCLUIDO COM SUCESSO!
echo ========================================
echo.
pause

