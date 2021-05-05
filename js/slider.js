$(document).ready(function() {
// Slider 
  // It should fix messages in console 
  jQuery.event.special.mousewheel = {
      setup: function( _, ns, handle ){
        if ( ns.includes("noPreventDefault") ) {
          this.addEventListener("mousewheel", handle, { passive: false });
        } else {
          this.addEventListener("mousewheel", handle, { passive: true });
        }
      }
    };
    jQuery.event.special.touchstart = {
      setup: function( _, ns, handle ){
        if ( ns.includes("noPreventDefault") ) {
          this.addEventListener("touchstart", handle, { passive: false });
        } else {
          this.addEventListener("touchstart", handle, { passive: true });
        }
      }
    };
    jQuery.event.special.touchmove = {
      setup: function( _, ns, handle ){
        if ( ns.includes("noPreventDefault") ) {
          this.addEventListener("touchmove", handle, { passive: false });
        } else {
          this.addEventListener("touchmove", handle, { passive: true });
        }
      }
    };
// 
  // find and define all sliders
  $('.modal-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: false,
      dots: true
  });

  $('.author-slider').slick({
      infinite:true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      draggable: false,
  })
  // text-slider is disabled, we can swith its items with author-slider buttons.
  $('.text-slider').slick({
      infinite:true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      draggable: false
  })

  // new buttons for scrolling our sliders
  const textSlider = $('.text-slider');
  const authorSlider = $('.author-slider');
  $('.reviews-next').on('click', function(e) {
      e.preventDefault();
      textSlider.slick('slickNext');
      authorSlider.slick('slickNext');

  });
  $('.reviews-prev').on('click', function(e) {
      e.preventDefault();
      textSlider.slick('slickPrev');
      authorSlider.slick('slickPrev');
  });
          
});