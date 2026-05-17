# Lofty Labz - Constellation-Themed Website

A cinematic, constellation-themed business website featuring an interactive star map navigation system that represents five core service offerings as celestial constellations.

![Lofty Labz](https://via.placeholder.com/1200x600/4A148C/FFFFFF?text=Lofty+Labz+Star+Map)

## 🌟 Overview

Lofty Labz is a modern web application that transforms traditional business navigation into an immersive starfield experience. Each service constellation represents a different business offering:

- **Strategy Constellation** - Strategic planning and consulting
- **Design Constellation** - Creative design services
- **Development Constellation** - Technical development solutions
- **Marketing Constellation** - Marketing and brand strategy
- **Growth Constellation** - Business growth initiatives

The site features a **North Star Guarantee** positioned at the top center, symbolizing our commitment to guiding clients with unwavering reliability.

## ✨ Key Features

### Interactive Star Map Navigation
- **Desktop Experience**: Fully interactive star map with hover states and constellation connections
- **Mobile Experience**: Traditional list view optimized for touch targets
- **Parallax Starfield**: Dynamic background with depth and motion
- **Cinematic Logo Animation**: Engaging ignition sequence on page load

### Comprehensive Content
- **10 Main Pages**: Home, Services, Case Studies, Team, Blog, Manifesto, Guarantee, Contact, and more
- **15 Detailed Case Studies**: Real-world examples across all service constellations
- **6 Blog Posts**: Thought leadership and industry insights
- **Team Bios**: Meet the Lofty Labz crew
- **Manifesto**: Our guiding principles and values

### Accessibility & Performance
- WCAG 2.1 AA compliant
- Fully responsive design
- Optimized for performance
- Semantic HTML structure

## 🚀 Tech Stack

- **Framework**: React 18.3.1 with React Router 7.13.0
- **Styling**: Tailwind CSS 4.1.12
- **Animations**: Motion (Framer Motion) 12.23.24
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite 6.3.5
- **Package Manager**: pnpm
- **Language**: TypeScript

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/lofty-labz.git
cd lofty-labz
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser to the preview URL provided by Vite

## 🎨 Brand Guidelines

### Color Palette
The site uses a purple-themed color palette inspired by the Lofty Labz business card:

- **Primary Purple**: `#4A148C` (Deep Purple)
- **Secondary Purple**: `#7B1FA2` (Medium Purple)
- **Accent Purple**: `#9C27B0` (Light Purple)
- **Background**: Deep space blacks and grays
- **Text**: White and light grays for contrast

### Typography
- **Headings**: Orbitron (futuristic, space-themed)
- **Body Text**: Inter (clean, readable)

## 📁 Project Structure

```
lofty-labz/
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Main application component
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── StarMap.tsx         # Interactive star map
│   │   │   ├── Navigation.tsx      # Main navigation
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── CaseStudiesPage.tsx
│   │   │   └── ...
│   │   ├── data/
│   │   │   ├── constellations.ts   # Service constellation data
│   │   │   ├── caseStudies.ts      # Case study content
│   │   │   └── ...
│   │   └── lib/
│   │       └── utils.ts
│   └── styles/
│       ├── fonts.css               # Font imports
│       └── theme.css               # Theme tokens
├── public/                         # Static assets
├── guidelines/                     # Design guidelines
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🌐 Pages

1. **Home** - Star map overview with constellation navigation
2. **Services** - Detailed service offerings by constellation
3. **Case Studies** - 15 detailed project showcases
4. **Team** - Meet the Lofty Labz crew
5. **Blog** - Thought leadership articles
6. **Manifesto** - Our principles and values
7. **Guarantee** - The North Star Guarantee details
8. **Contact** (Hailing Frequency) - Get in touch
9. **Privacy Policy** - Data protection information
10. **Terms of Service** - Usage terms

## 🛠️ Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Style
- TypeScript strict mode enabled
- ESLint configuration included
- Tailwind CSS for styling (no inline styles)
- Component-based architecture

## 🔧 Configuration

### Vite Configuration
The project uses Vite 6.3.5 with:
- React plugin
- Tailwind CSS plugin
- TypeScript support

### Tailwind Configuration
Tailwind v4 is used with custom theme tokens defined in `src/styles/theme.css`.

## 🎯 Design Principles

1. **Cinematic Experience**: Engaging animations and transitions
2. **Constellation Metaphor**: All services organized as star constellations
3. **Dual Navigation**: Interactive map for desktop, list for mobile
4. **North Star Guarantee**: Always visible, guiding principle
5. **Accessibility First**: WCAG 2.1 AA compliance throughout

## 📱 Responsive Design

- **Desktop** (1024px+): Full star map navigation with hover effects
- **Tablet** (768px-1023px): Simplified star map with touch optimization
- **Mobile** (<768px): List-based navigation with constellation theme

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

This project is proprietary and confidential. All rights reserved by Lofty Labz.

## 🐛 Known Issues

Please check the [Issues](https://github.com/YOUR_USERNAME/lofty-labz/issues) page for current known issues and planned enhancements.

## 📞 Contact

For questions or support:
- **Website**: [Your Website]
- **Email**: contact@loftylabz.com
- **GitHub**: [Your GitHub Profile]

## 🙏 Acknowledgments

- Design inspiration from the Lofty Labz business card template
- Star map concept and constellation metaphor
- shadcn/ui for component library
- Radix UI for accessible primitives

---

**Built with 💜 by the Lofty Labz team**

*Navigating businesses to their North Star*
