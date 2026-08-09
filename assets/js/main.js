$(window).scroll(function() {

    if ($(this).scrollTop()>300)
     {
        $('.intro').fadeOut();
     }
    else
     {
      $('.intro').fadeIn();
     }
 });