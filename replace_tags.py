import os
import re
import base64

# Cesty k adresářům
data_dir = "data"
output_dir = "out"

# Pokud složka pro výstup neexistuje, vytvoř ji
os.makedirs(output_dir, exist_ok=True)

# Pravidelný výraz pro hledání značek ${jmenosouboru}
pattern = re.compile(r'\$\{([^}]+)\}')

# Seznam přípon, jejichž obsah bude zakódován pomocí base64
base64_extensions = ['.pdf', '.jpg', '.png']

def replace_tags_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Najdi všechny značky ${jmenosouboru}
    matches = pattern.findall(content)

    for match in matches:
        data_file_path = os.path.join(data_dir, match)

        # Pokud odkazovaný soubor existuje, nahraď značku jeho obsahem
        if os.path.isfile(data_file_path):
            with open(data_file_path, 'rb') as data_file:  # Otevřeme v binárním režimu pro base64
                data_content = data_file.read()
            
            # Zakóduj obsah souboru, pokud má požadovanou příponu
            _, ext = os.path.splitext(match)
            if ext in base64_extensions:
                data_content = base64.b64encode(data_content).decode('utf-8')
            else:
                data_content = data_content.decode('utf-8')
            
            content = content.replace(f"${{{match}}}", data_content)

    # Ulož aktualizovaný soubor do složky out
    output_path = os.path.join(output_dir, os.path.basename(file_path))
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(content)

# Projdi všechny HTML soubory v hlavním adresáři
for file_name in os.listdir('.'):
    if file_name.endswith('.html'):
        replace_tags_in_file(file_name)
