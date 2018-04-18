//show and hide topbtn
function yScroll() {

  var yPos = window.pageYOffset;

  if (yPos >= window.innerHeight - 5) {
    document.getElementById("topbtn").style.opacity = 1;
  } else {
    document.getElementById("topbtn").style.opacity = 0;
  }
}

//scroll to top
function goTop () {
  let topbtn = document.getElementById('topbtn');
  let top = window.pageYOffset;

  var intervalTimer = setInterval(function() {
    if (top > 0) {
      top -= 15;
      window.scrollTo(0, top);
    } else {
      topbtn.style.opacity = 0;
      clearInterval(intervalTimer);
    }
  }, 0.5);
}

function showAnimate(arrivePoint) {
  let flag = true;
  let timer = setInterval(function() {

    let icur = window.pageYOffset;
    //Buffer movement, speed change at any time
    let speed = (arrivePoint - icur) / 12;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//Take integer speed
    if (icur || icur == 0) {
      window.scrollTo(0, icur + speed);
    }
    if (arrivePoint !== icur) {
      flag = false;
    } else {
      flag = true;
    }

    if (flag) {
      clearInterval(timer);
      isComplete = true;
    }
  },13);
}

function titleShow() {
  let Ospan = document.getElementsByTagName("span");
  let p = window.pageYOffset + window.innerHeight;
  let q = window.pageYOffset + window.innerHeight*2;
  for (let i = 0; i<Ospan.length; i++)
  {
    if (p < Ospan[i].offsetTop && Ospan[i].offsetTop < q) {
      Ospan[i].style.opacity = 1;
    }
  }
}

var isComplete = true;

function wheel (e){

  if(isComplete == true){ //Prevent multiple repeat function

    isComplete = false;

    if (e.wheelDelta) {  //IE,Chrome MouseScroll
      stopScroll();
      if (e.wheelDelta > 0) { //When the pulley rolls up
        let arrivePoint = window.pageYOffset - window.innerHeight;
        //arrivePoint cannot be negative
        arrivePoint = arrivePoint < 0 ? 0 :arrivePoint;
        showAnimate(arrivePoint);
        }

        if (e.wheelDelta < 0) { //When the pulley rolls down
          let arrivePoint = window.pageYOffset + window.innerHeight;
          //maximum rolling point
          let maxBottom = document.body.offsetHeight - window.innerHeight;
          //If arrivePoint exceeds the maximum rolling point, then arrivePoint equals the maximum rolling point
          arrivePoint = arrivePoint > maxBottom ? maxBottom : arrivePoint;
          showAnimate(arrivePoint);
          titleShow();
        }
      }
      else if (e.detail) {  //Firefox MouseScroll
      if (e.detail< 0) { //When the pulley rolls up
        let arrivePoint = document.documentElement.scrollTop - window.innerHeight;
        //arrivePoint cannot be negative
        arrivePoint = arrivePoint < 0 ? 0 :arrivePoint;
        showAnimate(arrivePoint);
      }
      if (e.detail> 0) { //When the pulley rolls down
        let arrivePoint = document.documentElement.scrollTop + window.innerHeight;
        let maxBottom = document.body.offsetHeight - window.innerHeight;
        //If arrivePoint exceeds the maximum rolling point, then arrivePoint equals the maximum rolling point
        arrivePoint = arrivePoint > maxBottom ? maxBottom : arrivePoint;
        showAnimate(arrivePoint);
        titleShow();
      }
    }
  }
}

//Bubble prevention
function stopScroll() {
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }
  var oldonwheel, oldonmousewheel1, oldonmousewheel2, oldontouchmove, oldonkeydown
      , isDisabled;
  (function disableScroll() {
    if (window.addEventListener) // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, true);
    oldonwheel = window.onwheel;
    window.onwheel = preventDefault; // modern standard

    oldonmousewheel1 = window.onmousewheel;
    window.onmousewheel = preventDefault; // older browsers, IE
    oldonmousewheel2 = document.onmousewheel;
    document.onmousewheel = preventDefault; // older browsers, IE

    oldontouchmove = window.ontouchmove;
    window.ontouchmove = preventDefault; // mobile

    oldonkeydown = document.onkeydown;
    document.onkeydown = preventDefaultForScrollKeys;
    isDisabled = true;
  })();
}

document.addEventListener("scroll", yScroll);  //control topbtn'opacity
document.addEventListener('DOMMouseScroll', wheel, true); //firefox
document.addEventListener('mousewheel', wheel, true); //chrome, IE




/** Slider Js  */


var slides=document.querySelectorAll('.slide'),tl= new TimelineLite({paused:true});
    for(var i=slides.length;i--;){
      var D=document.createElement('div'); D.className='Dot'; D.id='Dot'+i;
      D.addEventListener('scroll',function(){ tl.seek(this.id).pause() });
      document.getElementById('Dots').appendChild(D);
      tl.add('Dot'+i)
      if(i>0){

        if(i!=slides.length-1){tl.addPause()}
        tl.to(slides[i],0.9,{scale:.9,ease:Back.easeOut})
        .to(slides[i],0.9,{xPercent:-92},'L'+i)
        .from(slides[i-1],0.9,{xPercent:92},'L'+i)
        .to('#Dot'+i,0.5,{backgroundColor:'rgba(255,255,255,0.2)'},'L'+i)
        .set(slides[i],{zIndex:1-i}).set(slides[i-1],{zIndex:slides.length})
        .from(slides[i-1],0.9,{scale:.9,ease:Back.easeIn})
      };
    };
    function GO(e){
      var SD=isNaN(e)?e.wheelDelta||-e.detail:e;
      if(SD<0){tl.play()}else{tl.reverse()};
    };
    
    document.addEventListener("mousewheel",GO);
    // document.addEventListener("DOMMouseScroll",GO);
    // document.getElementById('nextBtn').addEventListener("click",function(){GO(-1)});
    // document.getElementById('prevtBtn').addEventListener("click",function(){GO(1)});






