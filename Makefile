build:
		npm run build

install:
		npm ci && cd frontend && npm ci

start:
		npx start-server -s ./frontend/dist