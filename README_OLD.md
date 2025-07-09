# 🌊 SplitBrowser

**SplitBrowser** is a customizable desktop browser built with Electron, d## 📄 License
Licensed under the Apache License 2.0. You're free to use, modify, and distribute — just retain attribution.

## 👋 About
Built by [@miqdadalik](https://miq.dad) • SplitBrowser is an experiment in precision browsing, parallel workflows, and pane-powered navigation.

---

**Project Details:**
- **Homepage:** [miq.dad/projects/split-browser](https://miq.dad/projects/split-browser)
- **Author:** MiQ (hey@Miq.dad)
- **Current Version:** 1.0.0ed for advanced multitasking and side-by-side webview layouts. It allows users to split panes dynamically, embed full Chromium-powered webviews in each pane, and navigate between tabs seamlessly. Ideal for developers, researchers, and power users.

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

## 🛠 Development Setup

To run the app in development mode:

```bash
git clone https://github.com/miqdadalik/split-surf.git
cd split-surf
npm install
npm start
```

**Requirements:**
- Node.js v18 or higher
- Electron (bundled via `npm install`)
- Optional: electron-builder for packaging

**Dependencies:**
- `@electron/remote` - For remote module access
- `electron-builder` - For creating distributable packages

## 📦 Packaging the App
SplitBrowser uses electron-builder to generate installers for Linux.

To build for your current OS:
```bash
npm run dist
```

To build distributables and packages:
```bash
npm run pack  # Creates unpacked app in dist/
npm run dist  # Creates final packages (.deb, AppImage)
```

**package.json** build config:
```json
"build": {
  "appId": "dad.miq.splitsurf",
  "productName": "Split Surf",
  "linux": { 
    "target": ["deb", "AppImage"],
    "icon": "icon.png",
    "category": "Utility"
  }
}
```
## 📥 Linux Installation (.deb)
After running `npm run dist`, install the generated .deb:

```bash
sudo dpkg -i dist/*.deb
```

To launch:
```bash
splitsurf
# or
/opt/SplitSurf/splitsurf
```
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

📄 License
Licensed under the Apache License 2.0 You’re free to use, modify, and distribute — just retain attribution.

👋 About
Built by @miqdadalik Split Surf is an experiment in precision browsing, parallel workflows, and pane-powered navigation.