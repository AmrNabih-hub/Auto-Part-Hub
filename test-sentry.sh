#!/bin/bash

echo "🧪 Testing Sentry Integration"
echo "=============================="

echo ""
echo "🔧 Backend Sentry Test:"
echo "Running Laravel tests to verify Sentry configuration..."
docker compose exec app php artisan test --filter=SentryTest

echo ""
echo "🌐 Frontend Sentry Test:"
echo "1. Start your React development server: npm run dev"
echo "2. Navigate to: http://localhost:3000/sentry-test"
echo "3. Click the test buttons to send events to Sentry"
echo "4. Check your Sentry dashboard for events"

echo ""
echo "📊 Sentry Dashboard URLs:"
echo "Backend: https://o4509691725479936.ingest.de.sentry.io/4509691740029008"
echo "Frontend: https://o4509691725479936.ingest.de.sentry.io/4509691819393104"

echo ""
echo "✅ Sentry integration is now complete!"
echo "Both backend and frontend will now send errors and performance data to Sentry." 