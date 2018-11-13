var {
    ipcMain,
    BrowserWindow
} = require("electron");
var Config =require("./config");
var fs = require("fs");
module.exports = function() {

    var config =Config.getInstance();

    ipcMain.on("setQiniu", function(e, data) {
        config.set("qiniu",data);
    })

    ipcMain.on("getQiniu", function(e) {
        var currentWin = BrowserWindow.getFocusedWindow();
        var data = config.get("qiniu");
        currentWin.webContents.send("getQiniu",data);
    })


}
