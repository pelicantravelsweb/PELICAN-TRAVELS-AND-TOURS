from pathlib import Path

root = Path(r"c:\Users\user\PELICAN-TRAVELS-AND-TOURS")
file_exts = {'.js', '.jsx', '.ts', '.tsx', '.css', '.md', '.json'}

replacements = {
    'â€”': '—',
    'â€“': '–',
    'â€™': '’',
    'â€˜': '‘',
    'â€œ': '“',
    'â€': '”',
    'â€¢': '•',
    'âœ“': '✓',
    'âœ…': '…',
    'Â©': '©',
    'Â': '',
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ãª': 'ê',
    'Ã«': 'ë',
    'Ã¡': 'á',
    'Ã¢': 'â',
    'Ã£': 'ã',
    'Ã¤': 'ä',
    'Ã¥': 'å',
    'Ã¦': 'æ',
    'Ã§': 'ç',
    'Ã±': 'ñ',
    'Ã³': 'ó',
    'Ã´': 'ô',
    'Ãµ': 'õ',
    'Ã¶': 'ö',
    'Ãº': 'ú',
    'Ã¼': 'ü',
    'Ã½': 'ý',
    'Ã¿': 'ÿ',
    'Ã‰': 'É',
    'Ãˆ': 'È',
    'ÃŠ': 'Ê',
    'Ã‹': 'Ë',
    'ÃŒ': 'Ì',
    'Ã': 'Í',
    'ÃŽ': 'Î',
    'Ã¯': 'Ï',
    'Ã': 'Ð',
    'Ã‘': 'Ñ',
    'Ã’': 'Ò',
    'Ã“': 'Ó',
    'Ã”': 'Ô',
    'Ã•': 'Õ',
    'Ã–': 'Ö',
    'Ã˜': 'Ø',
    'Ã™': 'Ù',
    'Ãš': 'Ú',
    'Ã›': 'Û',
    'Ãœ': 'Ü',
    'Ãž': 'Þ',
    'ÃŸ': 'ß',
    'Ã€': 'À',
    'Ã': 'Á',
    'Ã‚': 'Â',
    'Ãƒ': 'Ã',
    'Ã„': 'Ä',
    'Ã…': 'Å',
    'Ã†': 'Æ',
    'Ã‡': 'Ç',
    'Ã': 'Ã',
}

changed_files = []

for path in root.rglob('*'):
    if not path.is_file() or path.suffix.lower() not in file_exts:
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        continue

    updated = text
    for old, new in replacements.items():
        updated = updated.replace(old, new)

    if updated != text:
        path.write_text(updated, encoding='utf-8')
        changed_files.append(str(path.relative_to(root)))

print(f"Updated {len(changed_files)} files")
for item in changed_files[:200]:
    print(item)
