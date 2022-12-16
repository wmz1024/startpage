if (localStorage.getItem("c4")==null){
    if (localStorage.getItem("c4")==""){
packasona = eval("packJson = ["+localStorage.getItem("c4")+"];")
for(var pa in packasona){//遍历json数组时，这么写p为索引，0,1
    var m2 = packasona[pa]
    fetch("/assets/plugin/"+m2.name+".json").then(function(a){return a.json()}).then(function(a){document.getElementById("plugin").innerHTML=document.getElementById("plugin").innerHTML+a.body;}).catch(err => console.log('Request Failed', err));
}}}