# AeroMind </>

A local AI model manager built with React, TypeScript, and Vite. Browse, download, and run open-source AI models entirely on your own hardware — no cloud, no subscriptions, no data leaving your machine.

![AeroMind](https://img.shields.io/badge/React-18-blue?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square) ![Vite](https://img.shields.io/badge/Vite-6-purple?style=flat-square) ![Tailwind](https://img.shields.io/badge/Tailwind-3-teal?style=flat-square)

---

## What is AeroMind?

AeroMind is an all-in-one desktop-ready interface for managing local AI models. Think of it as your personal AI hub — instead of relying on cloud-based services, you download the model once and run it as many times as you want using your own CPU/GPU. It's faster, safer, and completely private.

---

## Features

- **Model Browser** — Search and filter models from Hugging Face, Ollama, and custom URLs, with hardware requirement breakdowns (disk, RAM, VRAM) so you know what your machine can handle before downloading
- **Download & Install Pipeline** — Real-time download progress with installation state management (downloading → installing → ready)
- **Run & Manage** — Launch installed models directly from the interface, stop them, or uninstall them with one click
- **Per-Model Chat History** — Each model keeps its own conversation history; switching models switches context automatically
- **Three Themes** — Dark mode, Light mode, and Frutiger Aero — a nostalgic early-2000s glassmorphism aesthetic with frosted panels, soft gradients, and glassy UI elements
- **Model Info Modals** — Click any model row to expand a detailed info panel with full specs and tags
- **Expandable Settings** — API key management, theme switching, and profile customisation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 6 |
| Language | TypeScript / JSX |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| UI Components | shadcn/ui + Radix UI |
| Routing | React Router v6 |
| State | React Context + useState |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/GoldJS/AeroMind.git

# Navigate into the project
cd AeroMind

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Themes

AeroMind ships with three built-in themes, switchable from the Settings panel:

- **Dark** — Clean dark UI, easy on the eyes
- **Light** — Minimal white interface
- **Frutiger Aero** — Inspired by the early 2000s Windows Aero / nature-tech aesthetic. Frosted glass panels, soft blues and greens, glowing accents — designed to bring a wave of nostalgia while staying completely functional

---

## Roadmap

- [ ] Real Ollama API integration for actual model execution
- [ ] Hugging Face API connection for live model listings
- [ ] Tauri packaging for native desktop app (~5MB install size)
- [ ] Real chat inference via locally running models
- [ ] GPU/VRAM detection to flag incompatible models automatically
- [ ] Settings panel — API keys, profile, theme persistence

---

## Project Structure

```
src/
├── components/
│   ├── aeromind/        # Core app components
│   │   ├── Sidebar.jsx
│   │   ├── ChatArea.jsx
│   │   ├── ChatInput.jsx
│   │   ├── ModelSwitcher.jsx
│   │   ├── ModelsPanel.tsx
│   │   ├── SettingsPanel.jsx
│   │   └── ...
│   └── ui/              # shadcn/ui primitives
├── lib/
│   ├── ThemeContext.jsx  # Theme switching logic
│   └── ...
├── pages/
│   └── Homepage.jsx
└── main.jsx
```

---

## Author

**Mohamed Isa** — [GitHub](https://github.com/GoldJS) · [LinkedIn](https://www.linkedin.com/in/mohamed-isa-6a42181b1/)

---

*Built as a portfolio project. If it resonates with you, feel free to fork it and make it your own.*# AeroMind </>