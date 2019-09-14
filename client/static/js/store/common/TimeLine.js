var EventEmitter = require('events').EventEmitter;
var fetch = require("node-fetch");
 
class Store_TimeLine extends EventEmitter {
    constructor() {
        super();
        this.allItem = null;
        /*
       注意: 在派生的类中, 在你可以使用'this'之前, 必须先调用super()。
       忽略这, 这将导致引用错误。
       */
    }

    getAllItem(callback) {
        var self = this;
        fetch(
            "/data/getTimeLine/"
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

    // getAllItem(){
    //     var promise = new Promise((resolve, reject) => {
    //         var self = this;
    //         fetch(
    //             "/data/getTimeLine/"
    //         ).then(function (res) {
    //                 if (res.ok) {
    //                     console.log("查询成功！");
    //                     res.json().then(function (data) {
    //                         self.allItem = data;
    //                         console.log(self.allItem);
    //                         resolve(self.allItem);
    //                     });
    //                 } else {
    //                     console.log("Looks like the response wasn't perfect, got status", res.status);
    //                 }
    //             }, function (e) {
    //                 console.log("Fetch failed!", e);
    //             });
    //     });
    //     return promise;
    // }
}
 
export default new Store_TimeLine();