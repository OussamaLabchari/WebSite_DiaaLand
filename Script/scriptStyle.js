var nav = document.querySelector('nav');
var btn_tg = document.getElementById('btn_tg');

btn_tg.addEventListener('click',function(){
  if(nav.className.includes('bg-dark')){
    if (window.pageYOffset < 90){
      nav.classList.remove('bg-dark', 'shadow');
    }
  }
  else{
    nav.classList.add('bg-dark', 'shadow')
  }
  
  
})


window.addEventListener('scroll', function () {
  if (window.pageYOffset > 90) {
    nav.classList.add('bg-dark', 'shadow');
  } else {
    nav.classList.remove('bg-dark', 'shadow');
  }
});

