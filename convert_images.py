#!/usr/bin/env python3
"""Convert PNG botanical images to WebP for optimization"""

from PIL import Image
import os

img_dir = 'img'
png_files = [
    'anis-estrellado.png',
    'clavo-olor.png',
    'hierba-menta.png',
    'manzanilla.png',
    'piel-naranja-limon.png',
    'regaliz.png'
]

print("Convirtiendo imagenes PNG a WebP...\n")

for png_file in png_files:
    png_path = os.path.join(img_dir, png_file)
    webp_path = os.path.join(img_dir, png_file.replace('.png', '.webp'))
    
    if os.path.exists(png_path):
        img = Image.open(png_path)
        png_size = os.path.getsize(png_path) / 1024
        img.save(webp_path, 'WEBP', quality=85, method=6)
        webp_size = os.path.getsize(webp_path) / 1024
        savings = ((png_size - webp_size) / png_size) * 100
        print(f"{png_file}:")
        print(f"  {png_size:.1f}KB -> {webp_size:.1f}KB ({savings:.1f}% ahorro)")
    else:
        print(f"ERROR: {png_path} no encontrado")

print("\nConversion completada!")
