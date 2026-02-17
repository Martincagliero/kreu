import urllib.request
import os

urls = {
    'draco_decoder_gltf.wasm': 'https://github.com/mrdoob/three.js/raw/r128/examples/js/libs/draco/draco_decoder_gltf.wasm',
    'draco_wasm_wrapper.js': 'https://raw.githubusercontent.com/mrdoob/three.js/r128/examples/js/libs/draco/draco_wasm_wrapper.js'
}

for filename, url in urls.items():
    try:
        print(f"Descargando {filename}...")
        urllib.request.urlretrieve(url, filename)
        size = os.path.getsize(filename)
        print(f"✅ {filename} ({size} bytes)")
    except Exception as e:
        print(f"❌ {filename}: {e}")
