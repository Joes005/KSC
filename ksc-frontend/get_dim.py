import struct
def get_image_info(filepath):
    with open(filepath, 'rb') as f:
        data = f.read(24)
        if data[:2] == b'\xff\xd8':
            # JPEG
            f.seek(0)
            data = f.read()
            i = 2
            while i < len(data):
                b = data[i]
                if b != 0xFF: break
                code = data[i+1]
                i += 2
                if code >= 0xC0 and code <= 0xC3:
                    h, w = struct.unpack(">HH", data[i+3:i+7])
                    return f"JPEG {w}x{h}"
                else:
                    length = struct.unpack(">H", data[i:i+2])[0]
                    i += length
            return "JPEG unknown"
print(get_image_info('public/logo.jpg'))
