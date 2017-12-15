const host_port='http://10.41.12.95:8081/partnerManager';
export default function ajax(url,params,method) {
    params=formdataStr(params);

       var xhr=new XMLHttpRequest();

    xhr.open(method||"POST",host_port+url,true);
   xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
    xhr.withCredentials=true;
    xhr.send(params);
    return new Promise(function (res,rej) {
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4){
                var data=xhr.responseText;
                if(data){
                    data=JSON.parse(data)
                }
                if(xhr.status==200) {
                    if (data.rtnCode == "00000000") {
                        res(data);
                    } else{
                        rej(data);
                    }
                }else{
                    rej(data);
                }
            }
        }
    })
}
function formdataStr(params){
    var str="";
    for(var i in params){
        if(params.hasOwnProperty(i)) {
            str = str + i + "=" + params[i]+"&"
        }
    }
    str=str.slice(0,-1);
    return str;
}