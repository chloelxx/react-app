export default function ajax(url,method,params) {
    console.log("url,method,params:",url,method,params)
    var xhr=new XMLHttpRequest();
    xhr.open(method,url,true);
    xhr.setRequestHeader("Content-Type","application/json;charset=utf-8");
    xhr.send(params);
    return new Promise(function (res,rej) {
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4){
                if(xhr.status==200){
                    console.log("200")
                   res();
                }else{
                    console.log("xhr:",xhr.status)
                   rej();
                }
            }
        }

    })
}