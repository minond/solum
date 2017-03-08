npm = npm
git = git
heroku = heroku

tsc = ./node_modules/.bin/tsc
tslint = ./node_modules/.bin/tslint
cssnext = ./node_modules/.bin/cssnext
stylelint = ./node_modules/.bin/stylelint

dir_src = src
dir_dist = dist
dir_conf = config
dir_script = script
dir_css = assets/styles
dir_dist_css = dist/$(dir_css)

build: clean build-server build-css

build-css:
ifdef DEBUG
	$(cssnext) \
		--sourcemap \
		$(dir_css)/main.css \
		$(dir_dist_css)/main.css
else
	$(cssnext) \
		--compress \
		$(dir_css)/main.css \
		$(dir_dist_css)/main.css
endif

build-server:
	# --noUnusedParameters
	# --noUnusedLocals
	$(tsc) \
		--pretty \
		--module commonjs \
		--removeComments \
		--strictNullChecks \
		--moduleResolution node \
		--noImplicitAny \
		--noImplicitReturns \
		--alwaysStrict \
		--experimentalDecorators \
		--forceConsistentCasingInFileNames \
		--outDir $(dir_dist) \
		$(dir_src)/declarations.d.ts \
		$(dir_src)/application.ts

clean:
	-rm -r $(dir_dist)

configure:
	./$(dir_script)/bootstrap

install:
	$(npm) install

lint:
	$(tslint) --config $(dir_conf)/tslint.json $(dir_src)/*.ts
	$(stylelint) --config $(dir_conf)/stylelint.json $(dir_css)/*.css

server:
	node $(dir_dist)/server/main
