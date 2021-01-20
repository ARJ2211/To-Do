const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
const path = require('path');



let Mainwindow, addWindow;
let deleteAll_flag = false;



app.on('ready', () => {
    Mainwindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        },
        title: 'ToDo',
        width: 600,
        height: 800,
        titleBarStyle: 'hidden',
        frame: false
    });
    Mainwindow.loadFile('main.html');
    Mainwindow.on('closed', () => {
        app.quit();
    });
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});




function sendDeleteAllEvent() {
    //deleteAll_flag = true;
    Mainwindow.webContents.send("todo:delete_all");
}



function createAddWindow() {
    addWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: true

        },
        width: 400,
        height: 200,
        title: 'Add New ToDo',
        frame: false
    });


    addWindow.loadFile('addtodo.html');
    addWindow.focus();
    addWindow.on('closed', () => addWindow = null);

    ipcMain.on('todo:add_task', (event, task) => { // Recieve from the renderer
        Mainwindow.webContents.send("todo:add_task_main", task); // Send to the main window
        // await delay(500)
        // addWindow.close();
    });
}


const menuTemplate = [{
        label: 'ToDo',
        submenu: [{
                label: 'New ToDo',
                accelerator: process.platform === 'darwin' ? 'command + N' : 'ctrl + N',
                click() {
                    createAddWindow();
                }
            },
            {
                label: 'Delete all ToDo',
                accelerator: process.platform === 'darwin' ? 'command + D' : 'ctrl + D',
                click() {
                    sendDeleteAllEvent();
                }
            },
            {
                label: 'Quit',
                accelerator: 'ctrl + Q',
                click() {
                    app.quit();
                }
            },
        ]
    },
    {
        label: 'File',
        submenu: [{
                label: 'Open File',
            },
            {
                label: "Close File",
            }
        ]
    },
    {
        label: "View",
        submenu: [{
            role: 'toggledevtools',
            accelerator: "ctrl + I"
        }]
    }
];