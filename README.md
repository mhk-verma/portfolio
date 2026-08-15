# Mahak Verma — Portfolio Website

A premium, modern personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion. Featuring a dark/burgundy aesthetic with smooth animations and responsive design.

## Features

- **Premium Design**: Dark theme with burgundy/crimson accents
- **Smooth Animations**: Powered by Framer Motion
- **Responsive**: Fully responsive for desktop, tablet, and mobile
- **Custom Cursor**: Interactive cursor for desktop users
- **Glass Morphism**: Modern glass-effect UI components
- **SEO Optimized**: Proper meta tags and Open Graph metadata
- **Accessible**: Semantic HTML with accessibility features
- **GitHub Pages Ready**: Pre-configured for automatic deployment

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mhk-verma/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for GitHub Pages deployment using GitHub Actions.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to GitHub Pages

### Automatic Deployment

The `.github/workflows/deploy.yml` workflow automatically deploys to GitHub Pages when you push to the `main` branch.

## Project Structure

```
portfolio/
├── src/
│   ├── components/       # React components
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── CustomCursor.jsx
│   ├── data/            # Data files
│   │   ├── personal.js
│   │   ├── skills.js
│   │   ├── projects.js
│   │   └── socials.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .github/             # GitHub Actions workflows
└── package.json
```

## Customization

### Personal Information

Edit `src/data/personal.js` to update your personal details.

### Skills

Edit `src/data/skills.js` to update your skills and proficiency levels.

### Projects

Edit `src/data/projects.js` to add or update your projects.

### Social Links

Edit `src/data/socials.js` to update your social media links.

### Images

Place your images in the `public/images/` directory:
- `hero-portrait.jpg` - Main hero portrait

## Color Scheme

The website uses a refined color system:

- **Background**: Near-black (#0a0a0a)
- **Primary Accent**: Deep burgundy (#8B0000)
- **Secondary Accent**: Lighter burgundy (#A52A2A)
- **Text**: Warm white (#f5f5f5)
- **Secondary Text**: Muted gray (#a0a0a0)

## Performance

The website is optimized for performance:
- Lazy loading for images
- Code splitting
- GPU-friendly animations
- Minimal dependencies
- Efficient CSS

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Reduced motion support
- Accessible color contrast
- ARIA labels where needed

## License

This project is open source and available under the MIT License.

## Author

**Mahak Verma** - [mhk codes](https://github.com/mhk-verma)

---

Built with ❤️ using React and modern web technologies.
