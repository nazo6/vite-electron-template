import { app, BrowserWindow } from 'electron';
import path from 'path';
import * as fs from 'fs';

//if (process.env.isDev) {
//  app.commandLine.appendSwitch('force-device-scale-factor', '1.5')
//}
let isRelaunching = false;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  if (process.env.isDev) {
    win.loadURL('http://localhost:3000');
    fs.watchFile(path.join(__dirname, 'preload.js'), () => {
      if (!isRelaunching) {
        isRelaunching = true;
        app.relaunch();
        app.quit();
      }
    });
    fs.watchFile(path.join(__dirname, 'main.js'), () => {
      if (!isRelaunching) {
        isRelaunching = true;
        app.relaunch();
        app.quit();
      }
    });
  } else {
    win.loadFile('index.html');
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
