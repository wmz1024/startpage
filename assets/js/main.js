var $ = mdui.$;
var s = localStorage.getItem("search");
if(s!=null){
if (s == "bing") { document.getElementById("searchbox").action = "/assets/html/bing.html" }
if (s == "baidu") { document.getElementById("searchbox").action = "/assets/html/baidu.html"}
if (s == "google") { document.getElementById("searchbox").action = "/assets/html/google.html" }
if (s == "duckduckgo") { document.getElementById("searchbox").action = "/assets/html/duckduckgo.html" }
}else{
    document.getElementById("searchbox").action = "/assets/html/baidu.html" 
}
if (localStorage.getItem("hitokoto")=='false'){document.getElementById("hitokoto_text").style="display: none;"}
if(navigator.serviceWorker){
    navigator.serviceWorker.register('/assets/js/sw.js').then(function(reg){
        if(reg.installing){
            console.log('client-installing');
        }else if(reg.active){
            console.log('client-active')
        }
    })
}
if (localStorage.getItem("mail")!=null){
    if(localStorage.getItem("mail")=='n163'){document.getElementById("mailto").href="https://mail.163.com/"}
    if(localStorage.getItem("mail")=='qicq'){document.getElementById("mailto").href="https://mail.qq.com/"}
    if(localStorage.getItem("mail")=='gmail'){document.getElementById("mailto").href="https://gmail.com/"}}else{document.getElementById("mailto").href="https://gmail.com/"}
let date = new Date();
if (localStorage.getItem("username")!=null){var usernametext=localStorage.getItem("username")}else{var usernametext="无名氏"}
if (date.getHours() >= 6 && date.getHours() < 12) {
    mdui.snackbar({
        message: '早上好 '+usernametext,
        position: 'right-bottom',
      });
      
} else if (date.getHours() >= 12 && date.getHours() < 18) {
    mdui.snackbar({
        message: '下午好 '+usernametext,
        position: 'right-bottom',
      });
      
} else {
    mdui.snackbar({
        message: '晚上好 '+usernametext,
        position: 'right-bottom',
      });
      
}
if (typeof navigator.serviceWorker !== 'undefined') {
    navigator.serviceWorker.register('sw.js')
  }
  if(window.navigator.onLine){
    console.log("Network is OK")
  }else{
    mdui.snackbar({
        message: '您已离线！ 请链接互联网 否则资源无法加载',
        position: 'right-bottom',
      });
document.getElementById("hitokoto_text").innerHTML="您已离线！ 请链接互联网 否则资源无法加载"

  }
