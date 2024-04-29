# Atualiza o sistema
Write-Host "Atualizando o sistema..."
Start-Process -Wait -FilePath "cmd.exe" -ArgumentList "/c", "schtasks /run /tn UpdateOrchestrator\Reboot"

# Instalação do Nginx
Write-Host "Instalando o Nginx..."
Invoke-WebRequest -Uri "http://nginx.org/download/nginx-1.21.2.zip" -OutFile "nginx.zip"
Expand-Archive -Path "nginx.zip" -DestinationPath "C:\nginx"
Remove-Item "nginx.zip"
# Adicione aqui os comandos adicionais para configurar o Nginx

# Instalação do Docker Desktop para Windows
Write-Host "Instalando o Docker Desktop para Windows..."
Invoke-WebRequest -Uri "https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe" -OutFile "Docker Desktop Installer.exe"
Start-Process -Wait -FilePath "Docker Desktop Installer.exe"
Remove-Item "Docker Desktop Installer.exe"

# Configuração das portas necessárias
Write-Host "Configurando as portas necessárias..."
New-NetFirewallRule -DisplayName "Nginx HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
