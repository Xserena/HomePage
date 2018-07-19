// 运动函数
function run(obj,attr,target,fn){ 
  clearInterval(obj.timer);
  obj.timer = setInterval(function(){
    var cur = 0;
    if(attr == "opacity"){
      cur = Math.round(parseFloat(getstyle(obj,attr))*100);
    }else{
      cur = parseInt(getstyle(obj,attr));
    }
    var speed = (target-cur)/8;
    speed = speed>0?Math.ceil(speed):Math.floor(speed);         
    if(cur == target){
      clearInterval(obj.timer);
        if(fn){
          fn();
        }
    }else{
      if(attr == "opacity"){
            obj.style.filter = "alpha(opacity="+(cur+speed)+")";
          obj.style.opacity = (cur+speed)/100;
        }
        else{
        obj.style[attr] = cur + speed + "px";
        }
    }         
  },30)
}
// 获取样式
function getstyle(obj,name){
  if(obj.currentStyle){
    return obj.currentStyle[name];
  }else{
    return getComputedStyle(obj,false)[name];
  }
}
//跨浏览器获取滚动条位置
function getScroll() {
  return{
      top:document.documentElement.scrollTop||document.body.scrollTop,
      left:document.documentElement.scrollLeft||document.body.scrollLeft
  }
}
//跨浏览器获取滚动条宽度
function scrollW() {
  return getInner().width-document.documentElement.offsetWidth||getInner().width-document.body.offsetWidth
    
}
//获取浏览器视口大小
function getInner() {
  if (typeof window.innerWidth!='undefined'){
      return{
          width:window.innerWidth,
          height:window.innerHeight
      }
  }else {
      return{
          width:document.documentElement.clientWidth||document.body.clientWidth,
          height:document.documentElement.clientHeight||document.body.clientHeight
      }
  }
}

// 拖拽
function drag(obj) {
  obj.onmousedown=function (e){  
    var e=e||window.event;
    var diffX=e.clientX-obj.offsetLeft;
    var diffY=e.clientY-obj.offsetTop;
    document.onmousemove=function (e) {
      var e=e||window.event;
      var left=e.clientX-diffX;
      var top=e.clientY-diffY;
      if (left<0) {
        left=0;
      }else if(left<=getScroll().left){
        left=getScroll().left
      }else if (left>=getInner().width-scrollW()-obj.offsetWidth){
          left=getInner().width-scrollW()-obj.offsetWidth;
      }
      if (top<0){
        top=0;
      }else if(top<=getScroll().top){
        top=getScroll().top
      }else if (top>getInner().height+getScroll().top-obj.offsetHeight){
        top=getInner().height+getScroll().top-obj.offsetHeight;
      }
      obj.style.left=left+'px';
      obj.style.top=top+'px';      
    };
    document.onmouseup=function(e){
    var e=e||window.event;
    if (obj.offsetLeft<(getInner().width+getScroll().left)/2) {
      if(obj.offsetLeft<obj.offsetTop) {
        obj.style.left=0;
      } else if(obj.offsetLeft>=obj.offsetTop){
        obj.style.top=getScroll().top+'px';
      }
    }else{
      if((getInner().width+getScroll().left)-obj.offsetLeft<obj.offsetTop) {
        obj.style.left=getInner().width-scrollW()-obj.offsetWidth+'px';
      } else {
        obj.style.top=getScroll().top+'px';
      }
    }   
    document.onmousemove=null;
    document.onmouseup=null;
    }    
  }   
}

// 去除首尾空字符
function trim(str){
  var str1=str.replace(/^\s+/,'');
  var str2=str1.replace(/\s+$/,'');
  return str2;
}

//添加事件
function addEvent(obj,type,fn){//添加事件监听，三个参数分别为 对象、事件类型、事件处理函数，默认为false
  if (obj.addEventListener) {
    obj.addEventListener(type,fn,false);//非IE
  } else{
    obj.attachEvent('on'+type,fn);//ie,这里已经加上on，传参的时候注意不要重复加了
  }
}

// 获取时间
function getTime() {
  var date=new Date();
  allDate={
    "Year":date.getFullYear(),
    "Month": date.getMonth() + 1, // 月份
    "Date": date.getDate(), // 日
    "Hours": (function () {
      if (date.getHours()<10) {
        return ('0'+date.getHours());
      }else{
        return date.getHours();
      }
    })(), // 小时    
    "Minutes":(function () {
      if (date.getMinutes()<10) {
        return ('0'+date.getMinutes());
      }else{
        return date.getMinutes();
      }
    })(), // 分
    "Seconds": date.getSeconds(), // 秒
  };
  return (allDate['Year']+'年'+allDate['Month']+'月'+allDate['Date']+'日'+' '+allDate['Hours']+':'+allDate['Minutes']) 
}

//设置旋转
function trans(obj,num,speed) {
  clearInterval(timer);
  var i = 0;
  var timer;
  timer=setInterval(function () {
    i+=speed;  
    if(i==360){
      clearInterval(timer);
    }
    obj.style.transform = "rotate(" + (num+i)+ "deg)";
  },10);
  timer;
}