import os
import struct

def get_image_info(filepath):
    with open(filepath, 'rb') as f:
        data = f.read(24)
        if data[:8] == b'\x89PNG\r\n\x1a\n':
            w, h = struct.unpack('>II', data[16:24])
            return f"PNG {w}x{h}"
        elif data[:2] == b'\xff\xd8':
            return "JPEG"
        return "Unknown"

for f in os.listdir('public/assets/logo'):
    path = os.path.join('public/assets/logo', f)
    if os.path.isfile(path):
        print(f"{f}: {get_image_info(path)}")
