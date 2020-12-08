.PHONY: install
install:
	cd sketch && npm i
	cd figma && npm i
	cd web && npm i
.PHONY: build-sketch
build-sketch:
	cd sketch && npm run build
	open sketch/flower-name.sketchplugin
.PHONY: build-figma
build-figma:
	cd figma && npm run build