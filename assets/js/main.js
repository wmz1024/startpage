var s = localStorage.getItem("search");
if (s == "bing") { document.getElementById("searchbox").action = "/assets/html/bing.html" }
if (s == "baidu") { document.getElementById("searchbox").action = "/assets/html/baidu.html"}
if (s == "google") { document.getElementById("searchbox").action = "/assets/html/google.html" }
if (s == "duckduckgo") { document.getElementById("searchbox").action = "/assets/html/duckduckgo.html" }
else{
    document.getElementById("searchbox").action = "/assets/html/baidu.html" 
}