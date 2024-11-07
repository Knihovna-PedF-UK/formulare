# HTML formuláře pro knihovnu PedF UK

Tady je web: https://knihovna-pedf-uk.github.io/formulare/

## Build

Web stránky se automaticky vytváří pomocí Github Actions. Pro lokální build je
třeba nainstalovat TeX Live a do lokálního TEXMF adresáře
(`~/texmf/tex/latex/`) naklonovat následující repozitáře:

- https://github.com/michal-h21/signatury
- https://github.com/michal-h21/kniznistitky 

Pak můžeme spustit `make` a v adresáři out budou vygenerované soubory.

## Testování

Potřebujeme nainstalovat [Jest](https://jestjs.io/). Pak můžeme spustit 

    $ make test
