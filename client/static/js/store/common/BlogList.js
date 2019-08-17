var EventEmitter = require('events').EventEmitter;
var fetch = require("node-fetch");
 
class Store_BlogList extends EventEmitter {
    constructor() {
        super();
        this.allItem = null;
        /*
       注意: 在派生的类中, 在你可以使用'this'之前, 必须先调用super()。
       忽略这, 这将导致引用错误。
       */
    }

    getAllItem(artclass,callback) {
        var self = this;
        fetch(
            `/data/getBlogList?artclass=${artclass}`
            // , {
            //     headers : { 
            //       'Content-Type': 'application/json',
            //       'Accept': 'application/json'
            //      }
            //   }
        )
        .then(function(res) {
            if (res.ok) {
                res.json().then(function(data) {
                    self.allItem = data;
                    callback(self.allItem);
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function(e) {
            console.log("Fetch failed!", e);
        });
    }
}
 
module.exports = new Store_BlogList();