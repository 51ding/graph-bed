var electron = require("electron");
var MainMenu = require("./menu");
var EventListener = require("./event");
var Config = require("./config");
var ShortCut=require("./shortcut");
var MessageBox =require("./message");
/*设置环境变量*/
process.env.NODE_ENV = "development";
var {
    app,
    BrowserWindow,
    globalShortcut,
} = electron;
let mainWindow;
app.on("ready", function() {
    createMainWindow();
    ShortCut();
    new MainMenu().create();
    Config.getInstance();
    EventListener();
})

function createMainWindow() {
    mainWindow = new BrowserWindow();
    mainWindow.loadFile("index.html");
    mainWindow.on("closed", () => {
        app.quit();
    })
}

process.on('uncaughtException', (err) => {
  MessageBox.show(err.message);
});
