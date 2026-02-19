
## 🔖 Smart Bookmark App
A simple, real-time bookmark manager built with Next.js (App Router) and Supabase, allowing users to securely save, view, and manage their personal bookmarks with Google authentication.

## ✨ Features
🔐 Google OAuth Authentication (no email/password)
➕ Add bookmarks (title + URL)
👤 Private bookmarks per user
📡 Real-time sync across tabs/devices (no refresh needed)
🗑️ Delete your own bookmarks
🚀 Deployed on Vercel

## 📁 Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   └── [routes]/           # Dynamic routes
│   ├── components/             # Reusable React components
│   ├── lib/                    # Utility functions
│   └── styles/                 # CSS/styling files
├── public/                     # Static assets
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📄 Pages & Routing

| Route | Component | Description |
|-------|-----------|-------------|
| \`/\` | \`app/page.tsx\` | Home page |

## 🎨 Layout

The root layout in `src/app/layout.tsx` wraps all pages and includes:
- **Geist Sans & Mono fonts** from Google Fonts
- **Global CSS** styling
- **Meta information** (title, description)

## 🛠️ Technologies

- **Next.js** - React framework
- **TypeScript** - Type safety
- **React** - UI library
- **CSS** - Styling

## 📦 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server

## 📝 License

MIT
\`\`\`

Replace the structure and routes with your actual project details.
