install:
	npm install

start:
	npm start

build:
	rm -rf dist
	npx webpack -p --env production && npx babel src --out-dir dist --source-maps inline

test:
	npm test

lint:
	npx eslint .

.PHONY: test
