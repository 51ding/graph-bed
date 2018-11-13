var fs = require("fs");
var {
    BrowserWindow
} = require("electron");

const CONFIG_FILE_NAME = "config.json";
class Config {
    constructor() {
        this.load();
    }
    load() {
        this.map = new Map();
        fs.readFile(CONFIG_FILE_NAME, "utf8", function(err, data) {
            //文件不存在
            var configData
            if (err) {
                configData = {};
                fs.writeFile(CONFIG_FILE_NAME, JSON.stringify(configData), () => {
                    this.config = {};
                })
            } else {
                configData = JSON.parse(data);
                this.config = configData;
                for (let key in configData) {
                    this.map.set(key, configData[key]);
                }
            }
        }.bind(this))
    }
    get(key) {
        return this.map.get(key);
    }
    set(key, data) {
        console.log(key, data);
        this.map.set(key, data);
        this.config[key] = data;
        fs.writeFile(CONFIG_FILE_NAME, JSON.stringify(this.config), "utf8", function() {
            BrowserWindow.getFocusedWindow().close();
        })
    }
    static getInstance() {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
}
module.exports = Config;