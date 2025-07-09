# 🌊 SplitSurf

**SplitSurf** is a customizable desktop browser built with Electron, designed for advanced multitasking and side-by-side webview layouts. It allows users to split panes dynamically, embed full Chromium-powered webviews in each pane, and navigate between tabs seamlessly. Ideal for developers, researchers, and power users.

![License: Apache-2.0](https://img.shields.io/badge/license-Apache%202.0-blue)
![Platform: Windows/Linux/macOS](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-green)

---

## ⚙️ Features

- 🔲 Split panes horizontally and vertically, recursively
- 🌐 Embed full-featured `webview` instances — each runs independently
- 🗂️ Tabbed interface with navigation controls
- 📶 URL bar, progress indicator, and bookmark dropdown
- 🎯 Resizable splits with draggable gutters
- 🧩 Planned: session persistence, tab restore, dark mode

---

## 📁 Project Structure

```
browsernator/
├── src/                    # Source code
│   ├── main.js            # Electron main process
│   ├── preload.js         # Preload script
│   ├── scripts/           # Renderer scripts
│   │   └── renderer.js    # Main renderer logic
│   └── styles/            # CSS stylesheets
│       └── style.css      # Main styles
├── assets/                # Static assets
│   └── icons/             # Application icons
├── docs/                  # Documentation
├── build/                 # Build scripts
├── index.html             # Main HTML file
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

---

## 🛠 Development Setup

To run the app in development mode:

```bash
git clone https://github.com/miqdadalik/split-surf.git
cd split-surf/browsernator
npm install
npm start
```

**Requirements:**
- Node.js v18 or higher
- Electron (bundled via `npm install`)
- electron-builder for packaging

**Dependencies:**
- `@electron/remote` - For remote module access
- `electron-builder` - For creating distributable packages

---

## 📦 Building & Packaging

### Quick Build
```bash
npm run dist
```

### Build Options
```bash
npm run pack  # Creates unpacked app in dist/
npm run dist  # Creates final packages (.deb, AppImage)
```

### Using Build Script
```bash
./build/build.sh  # Automated build process
```

### Build Configuration
The build is configured in `package.json`:
```json
"build": {
  "appId": "miq.dad.splitsurf",
  "productName": "Split Surf",
  "linux": { 
    "target": ["deb", "AppImage"],
    "icon": "assets/icons/icon.png",
    "category": "Utility"
  }
}
```

---

## 📥 Installation

### Linux (.deb)
After running `npm run dist`:
```bash
sudo dpkg -i dist/*.deb
```

To launch:
```bash
splitsurf
# or
/opt/SplitSurf/splitsurf
```

---

## 🤝 Contributing

We welcome ideas, forks, features, and fixes!

**How to contribute:**
1. Fork the repo
2. Create a new branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to your fork: `git push origin feature/my-feature`
5. Open a Pull Request

**Guidelines:**
- Keep layout and naming consistent
- Focus on modular, webview-safe features
- Open Issues for bugs, ideas, or discussions
- Check `docs/DEVELOPMENT.md` for detailed development info

---

## 📄 License

Licensed under the Apache License 2.0. You're free to use, modify, and distribute — just retain attribution.

---

## 👋 About

Built by [@miqdadalik](https://miq.dad) • SplitSurf is an experiment in precision browsing, parallel workflows, and pane-powered navigation.

**Project Details:**
- **Homepage:** [github.com/miqdadalik/split-surf](https://github.com/miqdadalik/split-surf)
- **Author:** MiQ (hey@miq.dad)
- **Current Version:** 1.0.0
