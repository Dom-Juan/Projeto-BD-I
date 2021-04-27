 /* Inicialização do WOW */
 new WOW().init();
 /* Fim do wow */

 /* Javascript SDK para feed facebook */
  window.fbAsyncInit = function() {FB.init({appId            : 'your-app-id',autoLogAppEvents : true,xfbml: true,
      version:'v3.1'});};

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
/* Fim do Javascript SDK para feed facebook */

/*Inserção do parallax*/
$(document).ready(function(){
  $('.parallax').parallax();
});

/*Js do slider*/
var timer;
window.onload = function() {
  var elems = document.querySelectorAll('.carousel');
  var options = {
    	//fullWidth: true,
      numVisible: 3,
      indicators: true
    }
    var instances = M.Carousel.init(elems, options);
    var b = document.querySelector("#btn-proximo");
    timer =  setInterval(next, 5000); // timer do slider em milisegundos


  };

	//Funções de movimentação do Slider

 function next(){
  var elem = document.querySelector('.carousel');
  var instance = M.Carousel.getInstance(elem);
  instance.next();
  clearInterval(timer);
  timer = setInterval(next, 5000);

}

function previous(){
  var elem = document.querySelector('.carousel');
  var instance = M.Carousel.getInstance(elem);
  instance.prev();
  clearInterval(timer);
  timer = setInterval(next, 5000);
}

  	//Movimentação por setas
  	document.onkeydown = checkKey;

   function checkKey(e) {
     e = e || window.event;
     if (e.keyCode == '37') {previous();}/* left arrow*/
      else if (e.keyCode == '39') {next();}// right arrow
    }

  // Menu transparente/solido com scroll

  $(document).ready(
    function(){
      $(window).scroll(
        function(){
          if($(window).scrollTop()>500){
            $('nav').addClass('menu-solido');
          }else{
            $('nav').removeClass('menu-solido');
          }});
    });

// Menu responsívo
$(document).ready(function(){$('.sidenav').sidenav();});

// Zoom imagem
$(document).ready(function(){ $('.materialboxed').materialbox();});

// Scroll suave
// Select all links with hashes

$(document).on('click', 'a[href^="#"]', function (event) {
 event.preventDefault();
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 600);
});