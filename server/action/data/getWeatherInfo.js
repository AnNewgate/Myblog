const https = require('https');
const http = require('http');
var cheerio = require("cheerio");

function getWeatherImgPromise(q) {
    if(q==""){
        q="广州";
    }
    var url = "http://www.ivsky.com/search.php?q=" + q;
    var getWeatherImgPromise = new Promise(function (resolve, reject) {
        http.get(url, function (res) {
            var data = "";
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                var $ = cheerio.load(data);
                var imgSrc = [];
                var imgs = $("img");
                for (let i = 0; i < 9; i++) {
                    imgSrc.push(imgs[i].attribs.src);
                }
                resolve(imgSrc);
            });
        }).on("error", function (err) {
            console.log(err);
            reject(err);
        })
    });
    return getWeatherImgPromise;
}

function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};

function getClientCity(clientIp) {
    var cityinfo = {};
    let key = "5mAXylRo6iSK6dvcMsKeSpqEpLKMOx3p";
    var getClientCityPromise = new Promise(function (resolve, reject) {
        http.get(`http://api.map.baidu.com/location/ip?ip=${clientIp}&ak=${key}&coor=bd09ll`, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                //console.log(JSON.parse(data).data.city + " " + JSON.parse(data).data.city_id);
                if ((resp.statusCode >= 200) && (resp.statusCode < 300) || resp.statusCode == 304) {
                    if (data == '') {
                        reject(cityinfo);
                    } else {
                        if (JSON.parse(data).status == 0) {
                            cityinfo["city_name"] = JSON.parse(data).content.address_detail.city;
                            cityinfo["city_id"] = JSON.parse(data).content.address_detail.city_code;
                        }
                        resolve(cityinfo);
                    }
                } else {
                    var err = {};
                    err["message"] = "接口出现问题，状态码为" + resp.statusCode;
                    reject(err);
                }
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err);
        });
    });

    return getClientCityPromise;
}

function getWeatherInfo(ip) {
    var key = "SKPgMcE6nHXYVTieP"; // 心知天气的API，https://www.seniverse.com/
    let url = `https://api.seniverse.com/v3/weather/now.json?key=${key}&location=${ip}&language=zh-Hans&unit=c`;
    var getWeatherInfoPromise = new Promise(function (resolve, reject) {
        https.get(url, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on("error", (err) => {
            reject(err);
        });
    })

    return getWeatherInfoPromise;
}

exports.execute = function (req, res) {
    var weatherInfo = {};
    var city = {};
    //var ip = getClientIP(req);
    var ip = "148.70.10.107";
    var cityPromise = getClientCity(ip);
    cityPromise.then(function (result) {
        city = result;
        if (JSON.stringify(city) == '{}') {
            weatherInfo["code"] = 1;
            res.send(weatherInfo);
        } else {
            var weatherImgPromise = getWeatherImgPromise(city["city_name"]);
            weatherImgPromise.then(function (result) {
                let i = Math.floor(Math.random()*10);
                weatherInfo["weather_img"] = result[i];
                var weatherInfoPromise = getWeatherInfo(ip);
                weatherInfoPromise.then(function (result) {
                    weatherInfo["code"] = 0;
                    weatherInfo["now"] = result.results[0].now;
                    res.send(weatherInfo);
                }, function (err) {
                    console.log("Error: " + err.message);
                    weatherInfo["code"] = 1;
                    res.send(weatherInfo);
                    //console.log(weatherInfo);
                });
            }, function (err) {
                console.log(err);
                weatherInfo["weather_img"] = "";
                var weatherInfoPromise = getWeatherInfo(city["city_name"]);
                weatherInfoPromise.then(function (result) {
                    weatherInfo["code"] = 0;
                    weatherInfo["now"] = result.results[0].now;
                    res.send(weatherInfo);
                }, function (err) {
                    console.log("Error: " + err.message);
                    weatherInfo["code"] = 1;
                    res.send(weatherInfo);
                    //console.log(weatherInfo);
                });
            });
        }
    }, function (err) {
        console.log("Error: " + err.message);
        weatherInfo["code"] = 1;
        res.send(weatherInfo);
    });
};