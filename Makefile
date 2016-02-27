test: lint
	NODE_ENV=testing ./node_modules/.bin/_mocha ./test/**/*.js

lint:
	./node_modules/.bin/eslint ./lib/**/*.js

events:
	./bin/perturb -r ./examples/event-emitter

example:
	./node_modules/.bin/babel-node ./_src/run.js example

dogfood:
	./node_modules/.bin/babel-node ./_src/run.js dogfood

build:
	./node_modules/babel-cli/bin/babel.js --out-dir _lib _src,

.PHONY: test example
