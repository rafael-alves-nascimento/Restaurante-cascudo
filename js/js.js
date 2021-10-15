function stickyNav() {
  
    const topNav = document.querySelector('.top-nav'),
          topNavOffsetTop = topNav.offsetTop,
          topNavOffsetHeight = topNav.offsetHeight,
          offsetPoint = document.querySelector('.top-hero').offsetHeight;
    
    
    window.addEventListener('scroll', function () {
      
      let windowOffset = this.pageYOffset;
      
      if (windowOffset >= offsetPoint) {
        topNav.classList.add('sticky');
      } else {
        topNav.classList.remove('sticky');
      }
    
      
      
    });
    
    
    
  }
  
  
  function setCopyrightYear($selector) {
    var d = new Date();
    
    
    $selector.text(d.getFullYear());
  }
  
  $('.js-scroll').on('click', function(event) {
    event.preventDefault();
    var target = $(this).data('scrollTo');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 400);
  });
  
  setCopyrightYear($('#copyright-year'));
  
  stickyNav();