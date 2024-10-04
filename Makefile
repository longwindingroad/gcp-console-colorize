package:
	zip package.zip icon/* lib/* background.js main.js manifest.json options.*
	mkdir -p package
	unzip -q package.zip -d package

clean:
	rm -rf package
	rm -rf package.zip