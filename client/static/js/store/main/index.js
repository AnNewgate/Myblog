var EventEmitter = require('events').EventEmitter;
 
class Store_MessageList extends EventEmitter {
    constructor() {
        super();
        this.allData = null;
        /*
       注意: 在派生的类中, 在你可以使用'this'之前, 必须先调用super()。
       忽略这, 这将导致引用错误。
       */
    }

    getAllData(callback) {
        var self = this;
        fetch(
            "/data/getMessage/"
        )
        .then(function(res) {
            if (res.ok) {
                res.json().then(function(data) {
                    self.allData = data;
                    callback(self.allData);
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function(e) {
            console.log("Fetch failed!", e);
        });
    }
}
 
module.exports = new Store_MessageList();