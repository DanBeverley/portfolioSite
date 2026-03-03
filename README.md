# Dan | AI Engineer Portfolio

A minimalist, personal portfolio built with React, Tailwind CSS, and Node.js, overall a fun exploring experience. It features a custom-built small neural network-driven Ping Pong game running natively in the browser background.

## 🚀 Features

- **RL AI Ping Pong**: A custom feed-forward loop runs TensorFlow weights natively to simulate autonomous bot matches.
- **Dynamic Projects Showcase**: Fetches live project data seamlessly from a PostgreSQL (Supabase) database.
- **Glassmorphism UI**: UX utilizing `framer-motion` for smooth section transitions and snap-scrolling.
- **Contact Form**: Direct email routing via a Node.js SMTP service.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, Radix UI, Wouter
- **Backend**: Node.js, Express, Drizzle ORM
- **Database**: PostgreSQL (Supabase)
- **AI/ML Integration**: TensorFlow.js (Pre-trained MLPs exported to raw JSON)

## 💻 Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/DanBeverley/portfolioSite.git
cd portfolioSite

# 2. Install dependencies
npm install

# 3. Configure environment variables (.env)
# DATABASE_URL=postgresql://...

# 4. Start the development server
npm run dev
```

The application will be available locally at `http://localhost:5000`.