const path = require('path');

const {app, BrowserWindow} = require('electron');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 640,
        height: 400,
        resizable: false
    });

    mainWindow.loadFile(path.join(__dirname, 'client/index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
