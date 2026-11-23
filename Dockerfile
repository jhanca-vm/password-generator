FROM node:lts-alpine AS web
COPY --from=ghcr.io/pnpm/pnpm:12-alpine /opt/pnpm /opt/pnpm
RUN ln -s /opt/pnpm/pnpm /usr/local/bin/pnpm
WORKDIR /app/web
COPY web/package.json web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY web/ .
RUN pnpm build --dist-path dist

FROM golang:1.27.4-alpine AS api
WORKDIR /app/api
COPY api/go.mod api/go.sum ./
RUN go mod download
COPY api/ .
COPY --from=web /app/web/dist ./dist
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o bin

FROM alpine:3.24
WORKDIR /app
COPY --from=api /app/api/bin .
EXPOSE 8000
CMD ["./bin"]
