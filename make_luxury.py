import os
import re

# The new minified luxury root format
new_root = ":root { --text-primary: #FAF8F5; --text-secondary: #9E9EA7; --text-muted: #6B6B76; --accent: #C9A84C; --accent-hover: #D8B75B; --accent-warm: #E2C77D; --background: #0D0D12; --background-alt: #16161E; --border: rgba(201,168,76,0.15); --border-light: rgba(201,168,76,0.25); --radius-pill: 98px; --radius-md: 18px; }"

# Regex for the single-line version
regex_single = re.compile(r':root\s*\{\s*--text-primary:\s*#f0f4f8;.*?\}')

def p(s):
    print(s)

for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as fp:
                content = fp.read()
            
            # replace single line version
            if regex_single.search(content):
                content = regex_single.sub(new_root, content)
            else:
                # Need to replace multiline version
                # Usually it looks like:
                # :root {
                #     --text-primary: ...
                # }
                content = re.sub(r':root\s*\{[\s\S]*?--radius-md:\s*12px;\s*\}', new_root, content)

            with open(filepath, 'w') as fp:
                fp.write(content)
                
print("Done!")
