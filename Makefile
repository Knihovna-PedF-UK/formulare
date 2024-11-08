DATA_DIR = data

STITKY_STY = kniznistitky.sty
STITKY_STY_OUTPUT = $(DATA_DIR)/$(STITKY_STY)
ODDILY = stitky-oddily.tex

SIGNATURY_STY = stitky.sty
SIGNATURY_STY_OUTPUT = $(DATA_DIR)/$(SIGNATURY_STY)

.PHONY: test 

all: $(DATA_DIR) $(STITKY_STY_OUTPUT) $(SIGNATURY_STY_OUTPUT) UPDATE_HTML

$(DATA_DIR): tpl/
	mkdir -p data
	cp tpl/* data/



$(STITKY_STY_OUTPUT): $(DATA_DIR)
	cp `kpsewhich $(STITKY_STY)` $(DATA_DIR)
	cp `kpsewhich $(ODDILY)` $(DATA_DIR)

$(SIGNATURY_STY_OUTPUT): $(DATA_DIR)
	cp `kpsewhich $(SIGNATURY_STY)` $(DATA_DIR)

UPDATE_HTML:
	python replace_tags.py
	cp -r js/ out/
	cp -r css/ out/
	cp -r img/ out/

test:
	jest
