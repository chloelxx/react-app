export default function parseUrl(url){
    let params=url.slice(url.indexOf("?")+1),obj={},key="",value="";
    while(params){
        key=params.slice(0,params.indexOf("="));
        if(params.indexOf("&")>-1){
            params=params.slice(params.indexOf("&")+1);
            value=params.slice(params.indexOf("=")+1,params.indexOf("&"));
        }else{
            value=params.slice(params.indexOf("=")+1);
            params="";
        }
        obj[key]=value;
    }
    return obj;
}
