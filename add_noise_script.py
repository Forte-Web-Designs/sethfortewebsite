import os
import re

for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as fp:
                content = fp.read()
            
            if 'luxury-noise.js' not in content:
                content = content.replace('</body>', '<script src="/luxury-noise.js"></script>\n</body>')

            with open(filepath, 'w') as fp:
                fp.write(content)
