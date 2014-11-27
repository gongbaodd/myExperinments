var doge = document.getElementById("doge");
var tds   = document.querySelectorAll('td');
var dragSrcEl = null;
var img = document.createElement('img');
img.src="doge2.jpg";

function Handle_DragStart(e){
    this.style.opacity = '0';
    dragSrcEl = this.parentNode;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html',dragSrcEl.innerHTML);
    //e.dataTransfer.setDragImage(img,50,50);
}
function Handle_DragOver(e){
    if(e.preventDefault){
        e.preventDefault();
    }
    if(!this.classList.contains("road")){
            window.location.href = "fail.html";
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}
function Handle_DragEnter(e){
    //console.log("drag_enter");
    this.classList.add('over');
}
function Handle_DragLeave(e){
    //console.log("drag_leave");
    this.classList.remove('over');
}
function Handle_Drop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if(e.preventDefault){
        e.preventDefault();
    }

    if(dragSrcEl != this){
        dragSrcEl.innerHTML = "";
        this.innerHTML = e.dataTransfer.getData('text/html');
        doge = document.getElementById("doge");
        doge.style.opacity = "1";
    }

    if(this.id != "ok"){
        this.removeEventListener('dragover',Handle_DragOver,false);
        window.location.href = "fail.html";
    }else{
        alert("You win");
    }
    // var files = e.dataTransfer.files;
    // for(var i=0,f;f=files[i];i++){
    //     console.log(f);
    // }
    return false;
}
function Handle_DragEnd(e) {
  [].forEach.call(tds, function (tds) {
    tds.classList.remove('over');
  });
}
doge.addEventListener('dragstart',Handle_DragStart,false);
doge.addEventListener('dragend',Handle_DragEnd,false);

[].forEach.call(tds,function(e){
    e.addEventListener('dragenter',Handle_DragEnter,false);
    e.addEventListener('dragleave',Handle_DragLeave,false);
    e.addEventListener('drop',Handle_Drop,false);
    e.addEventListener('dragover',Handle_DragOver,false);
})
