#!/usr/bin/env python3
"""Optimize JPEG images to WebP"""

from PIL import Image
import os

jpg_files = [
    ('kreu1.jpg', 80),
    ('kreu2.jpg', 80),
    ('kreu4.jpg', 80),
    ('kreu5.jpeg', 75),  # More aggressive for this large file
]

print("Optimizando imagenes JPEG a WebP...\n")

for jpg_file, quality in jpg_files:
    if os.path.exists(jpg_file):
        img = Image.open(jpg_file)
        jpg_size = os.path.getsize(jpg_file) / 1024
        
        webp_path = jpg_file.replace('.jpg', '.webp').replace('.jpeg', '.webp')
        img.save(webp_path, 'WEBP', quality=quality, method=6)
        
        webp_size = os.path.getsize(webp_path) / 1024
        savings = ((jpg_size - webp_size) / jpg_size) * 100
        
        print(f"{jpg_file}:")
        print(f"  {jpg_size:.1f}KB -> {webp_size:.1f}KB ({savings:.1f}% ahorro)")
    else:
        print(f"ERROR: {jpg_file} no encontrado")

print("\nOptimizacion completada!")
