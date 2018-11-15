var {
    clipboard
} = require("electron");
var MessageBox = require("../message");
/*上传文件基类*/
function UploadBase() {}
/*获取剪贴板中buffer数据*/
UploadBase.prototype.getImageBuffer = function() {
    var image = clipboard.readImage();
    if (image.isEmpty()) {
         throw new Error("粘贴板中没有图片内容！");
    }
    var imageBuffer = image.toPNG();
    return imageBuffer;
}
module.exports = UploadBase;