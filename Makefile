.PHONY: help dev build up down logs restart test lint clean

# Default target
help:
	@echo "Available commands:"
	@echo "  make dev      - Start local development server"
	@echo "  make build    - Build Docker images"
	@echo "  make up       - Start Docker containers"
	@echo "  make down     - Stop Docker containers"
	@echo "  make logs     - View Docker logs"
	@echo "  make restart  - Restart Docker containers"
	@echo "  make test     - Run unit tests"
	@echo "  make lint     - Run linter"
	@echo "  make clean    - Remove node_modules and dist"

dev:
	npm run dev

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f

restart: down up

test:
	npm test

lint:
	npm run lint

clean:
	rm -rf node_modules dist
