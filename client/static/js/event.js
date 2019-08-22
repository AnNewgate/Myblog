// 根据浏览器创建XHR对象
function createXHR(){
    if(typeof XMLHttpRequest != "undefined"){
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject != "undefined"){
        if(typeof arguments.callee.activeXString != "undefined"){
            var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i , len;
            for(i = 0, len = versions.length; i < len; i++){
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                }catch(ex){
                    console.log("创建XHR对象失败"+ex);
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }else{
        throw new Error("No XHR object available.");
    }
}

// 向URL里面封装参数，用于get请求
function addURLParam(url, name, value){
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

// 点击点赞按钮触发的事件
function addLikeNum(){
    var likeNum = document.getElementById("likeNum");
    var num = parseInt(likeNum.innerHTML);
    var artInfo = document.getElementById("articleInfo").getAttribute("data-art").split("-");
    var xhr = createXHR();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if((xhr.status >= 200) && (xhr.status < 300) || xhr.status == 304){
                var response = JSON.parse(xhr.responseText);
                if(response["Code"] == 1){
                    likeNum.innerHTML = num + 1;
                }else{
                    var message = document.getElementById("message");
                    message.style.display = "block";
                    setTimeout(function(){message.style.display = "none";},2000);
                }
            }else{
                console.log("Requset was unsuccessful: " + xhr.status);
            }
        }
    };

    var url = "/action/addLikeNum";
    // 为url添加参数
    url = addURLParam(url, "art_class", artInfo[0]);
    url = addURLParam(url, "art_Id", artInfo[1]);
    xhr.open("get", url, false);
    xhr.send(null);
}

window.onload = function(){
    var addLikeNumButton = document.getElementById("addLikeNum");
    if (addLikeNumButton.addEventListener) { // 所有主流浏览器，除了 IE 8 及更早版本
        addLikeNumButton.addEventListener("click", addLikeNum, false);
    } else if (addLikeNumButton.attachEvent) { // IE 8 及更早版本
        addLikeNumButton.attachEvent("onclick", addLikeNum);
    }
}

