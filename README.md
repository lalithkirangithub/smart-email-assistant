MailMind — Smart Email Assistant
A full-stack AI-powered email assistant built with Spring Boot (backend) and React + Vite (frontend), using the Groq API (free tier) with the Llama 3.3-70b model.

Features
Feature	Description
✍️ Compose	Write complete professional emails from scratch
↩️ Reply	Generate smart context-aware replies
📋 Summarize	Extract key points from any email
✨ Improve	Polish grammar, clarity & professionalism
🎯 Subject Lines	Generate 5 compelling subject options
🎭 Tone Check	Analyze tone, sentiment & professionalism rating
🌍 Translate	Translate emails to 9+ languages
📌 Key Points	Extract actionable bullet points
🏛️ Make Formal	Convert casual emails to formal style
😊 Make Casual	Make formal emails warm and friendly
Tech Stack
Backend: Spring Boot 3.2, Java 17, spring-dotenv
Frontend: React 18, Vite, Axios
AI: Groq API (free) — llama-3.3-70b-versatile
Setup
1. Get a free Groq API key
Visit https://console.groq.com → API Keys → Create API Key

2. Backend .env
cd backend
cp .env.example .env
# Open .env and set: GROQ_API_KEY=gsk_your_key_here
3. Frontend .env
cd frontend
cp .env.example .env
# No changes needed for local dev
4. Run backend
cd backend
mvn spring-boot:run
5. Run frontend
cd frontend
npm install
npm run dev
App runs at http://localhost:3000

Notes
.env files are in .gitignore and never committed to GitHub
.env.example files are safe templates committed to the repo
