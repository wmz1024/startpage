var $ = mdui.$;
var inst1 = new mdui.Dialog('#dialog');
function search(api){
    inst1.open();
    localStorage.setItem("search", api);
}
var s = localStorage.getItem("hitokoto");
if (s!=null){
    if(s=='true'){
        document.getElementById("open_h").selected="selected"
    }
    if(s=='false'){
        document.getElementById("close_h").selected="selected"
    }
}
else{
    localStorage.setItem("hitokoto", true);
    document.getElementById("open_h").selected="selected"
}
var s = localStorage.getItem("mail");
if (s!=null){
    if(s=='gmail'){
        document.getElementById("mail3").selected="selected"
    }
    if(s=='n163'){
        document.getElementById("mail1").selected="selected"
    }
    if(s=='qicq'){
        document.getElementById("mail2").selected="selected"
    }
}
else{
    localStorage.setItem("mail", 'gmail');
    document.getElementById("mail3").selected="selected"
}