watch:
	@./node_modules/.bin/tsc -w
build:
	@./node_modules/.bin/tsc
test:
	@./node_modules/.bin/jest
watch-test:
	@./node_modules/.bin/jest --watch

.PHONY: watch, build, test, watch-test