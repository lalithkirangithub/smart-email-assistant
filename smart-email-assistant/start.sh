#!/bin/bash

echo "================================================"
echo "  MailMind — Smart Email Assistant"
echo "================================================"
echo ""
echo "Starting Spring Boot backend..."
cd backend && mvn spring-boot:run &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 15

echo "Starting React frontend..."
cd ../frontend && npm install && npm start &
FRONTEND_PID=$!

echo ""
echo "================================================"
echo "  App running!"
echo "  Backend:  http://localhost:8080"
echo "  Frontend: http://localhost:3000"
echo "================================================"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT
wait
