#!/usr/bin/env powershell
# Panel para enviar solicitud a IT
# Ejecutar: powershell -ExecutionPolicy Bypass -File SEND_TO_IT.ps1

Clear-Host

Write-Host "KRAUTERMEISTER - SOLICITUD A IT" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$projectDir = "c:\Users\Marti\OneDrive\Documentos\kreu"

Write-Host "ARCHIVOS LISTOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  [OK] CDN_REQUEST_FOR_IT.md (Documentacion tecnica)" -ForegroundColor Green
Write-Host "  [OK] test-cdns.ps1 (Script de verificacion)" -ForegroundColor Green
Write-Host "  [OK] IT_REQUEST_TEMPLATE.txt (Plantilla de email)" -ForegroundColor Green
Write-Host ""

Write-Host "OPCIONES:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  [1] Abrir carpeta con archivos (RECOMENDADO)" -ForegroundColor Green
Write-Host "  [2] Mostrar plantilla de email" -ForegroundColor Cyan
Write-Host "  [3] Copiar email al portapapeles" -ForegroundColor Cyan
Write-Host "  [0] Salir" -ForegroundColor DarkGray
Write-Host ""

$opcion = Read-Host "Elige opcion (0-3)"

switch ($opcion) {
    "1" {
        Write-Host ""
        Write-Host "Abriendo carpeta con archivos..." -ForegroundColor Green
        Start-Process explorer $projectDir
        Write-Host ""
        Write-Host "PASOS MANUALES:" -ForegroundColor Yellow
        Write-Host "1. Abrir cliente de email (Outlook, Gmail, etc)" -ForegroundColor Gray
        Write-Host "2. Nuevo email" -ForegroundColor Gray
        Write-Host "3. Para: IT@tuempresa.com (CAMBIAR EMAIL REAL)" -ForegroundColor Gray
        Write-Host "4. Asunto: URGENTE: Desbloquear CDNs para proyecto Krautermeister" -ForegroundColor Gray
        Write-Host "5. Cuerpo: Copiar de IT_REQUEST_TEMPLATE.txt" -ForegroundColor Gray
        Write-Host "6. Adjuntar: CDN_REQUEST_FOR_IT.md y test-cdns.ps1" -ForegroundColor Gray
        Write-Host "7. Enviar" -ForegroundColor Gray
        Write-Host ""
    }
    
    "2" {
        Write-Host ""
        Write-Host "PLANTILLA - COPIA ESTO EN TU EMAIL:" -ForegroundColor Yellow
        Write-Host ""
        
        $template = Get-Content (Join-Path $projectDir "IT_REQUEST_TEMPLATE.txt") -Raw
        Write-Host $template
        Write-Host ""
    }
    
    "3" {
        Write-Host ""
        Write-Host "Copiando al portapapeles..." -ForegroundColor Green
        $content = Get-Content (Join-Path $projectDir "IT_REQUEST_TEMPLATE.txt") -Raw
        $content | Set-Clipboard
        Write-Host "Copiado. Abre tu email y pega." -ForegroundColor Green
        Write-Host ""
    }
    
    "0" {
        Write-Host "Saliendo..." -ForegroundColor Gray
        exit
    }
    
    default {
        Write-Host "Opcion invalida" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "SIGUIENTE: Espera respuesta de IT" -ForegroundColor Yellow
Write-Host "VERIFICAR: powershell -ExecutionPolicy Bypass -File test-cdns.ps1" -ForegroundColor Cyan
Write-Host ""
