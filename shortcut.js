var {
    globalShortcut
} = require("electron");
var QiNiu=require("./upload/qiniu");
module.exports = function() {
    globalShortcut.register("Ctrl+Alt+I", function() {
        var qiniu = new QiNiu();
        qiniu.upload();
    })
}