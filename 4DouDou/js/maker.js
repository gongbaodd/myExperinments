Array.prototype.forEach = Array.prototype.forEach || function(callback) {
    var i = 0;
    while (i < this.length) {
      callback.call(this[i],this[i], i,this);
      i++;
    }
};
function $(){
    var dom  = arguments[0];
    if(/^#.*/){
        return document.getElementById(dom.slice(1));
    }else if(/^\..*/){
        return document.getElementsByClassName(dom.slice(1));
    }
    else{
        return document.getElementsByTagName(dom.slice(1));
    }
}

function maker(elem,count){
    var HTML = "<ul>";
    var NAV  = "<div class='nav'><div>";
    for(var  i=1;i<count+1;i++){
        if(i==1){
            NAV  += "<s class='selected'></s>";
            HTML += "<li><a href='#'><img src='img/"+i+".jpg'></a></li>";
            continue;
        }
        HTML += "<li><a href='#'><img src='img/"+i+".jpg'></a></li>";
        NAV  += "<s></s>";
    }
    HTML += "</ul>";
    NAV += "</div></div>";
    HTML += NAV;

    elem.innerHTML = HTML;
    elem.childNodes[0].style.width = 1150*count+"px";

}
function run(elem,start,end,span){
    if(start>end){
        setTimeout(function(){
            start -= span;
            elem.style.left = start+"px";
            run(elem,start,end,span);
        },10);
    }else if(start<end){
        setTimeout(function(){
            start += span;
            elem.style.left = start+"px";
            run(elem,start,end,span);
        },10);
    }
}
function moveTo(elem,index){
    var start = elem.style.left!=""?elem.style.left:"0px";
    start = parseInt(start.substr(0,start.length-2));
    if(start%1150!=0){
        return ;
    }
    var end = -1*index*1150;
    var span= Math.abs(end-start)/100;
    var navs = $("#pics").childNodes[1].childNodes[0].childNodes;
    [].forEach.call(navs,function(e,i,arr){
        if(e.className == "selected"){
            e.className = "";
        }
        if(i==index){
            e.className = "selected";
        }
    });
    run(elem,start,end,span);
}
function show(elem,count){
    var HTML = "<ul>";
    for(var  i=1;i<count+1;i++){
        HTML += "<li><a href='#"+i+"'><img src='small/"+i+".jpg'></a></li>";
    }
    HTML += "</ul>";

    elem.innerHTML = HTML;
    var children = elem.childNodes[0].childNodes;
    for(var i=1;i<count+1;i++){
        (function(i){
            children[i-1].onclick = function(e){
                e = e||window.event;
                console.log(e.srcElement.scrollTop);
                e.pageY =e.pageY || e.clientY;
                $("#hover").style.height = document.body.offsetHeight+"px";
                $("#hover").style.display = "block";
                if($("#hover").childNodes[1]){
                    $("#hover").childNodes[1].childNodes[1].src = "bigger/"+i+".jpg";
                    $("#hover").childNodes[1].style.marginTop =  e.pageY+"px";
                }else{
                    $("#hover").childNodes[0].childNodes[0].src = "bigger/"+i+".jpg";
                    $("#hover").childNodes[0].style.marginTop =  e.pageY+"px";
                }
                $("#close").onclick = function(){
                    $("#hover").style.display = "none";
                }
            }
        })(i)
    }
}
