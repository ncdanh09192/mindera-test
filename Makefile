.PHONY: all install setup-env setup start dev build test test-coverage clean help

# Default target - setup and start development server
all: start

# Install dependencies if needed
install:
	@if [ ! -d "node_modules" ]; then \
		echo "📦 Installing dependencies..."; \
		npm install; \
	else \
		echo "✅ Dependencies already installed"; \
	fi

# Setup environment file if needed
setup-env:
	@if [ ! -f ".env.local" ]; then \
		echo "📝 Creating .env.local from .env.example..."; \
		cp .env.example .env.local; \
		echo "✅ .env.local created!"; \
		echo ""; \
		echo "⚠️  IMPORTANT: Please add your Storefront API token to .env.local"; \
		echo "   Edit .env.local and set NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN"; \
		echo ""; \
	else \
		echo "✅ .env.local already exists"; \
	fi

# Full setup: install dependencies and create env file
setup: install setup-env
	@echo ""
	@echo "🎉 Setup complete!"
	@echo ""

# Start development server (setup first if needed)
start: setup
	@echo "🚀 Starting development server..."
	@echo "   Open http://localhost:3000 in your browser"
	@echo ""
	@npm run dev

# Alias for start
dev: start

# Build for production
build: setup
	@echo "🔨 Building for production..."
	@npm run build

# Run tests
test: setup
	@echo "🧪 Running tests..."
	@npm test

# Run tests with coverage
test-coverage: setup
	@echo "📊 Running tests with coverage..."
	@npm run test:coverage

# Clean all generated files
clean:
	@echo "🧹 Cleaning up..."
	@rm -rf node_modules .next .env.local
	@echo "✅ Clean complete!"

# Display help
help:
	@echo "Available commands:"
	@echo ""
	@echo "  make start         - Setup and start dev server (default)"
	@echo "  make dev           - Alias for 'make start'"
	@echo "  make setup         - Install deps and setup .env.local"
	@echo "  make build         - Build for production"
	@echo "  make test          - Run tests"
	@echo "  make test-coverage - Run tests with coverage"
	@echo "  make clean         - Remove node_modules, .next, and .env.local"
	@echo "  make help          - Show this help message"
	@echo ""
