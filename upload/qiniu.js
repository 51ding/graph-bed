var qiniu = require("qiniu");
var Config = require("../config");
var UploadBase = require("./uploadBase");
var util = require("util");
var {clipboard}=require("electron");
var MessageBox=require("../message");
const ZONE={
    10:"Zone_z0",
    20:"Zone_z1",
    30:"Zone_z2",
    40:"Zone_na0"
};

function QiNiu() {
    this.config = Config.getInstance().get("qiniu");
    this.accessKey = this.config.accessKey;
    this.secretKey = this.config.secretKey;
    this.domain = this.config.domain;
    this.bucket = this.config.bucket;
    this.zone =ZONE[this.config.zone];
}
QiNiu.prototype.upload = function() {
    var mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
    /*上传凭证*/
    var options = {
        scope: this.bucket,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    console.log(this.zone);
    config.zone = qiniu.zone[this.zone];
    // var localFile = "./index.png";
    // var stream = fs.createReadStream(localFile);
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var key = Date.now() + '.png';
    // 文件上传
    var imageBuffer = this.getImageBuffer();
    formUploader.put(uploadToken, key, imageBuffer, putExtra, function(respErr, respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            var imageUrl=`http://${this.domain}/${respBody.key}`;
            clipboard.writeText(`![](${imageUrl})`);
            MessageBox.show("图片上传成功，markdown的地址已经在剪贴板！");
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            throw new Error(`${respBody.error},请检查bucket，accessKey，secretKey是否填写正确！`);
        }
    }.bind(this));
}
util.inherits(QiNiu, UploadBase);

module.exports = QiNiu;