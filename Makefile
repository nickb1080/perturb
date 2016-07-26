test: lint
	NODE_ENV=testing ./node_modules/.bin/_mocha ./test/**/*.js

test-bail: lint
	NODE_ENV=testing ./node_modules/.bin/_mocha ./test/**/*.js --bail

lint:
	./node_modules/.bin/eslint ./src/**/*.js

events:
	./bin/perturb -r ./examples/event-emitter

dogfood:
	rm -rf ./.perturb
	rm -rf ./built
	./node_modules/.bin/tsc
	node ./run.js dogfood $(RUNNER)

build:
	./node_modules/.bin/tsc --strictNullChecks

.PHONY: test example
