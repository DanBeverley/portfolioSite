# Dan | AI Engineer Portfolio

A minimalist, personal portfolio built with React, Tailwind CSS, and Node.js, overall a fun exploring experience. It features a custom-built small neural network-driven Ping Pong game running natively in the browser background.
See it in action **[here](https://portfoliosite-xe31.onrender.com)** ! 

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

Application will be available locally at 'localhost:5000'

## Deploy to AWS

1. Save the public project catalogue in `portfolio-projects.json` at the repository root. Use the existing `/api/projects` response shape and preserve project IDs and display order. Include only entries meant for publication.
2. Connect the branch in Amplify Hosting. The checked-in `amplify.yml` builds the static site to `dist/public`. In **Rewrites and redirects**, add a **200 (Rewrite)** from `/project/<*>` to `/index.html` so direct links to project pages work.
3. To enable the contact form, verify the contact inbox in Amazon SES, then create a CloudFormation stack from `deploy/contact.yml` in the same region. Supply the verified inbox and the Amplify site URL without its trailing slash.
4. Set the Amplify build variable `VITE_CONTACT_ENDPOINT` to the stack's `ContactEndpoint` output and redeploy. Check the homepage, a direct project link, and delivery to the contact inbox before sharing the Amplify URL.
