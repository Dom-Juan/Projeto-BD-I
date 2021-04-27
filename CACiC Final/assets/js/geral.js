 /* Inicialização do WOW */
 new WOW().init();
 /* Fim do wow */


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