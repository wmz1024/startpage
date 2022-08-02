var $ = mdui.$;
var inst1 = new mdui.Dialog('#dialog');
function search(api){
    inst1.open();
    localStorage.setItem("search", api);
}
var s = localStorage.getItem("hitokoto");
if (s!=null){
    if(s==true){
        document.getElementById("open_h").selected="selected"
    }
    if(s==false){
        document.getElementById("close_h").selected="selected"
    }
}
else{
    localStorage.setItem("hitokoto", true);
    document.getElementById("open_h").selected="selected"
}