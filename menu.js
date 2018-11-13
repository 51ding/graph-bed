var {
    Menu,BrowserWindow
} = require("electron");

let qiniuWindow;

let menuTemplate = [{}, {
    label: "配置",
    submenu: [{
        label: "七牛云",
        click(menuitm,win) {
            if (!qiniuWindow) {
                qiniuWindow = new BrowserWindow({
                    width: 450,
                    height: 400,
                    parent:win
                    // minimizable: false,
                    // maximizable: false
                });
                qiniuWindow.loadFile("qiniu.html");
                //qiniuWindow.setMenu(null);
                qiniuWindow.on("close", () => {
                    qiniuWindow = null;
                })
            }
        }
    }]
}];
class MainMenu {
    constructor() {
        if (process.env.NODE_ENV !== "production") {
            var devToolMenu = {
                label: "调试",
                submenu: [{
                    label: "DevTool",
                    click(menuItem, win) {
                        win.webContents.toggleDevTools();
                    }
                },{
                	label:"重新加载",
                	role:"reload"
                }]
            };
            menuTemplate.push(devToolMenu);
        }
    }
    create() {
        let mainMenu = Menu.buildFromTemplate(menuTemplate);
        Menu.setApplicationMenu(mainMenu);
    }
}
module.exports = MainMenu;