var electron = require("electron");
var MainMenu = require("./menu");
var EventListener =require("./event");
var Config=require("./config");
/*设置环境变量*/
process.env.NODE_ENV = "development";
var {
    app,
    BrowserWindow,
    globalShortcut,
} = electron;
let mainWindow;
app.on("ready", function() {
    mainWindow = new BrowserWindow();
    mainWindow.loadFile("index.html");
    shortCut();
    new MainMenu().create();
    Config.getInstance();
    EventListener();
    mainWindow.on("closed",()=>{
    	app.quit();
    })
})


function shortCut() {
    globalShortcut.register("Ctrl+Alt+I", function() {
        console.log("x");
    })
}