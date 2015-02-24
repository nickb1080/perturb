test:
	./node_modules/.bin/_mocha ./test/**/*.js

lint:
	./node_modules/.bin/jshint ./**/*.js

test-example:
	./node_modules/.bin/_mocha ./example/test/**/*-test.js

example:
	./bin/perturb -r ./example

example-i:
	./bin/perturb -r ./example -i

dogfood:
	./bin/_perturb -r ./ -c 'make lint && make test'

dogfood-i:
	./bin/_perturb -r ./ -i

.PHONY: test example
