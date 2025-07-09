# Development Documentation

## Project Structure

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
│       ├── icon.png
│       └── icon.svg
├── docs/                  # Documentation
├── build/                 # Build scripts and config
├── index.html             # Main HTML file
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
└── LICENSE                # License file
```

## Development Workflow

1. **Setup**: `npm install`
2. **Development**: `npm start`
3. **Package**: `npm run pack` (for testing)
4. **Build**: `npm run dist` (for distribution)

## Architecture

- **Main Process**: `src/main.js` - Handles app lifecycle and window creation
- **Preload Script**: `src/preload.js` - Bridge between main and renderer
- **Renderer Process**: `src/scripts/renderer.js` - UI logic and webview management
- **Styles**: `src/styles/style.css` - Application styling

## Features

- Split pane functionality with resizable gutters
- Multiple webview instances
- Tab management
- URL navigation with bookmarks
- Bootstrap UI framework integration
