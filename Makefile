.PHONY: test dev build

test:
	@pnpm -C web test && cd api && go test -v ./...

dev:
	@test -d api/dist || pnpm --dir web build -m development
	@pnpm -C web dev & cd api && go tool air

build:
	@pnpm -C web build && cd api && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
	    go build \
		-ldflags="-s -w" \
        -o ../bin/app
