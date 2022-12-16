var $ = mdui.$;
//if (typeof navigator.serviceWorker !== 'undefined') {navigator.serviceWorker.register('sw.js')}
var inst1 = new mdui.Dialog('#dialog');
function search(api) {
    inst1.open();
    localStorage.setItem("search", api);
}
var s = localStorage.getItem("hitokoto");
if (s != null) {
    if (s == 'true') {
        document.getElementById("open_h").selected = "selected"
    }
    if (s == 'false') {
        document.getElementById("close_h").selected = "selected"
    }
}
else {
    localStorage.setItem("hitokoto", true);
    document.getElementById("open_h").selected = "selected"
}
var s = localStorage.getItem("mail");
if (s != null) {
    if (s == 'gmail') {
        document.getElementById("mail3").selected = "selected"
    }
    if (s == 'n163') {
        document.getElementById("mail1").selected = "selected"
    }
    if (s == 'qicq') {
        document.getElementById("mail2").selected = "selected"
    }
}
else {
    localStorage.setItem("mail", 'gmail');
    document.getElementById("mail3").selected = "selected"
}
document.getElementById("whoami").innerHTML = localStorage.getItem("username"); document.getElementById("list1").value = localStorage.getItem("list");
function c1() {
    var cache = document.getElementById("list1").value
    if (cache != null) {
        localStorage.setItem("list", cache)
    }
}
function c2() {
    localStorage.setItem("newuser", true)
    window.location.replace("/")
}
var un = localStorage.getItem("newuser")
if (un == null) {
    document.getElementById("title1").innerHTML = "欢迎使用普通的起始页！"
    document.getElementById("title2").innerHTML = "设置您的专属起始页"
    document.getElementById("c002").innerHTML = '<input type="submit" value="开始使用" class="mdui-btn mdui-color-theme-accent mdui-ripple" onclick="c2()" />'
    console.log("Welcome to OOBE!!!")
    document.getElementById("advsetbtn1").innerHTML=""
}
function advset() {
    document.getElementById("advsetting").style=""
}
function checkupdate(){
    const serviceWorker = navigator.serviceWorker;
    serviceWorker.getRegistrations ? serviceWorker.getRegistrations().then(function(sws) {
      sws.forEach(function(sw) {
        sw.unregister();
        console.log('sw unregister 1');
      });
    }) : serviceWorker.getRegistration && serviceWorker.getRegistration().then(function(sw) {
      sw && sw.unregister();
      console.log('sw unregister 2');
    });
    location.reload ()
}
document.getElementById("list2").value = localStorage.getItem("c4");
function c4(){
        var cache = document.getElementById("list2").value
        if (cache != null) {
            localStorage.setItem("c4", cache)
        }
}