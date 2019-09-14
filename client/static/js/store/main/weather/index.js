var EventEmitter = require('events').EventEmitter;
var fetch = require("node-fetch");
 
class Store_WeatherInfo extends EventEmitter {
    constructor() {
        super();
        this.info = null;
        /*
       注意: 在派生的类中, 在你可以使用'this'之前, 必须先调用super()。
       忽略这, 这将导致引用错误。
       */
    }

    getWeatherInfo(callback) {
        var self = this;
        fetch(
            `/data/getWeatherInfo`
        )
        .then(function(res) {
            if (res.ok) {
                res.json().then(function(data) {
                    self.info = data;
                    //console.log(data);
                    callback(self.info);
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function(e) {
            console.log("Fetch failed!", e);
        });
    }
}
 
export default new Store_WeatherInfo();