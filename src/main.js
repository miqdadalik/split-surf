

const { app, BrowserWindow } = require("electron");
const path = require("path");
const remoteMain = require("@electron/remote/main");

remoteMain.initialize();

app.disableHardwareAcceleration();

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      sandbox: false
    }
  });

  win.loadFile("index.html");

  remoteMain.enable(win.webContents);
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
