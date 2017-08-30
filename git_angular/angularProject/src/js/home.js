setTimeout(function(){
    var car=document.getElementById("carousel");
    var divs=document.getElementById("content").getElementsByTagName("div");
    var lis=document.getElementById("control").getElementsByTagName("li");
    var oL=document.getElementById("aL");
    var oR=document.getElementById("aR");
    var cur_index=0;
    var t=setInterval(move,2000);
    function move(){
        divs[cur_index].className="";
        lis[cur_index].className="";
        cur_index++;
        if(cur_index==divs.length){
            cur_index=0;
        }
        divs[cur_index].className="current";
        lis[cur_index].className="sel";
    }
    car.onmouseover=function(){
        clearInterval(t);
        oL.style.display="block";
        oR.style.display="block";
    };
    car.onmouseout=function(){
        t=setInterval(move,2000);
        oL.style.display="none";
        oR.style.display="none";
    };
    for(var i=0;i<lis.length;i++){
        lis[i]._index=i;
        lis[i].onclick=function(){
            lis[cur_index].className="";
            divs[cur_index].className="";
            this.className="sel";
            divs[this._index].className="current";
            cur_index=this._index;
        };
    }
    oR.onclick=function(){
        move();
    };
    oL.onclick=function(){
        moveLeft();
    };
    function moveLeft(){
        divs[cur_index].className="";
        lis[cur_index].className="";
        cur_index--;
        if(cur_index==-1){
            cur_index=divs.length-1;
        }
        divs[cur_index].className="current";
        lis[cur_index].className="sel";
    }
},1);
