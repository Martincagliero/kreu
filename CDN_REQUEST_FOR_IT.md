# CDN y Dominios Requeridos Para Krautermeister

**Fecha:** 17 de febrero de 2026  
**Proyecto:** Sitio web Krautermeister con visualización 3D interactiva

## Dominios que deben estar permitidos:

### 1. **CDN de JavaScript (CRÍTICO)**
- `cdn.jsdelivr.net` - Three.js, GSAP, Bootstrap
- `unpkg.com` - Librerías NPM alternativas
- `cdnjs.cloudflare.com` - CDN de Cloudflare

### 2. **Librerías Específicas Necesarias**
```
https://cdn.jsdelivr.net/npm/three@r128/build/three.min.js
https://cdn.jsdelivr.net/npm/three@r128/examples/js/loaders/GLTFLoader.js
https://cdn.jsdelivr.net/npm/three@r128/examples/js/loaders/DRACOLoader.js
https://cdn.jsdelivr.net/npm/gsap@3.14.0/dist/gsap.min.js
https://cdn.jsdelivr.net/npm/gsap@3.14.0/dist/ScrollTrigger.min.js
```

### 3. **Archivos DRACO (Descompresión de modelos 3D)**
```
https://cdn.jsdelivr.net/npm/three@r128/examples/js/libs/draco/draco_decoder.wasm
https://cdn.jsdelivr.net/npm/three@r128/examples/js/libs/draco/draco_wasm_wrapper.js
```

### 4. **GitHub (para descargas de código)**
- `raw.githubusercontent.com` - Archivos raw de GitHub
- `github.com` - Repositorio principal

### 5. **Verificación de Acceso**
Para verificar si están desbloqueados, ejecutar en PowerShell:
```powershell
# Test jsDelivr
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/three@r128/build/three.min.js" -Method Head

# Test DRACO WASM
Invoke-WebRequest "https://cdn.jsdelivr.net/npm/three@r128/examples/js/libs/draco/draco_decoder.wasm" -Method Head

# Test GitHub
Invoke-WebRequest "https://raw.githubusercontent.com/mrdoob/three.js/r128/build/three.min.js" -Method Head
```

## ¿Por qué se necesitan?

- **Three.js (r128):** Motor de renderizado 3D
- **GLTFLoader/DRACOLoader:** Cargan modelos .glb (bottle-v1.glb)
- **DRACO WASM:** Descomprime el modelo 3D (7.2 MB comprimidos → más cuando se descomprime)
- **GSAP:** Animaciones suaves y scroll triggers
- **GitHub:** Fuente alternativa si los CDNs no responden

## Archivo Alternativo

Si el IT no puede permitir estos CDNs, se puede usar:
- **WebGL puro** (botella renderizada sin dependencias): http://localhost:8000/webgl-bottle.html
- **Canvas 2D** (botella dibujada en 2D): http://localhost:8000/test3d.html

---

**Contacto IT:** "El proyecto Krautermeister necesita acceso a cdn.jsdelivr.net y raw.githubusercontent.com para cargar librerías de visualización 3D y animaciones. Por favor permitir estos dominios."
