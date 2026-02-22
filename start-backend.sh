#!/bin/bash

echo "🚀 Starting EODHD API Backend Server..."
echo ""

# Check if we're in the right directory
if [ ! -f "apps/app-booze-api/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Navigate to the API directory
cd apps/app-booze-api

echo "📁 Working directory: $(pwd)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Load environment variables
echo "🔧 Loading environment variables..."
if [ -f "../../.env.dev" ]; then
    export $(cat ../../.env.dev | grep -v '^#' | xargs)
    echo "✅ Environment variables loaded from .env.dev"
else
    echo "⚠️  No .env.dev file found, using default values"
fi

echo ""
echo "🌐 Starting server on port 3001..."
echo "   Frontend should be running on http://localhost:3000"
echo "   API will be available at http://localhost:3001/api/v1"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
npm start
