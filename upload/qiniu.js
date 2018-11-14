var qiniu = require("qiniu");
var Config = require("../config");
var UploadBase = require("./uploadBase");
var util = require("util");

function QiNiu() {
    this.config = Config.getInstance().get("qiniu");
    console.log(this.config);
    this.accessKey = this.config.accessKey;
    this.secretKey = this.config.secretKey;
    this.domain = this.config.domain;
    this.bucket = this.config.bucket;
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
    config.zone = qiniu.zone.Zone_z0;
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
            console.log(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            throw new Error(`${respBody.error},请检查bucket，accessKey，secretKey是否填写正确！`);
        }
    });
}
util.inherits(QiNiu, UploadBase);

module.exports = QiNiu;