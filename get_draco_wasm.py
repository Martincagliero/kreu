import urllib.request
import sys

# URLs para descargar los archivos DRACO WASM
urls = {
    'draco_decoder_gltf.wasm': 'https://unpkg.com/three@r128/examples/js/libs/draco/draco_decoder_gltf.wasm',
    'draco_wasm_wrapper.js': 'https://unpkg.com/three@r128/examples/js/libs/draco/draco_wasm_wrapper.js',
}

for filename, url in urls.items():
    try:
        print(f'📥 Descargando {filename} desde {url.split("/")[-2]}...')
        request = urllib.request.Request(url)
        request.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
        
        with urllib.request.urlopen(request, timeout=15) as response:
            with open(filename, 'wb') as out:
                data = response.read()
                out.write(data)
        
        size_kb = len(data) / 1024
        print(f'✅ {filename} ({size_kb:.1f} KB)')
    except Exception as e:
        print(f'❌ {filename}: {type(e).__name__}')

print('\n✅ Archivos listos' if all(True for _ in urls) else '\n⚠️ Algunos archivos fallaron')
