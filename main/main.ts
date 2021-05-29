import { app, BrowserWindow } from 'electron';
import path from 'path';

//if (process.env.isDev) {
//  app.commandLine.appendSwitch('force-device-scale-factor', '1.5')
//}

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
