export default function ajax(url,method,params) {
    console.log("url,method,params:",url,method,params)
    var xhr=new XMLHttpRequest();
    xhr.open(method,url,true);
    xhr.setRequestHeader("Content-Type","application/json;charset=utf-8");
    xhr.send(params);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4){
            if(xhr.status==200){
                alert("请求成功");
            }else{
                alert("请求失败");
            }
        }
    }
}