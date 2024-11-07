DATA_DIR = data

STITKY_STY = kniznistitky.sty
STITKY_STY_OUTPUT = $(DATA_DIR)/$(STITKY_STY)
ODDILY = stitky-oddily.tex

SIGNATURY_STY = stitky.sty
SIGNATURY_STY_OUTPUT = $(DATA_DIR)/$(SIGNATURY_STY)

all: $(DATA_DIR) $(STITKY_STY_OUTPUT) $(SIGNATURY_STY_OUTPUT) UPDATE_HTML
$(DATA_DIR): 
	mkdir -p data

$(STITKY_STY_OUTPUT): $(DATA_DIR)
	cp `kpsewhich $(STITKY_STY)` $(DATA_DIR)
	cp `kpsewhich $(ODDILY)` $(DATA_DIR)

$(SIGNATURY_STY_OUTPUT): $(DATA_DIR)
	cp `kpsewhich $(SIGNATURY_STY)` $(DATA_DIR)

UPDATE_HTML:
	python replace_tags.py
