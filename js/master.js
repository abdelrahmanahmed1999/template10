/*global $,alert ,console*/

$(function(){
  "use strict";

  //trigger niceScroll
  $('html').niceScroll({
      cursorcolor:"#ff4008",
      cursorborder: '1px solid #ff4008',    
  });

  //adjust header height
  $('.landing').height($(window).height());
  $(window).resize(function(){
      "use strict";
      $('.landing').height($(this).height());
  });
});

//start javascript

let customcolor=localStorage.getItem('option-box'),
    customimage=localStorage.getItem('random-image');
let stop,
    statusinterval=true;

//search localstorage if user select color to be main color

if(customcolor !== null){
  document.documentElement.style.setProperty('--main-color',customcolor);
  document.querySelectorAll('.setting-cont ul li').forEach(li =>{
    li.classList.remove('active');
    if(li.getAttribute('data-color') == customcolor){
      li.classList.add('active');
    }
  });
}


//start localstorage if user select any option for random background image

if(customimage !==null){
    //if to stop inerval
      if(customimage === 'false'){
        statusinterval=false;
      }
      else{
        statusinterval=true;
        randombackgroundimage();
      }
//loop to remove class active from button and put class at button which is chosen

    document.querySelectorAll('.setting-cont .random-back button').forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('data-option') === customimage){
          btn.classList.add('active');
        }
      });
}

//start search localstorage if any option bullet exist

let localbulletoption=localStorage.getItem('option-bullet'),
    putactivetobutton=document.querySelectorAll('.option-bullet button');  
  if(localbulletoption !== null){
    if((localbulletoption) == 'true'){
      document.querySelector('.nav-bullet').style.display="block";
    }
    else{
      document.querySelector('.nav-bullet').style.display="none";
    }
    putactivetobutton.forEach(elem =>{
      elem.classList.remove('active');
      if(elem.getAttribute('data-option') ==  localbulletoption){
        elem.classList.add('active');
      }
    });  
  }

  //start local storage if there is navbar option

  let localnavbar=localStorage.getItem('option-navbar'),
      navbar=document.querySelectorAll('.option-navbar button');

  if(localnavbar !== null){
    if(localnavbar == 'true'){
      document.querySelector('nav').classList.add('navbar-fixed-top');
    }
    else{
      document.querySelector('nav').classList.remove('navbar-fixed-top');
    }
    navbar.forEach( btn => {
      btn.classList.remove('active');
      if(btn.getAttribute('data-option') == localnavbar){
        btn.classList.add('active');
      }
    });
  }

//start toggle setting

document.querySelector('.icon i').onclick=function(){
  'use strict';
  this.classList.toggle ('fa-spin');
  document.querySelector('.setting-box').classList.toggle('open');
}

//start change color option box

let listli=document.querySelectorAll('.setting-cont ul li');

listli.forEach(li => {
  li.addEventListener ('click', (e)=>{
      document.documentElement.style.setProperty('--main-color',e.target.getAttribute('data-color'));
      localStorage.setItem('option-box',e.target.getAttribute('data-color'));
     e.target.parentElement.querySelectorAll('li').forEach(liact=>{
        liact.classList.remove('active');
      });
      e.target.classList.add('active');
  });
});

//start random background option box

let button=document.querySelectorAll('.setting-cont .random-back button');

button.forEach(btn =>{
  btn.addEventListener('click', (e)=>{
    e.target.parentElement.querySelectorAll('button').forEach(butt=>{
      butt.classList.remove('active');
    });
    e.target.classList.add('active');
    if(e.target.getAttribute('data-option') === 'true'){
      statusinterval=true
      localStorage.setItem('random-image',true);
      randombackgroundimage();
    }
    else{
      statusinterval=false
      clearInterval(stop);
      localStorage.setItem('random-image',false);
    }
  });
});

//start navabr fixed

let navbarfixed=document.querySelectorAll('.option-navbar button'),
    nav=document.querySelector('nav');

navbarfixed.forEach(elem =>{
elem.addEventListener('click',(e)=>{
    navbarfixed.forEach(btn=>{
      btn.classList.remove('active');
      if(btn.getAttribute('data-option') == e.target.getAttribute('data-option')){
        e.target.classList.add('active');
      }
    });
    if(e.target.getAttribute('data-option') == 'true'){
      nav.classList.add('navbar-fixed-top');
      localStorage.setItem('option-navbar','true');
    }
    else{
      nav.classList.remove('navbar-fixed-top');
      localStorage.setItem('option-navbar','false');
    }
  });
});

//start reset option 

document.querySelector('.reset-option').onclick=function(){
  localStorage.removeItem('random-image');
  localStorage.removeItem('option-box');
  localStorage.removeItem('option-bullet');
  localStorage.removeItem('option-navbar');
  window.location.reload();
}

//start navbar

let mynavbar=document.querySelectorAll('.scroll li a');

mynavbar.forEach(elem =>{
  elem.addEventListener('click',(e)=>{
    mynavbar.forEach(li=>{
      li.classList.remove('active');
      if(li.getAttribute('data-value') == e.target.getAttribute('data-value')){
        e.target.classList.add('active');
      }
    });
   window.scrollTo({
      top: document.querySelector(`.${e.target.getAttribute('data-value')}`).offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  });
});

//start changing background image

let myarray=[];
for(let i=0;i<5;i++){
  myarray[i]=(i+1)+'.jpg';
}
let changeimage=document.querySelector('.landing');
function randombackgroundimage(){
  if(statusinterval === true){
    stop = setInterval(()=>{
      let randomindex=Math.floor(Math.random() * myarray.length);
      changeimage.style.backgroundImage='url(imgs/'+ myarray[randomindex] +')';
      },1000);
  }
};
randombackgroundimage();

//start option bullet

let optionbullet=document.querySelectorAll('.option-bullet button'),
    navbullet=document.querySelector('.nav-bullet');

optionbullet.forEach(elem => {
  //start remove active from all button and put active on the clicked button
  elem.addEventListener('click',(e)=>{
    optionbullet.forEach(btn=>{
      btn.classList.remove('active');
    });
    e.target.classList.add('active');
    if(e.target.getAttribute('data-option') == 'true'){
      navbullet.style.display='block';
      localStorage.setItem('option-bullet','true');
    }
    else{
      navbullet.style.display='none';
      localStorage.setItem('option-bullet','false');
    }
  });
});

//start nav-bullet

let mybullet=document.querySelectorAll('.nav-bullet .bullet li');

mybullet.forEach(elem => {  
  elem.addEventListener('mouseenter',(e) =>{
    document.querySelector(`#${e.target.getAttribute('data-value')}`).style.visibility='visible';         
  });
  elem.addEventListener('mouseleave',(e)=>{
    document.querySelector(`#${e.target.getAttribute('data-value')}`).style.visibility='hidden';
  });
  elem.addEventListener('click',(e)=>{
    mybullet.forEach(li => {
      li.classList.remove('active');
    });
    e.target.classList.add('active');
    document.querySelector(`.${e.target.getAttribute('data-value')}`).scrollIntoView({
      behavior:'smooth'
    });
  });
});


//start progress

let myskill=document.querySelector('.our-progress');

window.onscroll=function(){
  if(this.pageYOffset > (myskill.offsetTop-myskill.offsetHeight)){
    let myprogress=document.querySelectorAll('.our-progress .progress-bar');
    myprogress.forEach(elem =>{
      elem.style.width = `${elem.getAttribute('aria-valuenow')}%`;
      elem.firstElementChild.textContent = `${elem.getAttribute('aria-valuenow')}%`;
    });
  }
};

//start popup

let myimages=document.querySelectorAll('.images img');

myimages.forEach(img=>{
img.addEventListener('click',(e)=>{
    //create overlay and append it to body and css at file.css at gallery section
    let overlay=document.createElement('div');
    overlay.className='popup-overlay';
    document.body.appendChild(overlay);
      //create div and append it to body and css at file.css at gallery section and put image,heading,span in its
    let popdiv =document.createElement('div');
        //append popdiv to body
        document.body.appendChild(popdiv);
        popdiv.className='pop-div';
    let popimages=document.createElement('img');
        //append image to popdiv
        popdiv.appendChild(popimages);
        popimages.src= e.target.getAttribute('src');
    let  imageheading  =document.createElement('h3');
        //append heading to popdiv
        imageheading.className='imageheading';
        let headingtext=document.createTextNode(e.target.getAttribute('alt'));
        imageheading.appendChild(headingtext);
        if(headingtext !== null){
          popdiv.appendChild(imageheading);
        }
    let  closepopdiv   =document.createElement('span');
        //append span to popdiv
        popdiv.appendChild(closepopdiv);
        closepopdiv.className='closepopdiv';
        let spantextnode=document.createTextNode("X");
        closepopdiv.appendChild(spantextnode);
  });

  document.addEventListener('click',function(e){
    if(e.target.className === 'closepopdiv'){
      e.target.parentNode.remove();
      document.querySelector('.popup-overlay').remove();
    }
  });
  
});