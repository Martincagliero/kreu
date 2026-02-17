#!/usr/bin/env powershell
# Script para verificar acceso a CDNs necesarios
# Ejecutar con: powershell -ExecutionPolicy Bypass -File test-cdns.ps1

Write-Host "🔍 Verificando acceso a CDNs..." -ForegroundColor Cyan
Write-Host ""

$urls = @{
    "Three.js (jsDelivr)" = "https://cdn.jsdelivr.net/npm/three@r128/build/three.min.js"
    "GLTFLoader" = "https://cdn.jsdelivr.net/npm/three@r128/examples/js/loaders/GLTFLoader.js"
    "DRACO Decoder WASM" = "https://cdn.jsdelivr.net/npm/three@r128/examples/js/libs/draco/draco_decoder.wasm"
    "GSAP" = "https://cdn.jsdelivr.net/npm/gsap@3.14.0/dist/gsap.min.js"
    "Three.js (GitHub)" = "https://raw.githubusercontent.com/mrdoob/three.js/r128/build/three.min.js"
    "unpkg (alternativo)" = "https://unpkg.com/three@r128/build/three.min.js"
}

$results = @()

foreach ($name in $urls.Keys) {
    $url = $urls[$name]
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 5 -SkipHttpErrorCheck
        $status = $response.StatusCode
        
        if ($status -eq 200) {
            Write-Host "✅ $name" -ForegroundColor Green
            $results += @{Name=$name; Status="OK"; Code=$status}
        } else {
            Write-Host "⚠️  $name (HTTP $status)" -ForegroundColor Yellow
            $results += @{Name=$name; Status="HTTP $status"; Code=$status}
        }
    }
    catch {
        Write-Host "❌ $name (Bloqueado o error)" -ForegroundColor Red
        $results += @{Name=$name; Status="BLOQUEADO"; Code="ERR"}
    }
}

Write-Host ""
Write-Host "=" * 60
Write-Host "RESUMEN:"
Write-Host "=" * 60

$ok = ($results | Where-Object {$_.Status -eq "OK"}).Count
$total = $results.Count

Write-Host "✅ Accesibles: $ok/$total" -ForegroundColor Green

if ($ok -eq $total) {
    Write-Host ""
    Write-Host "🎉 ¡Todos los CDNs están disponibles! Ejecutar:" -ForegroundColor Green
    Write-Host "cd C:\Users\Marti\OneDrive\Documentos\kreu" -ForegroundColor Cyan
    Write-Host "python -m http.server 8000" -ForegroundColor Cyan
    Write-Host "Luego abrir: http://localhost:8000" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "⚠️  Algunos CDNs están bloqueados. Dominios a permitir:" -ForegroundColor Yellow
    Write-Host "  - cdn.jsdelivr.net" -ForegroundColor Yellow
    Write-Host "  - raw.githubusercontent.com" -ForegroundColor Yellow
    Write-Host "  - unpkg.com" -ForegroundColor Yellow
}
