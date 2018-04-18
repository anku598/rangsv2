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


// var slides=document.querySelectorAll('.slide'),tl= new TimelineLite({paused:true});
//     for(var i=slides.length;i--;){
//       var D=document.createElement('div'); D.className='Dot'; D.id='Dot'+i;
//       D.addEventListener('scroll',function(){ tl.seek(this.id).pause() });
//       document.getElementById('Dots').appendChild(D);
//       tl.add('Dot'+i)
//       if(i>0){

//         if(i!=slides.length-1){tl.addPause()}
//         tl.to(slides[i],0.9,{scale:.9,ease:Back.easeOut})
//         .to(slides[i],0.9,{xPercent:-92},'L'+i)
//         .from(slides[i-1],0.9,{xPercent:92},'L'+i)
//         .to('#Dot'+i,0.5,{backgroundColor:'rgba(255,255,255,0.2)'},'L'+i)
//         .set(slides[i],{zIndex:1-i}).set(slides[i-1],{zIndex:slides.length})
//         .from(slides[i-1],0.9,{scale:.9,ease:Back.easeIn})
//       };
//     };
//     function GO(e){
//       var SD=isNaN(e)?e.wheelDelta||-e.detail:e;
//       if(SD<0){tl.play()}else{tl.reverse()};
//     };
    
//     document.addEventListener("mousewheel",GO);
//     document.addEventListener("DOMMouseScroll",GO);
//     document.getElementById('nextBtn').addEventListener("click",function(){GO(-1)});
//     document.getElementById('prevtBtn').addEventListener("click",function(){GO(1)});



{
  class Uncover {
      constructor(el, options) {
          this.DOM = {el: el};
          this.options = {
              // initially covered.
              covered: true,
              // total number of slices.
              slicesTotal: 3,
              // slices color.
              slicesColor: '#fff',
              // 'vertical' || 'horizontal'.
              orientation: 'vertical',
              // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
              // need to define for both show and hide methods.
              // e.g. animate the slices in from left and hide them to the right side (for a horizontal layout)
              slicesOrigin: {
                  show: 'bottom',
                  hide: 'bottom'
              }
          };
          Object.assign(this.options, options);
          this.isCovered = this.options.covered;
          this.layout();
          if ( !this.isCovered ) {
              this.show();
          }
      }
      layout() {
          this.DOM.el.classList.add('uncover');
          let inner = '';
          inner += `<div class="uncover__img" style='background-image: ${this.DOM.el.style.backgroundImage}'></div>
                    <div class="uncover__slices uncover__slices--${this.options.orientation}">`;
          for (let i = 0; i <= this.options.slicesTotal - 1; ++i) {
              inner += `<div class="uncover__slice" style="color:${this.options.slicesColor}"></div>`;
          }
          inner += `</div>`;
          this.DOM.el.innerHTML = inner;
          this.DOM.img = this.DOM.el.querySelector('.uncover__img');
          this.DOM.slices = Array.from(this.DOM.el.querySelectorAll('.uncover__slice'));
          this.slicesTotal = this.DOM.slices.length;
      }
      show(animation = false, animationSettings = {}) {
          if ( !this.isCovered ) return;
          return this.toggle(animation,animationSettings);
      }
      hide(animation = false, animationSettings = {}) {
          if ( this.isCovered ) return;
          return this.toggle(animation,animationSettings);
      }
      toggle(animation,animationSettings) {
          this.isCovered = !this.isCovered;
          if ( !animation ) {
              this.DOM.slices.forEach((slice) => {
                  slice.style.transform = !this.isCovered ? 
                                              this.options.orientation === 'vertical' ? 'translateY(100%)' : 'translateX(100%)' :
                                              'none';
              });
          }
          else {
              let settings = {
                  slices: {
                      targets: this.DOM.slices,
                      duration: 800,
                      delay: (_,i) => i*80,
                      easing: 'easeInOutQuart',
                      translateX: this.options.orientation === 'vertical' ? '0%' : 
                                                                          !this.isCovered ? 
                                                                              this.options.slicesOrigin.show === 'right' ? '100%' : '-100%' : 
                                                                              this.options.slicesOrigin.hide === 'right' ? ['100%','0%'] : ['-100%','0%'],
                                                                            
                      translateY: this.options.orientation === 'vertical' ? 
                                                                          !this.isCovered ? 
                                                                              this.options.slicesOrigin.show === 'bottom' ? '100%' : '-100%' :
                                                                              this.options.slicesOrigin.hide === 'bottom' ? ['100%','0%'] : ['-100%','0%']
                                                                          : '0%'
                  },
                  image: {
                      targets: this.DOM.img
                  }
              };
              Object.assign(settings.slices, animationSettings.slices);
              Object.assign(settings.image, animationSettings.image);
              
              anime.remove(this.DOM.slices);
              anime.remove(this.DOM.img);
              
              let promises = [anime(settings.slices).finished];
              if ( settings.image.duration ) {
                  promises.push(anime(settings.image).finished);
              }
              return Promise.all(promises);
          }
      }
  }
  window.Uncover = Uncover;
}


{
  // the settings for each one of the slides uncover instances.
  const uncoverOpts = [
      {
          // total number of slices.
          slicesTotal: 4,
          // slices color.
          slicesColor: '#111',
          // 'vertical' || 'horizontal'.
          orientation: 'vertical',
          // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
          slicesOrigin: {show: 'top', hide: 'bottom'}
      },
      {
          slicesTotal: 7, 
          slicesColor: '#111', 
          orientation: 'horizontal', 
          slicesOrigin:  {show: 'right', hide: 'right'}
      },
      {
          slicesTotal: 9,
          slicesColor: '#111',
          orientation: 'vertical',
          slicesOrigin:  {show: 'bottom', hide: 'bottom'}
      },
      {
          slicesTotal: 5,
          slicesColor: '#111',
          orientation: 'horizontal',
          slicesOrigin:  {show: 'left', hide: 'left'}
      },
      {
          slicesTotal: 6,
          slicesColor: '#111',
          orientation: 'vertical',
          slicesOrigin:  {show: 'bottom', hide: 'bottom'}
      }
  ];

  class Slideshow {
      constructor(el) {
          this.DOM = {el: el};
          this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
          this.slidesTotal = this.DOM.slides.length;
          this.current = 0;
          this.uncoverItems = [];
          this.DOM.slides.forEach((slide,pos) => this.uncoverItems.push(new Uncover(slide.querySelector('.slide__img'), uncoverOpts[pos])));
          this.init();
      }
      init() {
          this.isAnimating = true;
          this.DOM.slides[this.current].classList.add('slide--current');
          this.uncoverItems[this.current].show(true, {
              image: {
                  duration: 800,
                  delay: 350,
                  easing: 'easeOutCubic',
                  scale: [1.3,1]
              }
          }).then(() => this.isAnimating = false);
      }
      navigate(pos) {
          if ( this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1 ) return;
          this.isAnimating = true;

          this.uncoverItems[this.current].hide(true).then(() => {
              this.DOM.slides[this.current].classList.remove('slide--current');
              this.current = pos;

              const newItem = this.uncoverItems[this.current];
              newItem.hide();
              this.DOM.slides[this.current].classList.add('slide--current');
              newItem.show(true, {
                  image: {
                      duration: 800,
                      delay: 350,
                      easing: 'easeOutCubic',
                      scale: [1.3,1]
                  }
              }).then(() => this.isAnimating = false);
          });
      }
  }
  
  // Preload all the images in the page..
imagesLoaded(document.querySelectorAll('.slide__img'), {background: true}, () => {
      document.body.classList.remove('loading');
      
      const slideshow = new Slideshow(document.querySelector('.slides'));
      
      const pagination = document.querySelector('.pagination');
      const triggers = Array.from(pagination.querySelectorAll('.pagination__item'));
      triggers.forEach((trigger,pos) => {
          if ( pos === 0 ) {
              trigger.classList.add('pagination__item--current');
          }
          trigger.addEventListener('click', () => {
              if ( slideshow.isAnimating ) return;
              slideshow.navigate(pos);
              pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
              trigger.classList.add('pagination__item--current');
          })
      });
  
      document.addEventListener('keydown', (ev) => {
          if ( slideshow.isAnimating ) return;
          const keyCode = ev.keyCode || ev.which;
          let newpos;
          if ( keyCode === 37 ) {
              newpos = slideshow.current > 0 ? slideshow.current-1 : slideshow.slidesTotal-1;
              slideshow.navigate(newpos);
          }
          else if ( keyCode === 39 ) {
              newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
              slideshow.navigate(newpos);
          }
          else return;
          pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
          triggers[newpos].classList.add('pagination__item--current');
      });
  });
}






