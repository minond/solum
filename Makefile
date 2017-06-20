yarn = yarn
node = node
webpack = ./node_modules/.bin/webpack
tslint = ./node_modules/.bin/tslint
standard = ./node_modules/.bin/standard
tsc = ./node_modules/.bin/tsc
pm2 = ./node_modules/.bin/pm2

dir_src = src
dir_dist = dist
dir_conf = config

opt_webpack_config = --config $(dir_conf)/webpack.js
opt_tsc_config = @$(dir_conf)/tsconfig.txt

opt_tsc_server = --outDir $(dir_dist) \
	$(dir_src)/declarations.d.ts \
	$(dir_src)/server/main.ts

build: clean server client
watch: watch-client watch-server

configure:
	./script/configure

install:
	@$(yarn) install

clean:
	-rm -r $(dir_dist)

lint:
	$(tslint) --config $(dir_conf)/tslint.json \
		$(dir_src)/*.ts \
		$(dir_src)/**/*.ts \
		$(dir_src)/**/*.tsx
	$(standard) $(dir_conf)/*.js

watch-client:
	$(webpack) $(opt_webpack_config) --watch

client:
	NODE_ENV=production $(webpack) $(opt_webpack_config)

watch-server:
	$(tsc) $(opt_tsc_config) $(opt_tsc_server) --watch

server:
	$(tsc) $(opt_tsc_config) $(opt_tsc_server)

daemon:
	$(pm2) start config/processes.yml

run:
	$(pm2) start config/processes.yml --no-daemon
