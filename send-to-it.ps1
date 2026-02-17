#!/usr/bin/env powershell
# Script para enviar solicitud a IT automáticamente
# Abre Outlook con el email pre-llenado

$emailTo = "IT@tuempresa.com"  # CAMBIAR CON EMAIL REAL DEL IT
$subject = "URGENTE: Desbloquear CDNs para proyecto Krautermeister"
$body = @"
Estimado equipo IT,

Solicito desbloquear urgentemente los siguientes dominios para el proyecto web Krautermeister (visualización 3D interactiva):

DOMINIOS CRÍTICOS A PERMITIR:
✓ cdn.jsdelivr.net
✓ raw.githubusercontent.com  
✓ unpkg.com (alternativa)

LIBRERÍAS QUE SE CARGAN:
- Three.js v128 (motor 3D)
- GLTFLoader + DRACOLoader (modelos 3D)
- GSAP v3.14.0 (animaciones)

JUSTIFICACIÓN:
El proyecto requiere visualizar un producto en 3D con animaciones interactivas. Sin estos CDNs, la página no funciona.

VERIFICACIÓN:
Ejecutar: powershell -ExecutionPolicy Bypass -File test-cdns.ps1

DOCUMENTACIÓN ADJUNTA:
- CDN_REQUEST_FOR_IT.md (detalles técnicos)
- test-cdns.ps1 (script de verificación)

CONTACTO:
Proyecto: https://github.com/Martincagliero/kreu
Ubicación: c:\Users\Marti\OneDrive\Documentos\kreu

Gracias,
Martín Cagliero
"@

# Ruta de los archivos adjuntos
$attachments = @(
    "c:\Users\Marti\OneDrive\Documentos\kreu\CDN_REQUEST_FOR_IT.md",
    "c:\Users\Marti\OneDrive\Documentos\kreu\test-cdns.ps1"
)

# URL encode del email
$bodyEncoded = [System.Web.HttpUtility]::UrlEncode($body)
$subjectEncoded = [System.Web.HttpUtility]::UrlEncode($subject)

# Intenta abrir con Outlook
try {
    Write-Host "📧 Abriendo Outlook..." -ForegroundColor Cyan
    
    # Crear objeto Outlook
    $outlook = New-Object -ComObject Outlook.Application
    $mailItem = $outlook.CreateItem(0)
    
    # Llenar el email
    $mailItem.To = $emailTo
    $mailItem.Subject = $subject
    $mailItem.Body = $body
    
    # Adjuntar archivos
    foreach ($file in $attachments) {
        if (Test-Path $file) {
            $mailItem.Attachments.Add($file) | Out-Null
            Write-Host "✅ Adjuntado: $(Split-Path $file -Leaf)" -ForegroundColor Green
        }
    }
    
    # Mostrar el email (para que el usuario lo revise antes de enviar)
    $mailItem.Display()
    Write-Host "✅ Email abierto en Outlook. Revisa y envía manualmente." -ForegroundColor Green
    
} catch {
    Write-Host "⚠️  No se pudo abrir Outlook automáticamente." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "ALTERNATIVA - Copia esto en tu email:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Para: $emailTo" -ForegroundColor Yellow
    Write-Host "Asunto: $subject" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Cuerpo:" -ForegroundColor Yellow
    Write-Host $body
    Write-Host ""
    Write-Host "Adjuntos:" -ForegroundColor Yellow
    foreach ($file in $attachments) {
        Write-Host "  - $(Split-Path $file -Leaf)"
    }
}

Write-Host ""
Write-Host "📌 IMPORTANTE: Reemplaza 'IT@tuempresa.com' con el email real del IT en este script" -ForegroundColor Magenta
