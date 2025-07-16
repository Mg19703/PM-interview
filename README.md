# Salesforce Service Cloud - Billing Discrepancy Case Interface

An interactive demo showcasing AI-powered customer service workflows with multilingual support, real-time translation, and RAG-based knowledge retrieval.

## 🚀 Features

- **Interactive Scenario Demo**: Step-through customer service workflow
- **AI Translation**: Automatic French ↔ English translation
- **RAG Knowledge Retrieval**: AI-powered recommendations from knowledge base
- **Real-time Profile Enrichment**: Customer data from multiple sources
- **Multilingual Support**: Seamless French customer support
- **Production-Ready UI**: Salesforce Service Cloud interface

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-repo-name>

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup GitHub Pages Deployment

1. **Push to GitHub**: Push your code to a GitHub repository
2. **Enable GitHub Pages**: 
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
3. **Automatic Deployment**: Every push to `main` branch will trigger deployment

### Manual Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Use

1. **Play Scenario**: Click "Play Scenario" for automatic step-through
2. **Manual Mode**: Use "Manual Mode" for step-by-step control
3. **Interactive Steps**: Click step numbers to jump to specific stages
4. **RAG Recommendations**: Trigger AI recommendations when ready

## 📋 Workflow Steps

1. **Waiting for Customer Contact** - Initial blank state
2. **Customer Message Received** - Profile enrichment from Data Cloud
3. **Case Created & AI Translation** - French → English translation
4. **Agent Reviews Context** - Agent preparation phase
5. **RAG Knowledge Retrieval** - AI-powered recommendations
6. **Agent Response** - Crafted response with auto-translation

## 🌐 Live Demo

- **Netlify**: [View Live Demo](https://splendid-cendol-06f0bf.netlify.app)
- **GitHub Pages**: Will be available after deployment setup

## 🔧 Configuration

The app is pre-configured for GitHub Pages deployment with:
- Relative asset paths (`base: './'`)
- Optimized build output
- GitHub Actions workflow

## 📄 License

MIT License - feel free to use this project for your own demos and presentations.