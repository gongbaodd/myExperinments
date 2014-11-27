window.onload = function(){
    maker($("#pics"),10);
    show($("#examples"),30);
    var i=0;
    var m = setInterval(function(){
        moveTo($("#pics").childNodes[0],i++%10);
    },3000);
    var navs = $("#pics").childNodes[1].childNodes[0].childNodes;
    [].forEach.call(navs,function(elem,index,arr){
        elem.onclick = function(){
                moveTo($("#pics").childNodes[0],index);
                i = index;
        };
    })
}
