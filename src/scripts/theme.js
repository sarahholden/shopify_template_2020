window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
// =require slate/a11y.js
// =require slate/cart.js
// =require slate/utils.js
// =require slate/rte.js
// =require slate/sections.js
// =require slate/currency.js
// =require slate/images.js
// =require slate/variants.js

/*================ Sections ================*/
// =require sections/product.js

/*================ Templates ================*/
// =require templates/customers-addresses.js
// =require templates/customers-login.js

$(document).ready(function() {
  console.log('Shopify developer: Sarah Holden 🏄🏻‍♀️');
  console.log('https://saraheholden.com/');

  var sections = new slate.Sections();
  sections.register('product', theme.Product);

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });

  // Target tables to make them scrollable
  var tableSelectors = '.rte table';

  slate.rte.wrapTable({
    $tables: $(tableSelectors),
    tableWrapperClass: 'rte__table-wrapper',
  });

  // Target iframes to make them responsive
  var iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"]';

  slate.rte.wrapIframe({
    $iframes: $(iframeSelectors),
    iframeWrapperClass: 'rte__video-wrapper'
  });

  // Apply a specific class to the html element for browser support of cookies.
  if (slate.cart.cookiesEnabled()) {
    document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
  }
});



$(document).ready(function() {
  /* ---------------------------------------------
  HAMBURGER MENU
  ------------------------------------------------ */
  // let lastScrollPosition = 0;

  $('.hamburger').on('click', function(e) {
    e.preventDefault();

    if ($('body').hasClass('open-mobile-nav')) {
      $('body').removeClass('open-mobile-nav');
      // Once the body is unfixed, scroll to the last position
      // $(window).scrollTop(lastScrollPosition);
    } else {
      // Record last scroll position (for fixed body)
      // lastScrollPosition = $(window).scrollTop();
      $('body').addClass('open-mobile-nav');
    }
  });


  $('.close-mobile-nav').on('click', function () {
    $('body').removeClass('open-mobile-nav');
  });


  /* ---------------------------------------------
    NAV FIXED WHEN SCROLLING UP
  ------------------------------------------------ */

  // Hide Header on on scroll down
  if ($('.nav-wrapper').length > 0) {
    let didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.nav-wrapper').outerHeight();
    var promoBarHeight = $('.promo-bar').outerHeight();
    $('.nav-wrapper-placeholder').height(navbarHeight);
    var navBarOffsetTop = $('.nav-wrapper').offset().top;
    var triggerPoint = navbarHeight + 10;

    $(window).on('resize', function () {
      navbarHeight = $('.nav-wrapper').innerHeight();
      $('.nav-wrapper-placeholder').height(navbarHeight);
    });

    $(window).scroll(function(event) {
      didScroll = true;
    });

    setInterval(function() {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    hasScrolled();

    function hasScrolled() {
      var distanceScrolled = $(window).scrollTop();
      var isScrollingUp = distanceScrolled + $(window).height() < $(document).height();
      var isScrollingDown = distanceScrolled > lastScrollTop && distanceScrolled > navbarHeight;

      if (distanceScrolled < triggerPoint) {
        $('.nav-wrapper').removeClass('scrolled scroll-up');
        // if (distanceScrolled > navBarOffsetTop) {
        //   $('.nav-wrapper').css('top', - (distanceScrolled - promoBarHeight) + 'px');
        // }
      } else {
        $('.nav-wrapper').addClass('scrolled');
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - distanceScrolled) <= delta) return;

        // If they scrolled down and are past the navbar, add class .scroll-down.
        // This is necessary so you never see what is "behind" the navbar.

        if (isScrollingDown) {
          // Scroll Down
          $('.nav-wrapper')
            .removeClass('scroll-up')
            .addClass('scroll-down');
        } else if (isScrollingUp) {
          // Scroll Up
          $('.nav-wrapper')
            .removeClass('scroll-down')
            .addClass('scroll-up');
        }

        lastScrollTop = distanceScrolled;
      }
    }
  }



  /* ---------------------------------------------
    SWIPER
  ------------------------------------------------ */
  // const swiper = new Swiper('.swiper-container-myclass', {
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: 'true'
  //   },
  //   speed: 600,
  //   allowTouchMove: true,
  //   loop: true,
  //   effect: 'fade',
  //   fadeEffect: {
  //     crossFade: true
  //   },
  //   autoplay: {
  //     delay: 10000,
  //     disableOnInteraction: true
  //   }
  // });

  /* ---------------------------------------------
    PROMO SWIPER
  ------------------------------------------------ */
  if ($('.swiper-container-promo').length > 0) {
    var promoSwiper = new Swiper('.swiper-container-promo', {
      pagination: {
        el: '.swiper-pagination',
        clickable: 'true'
      },
      speed: 400,
      allowTouchMove: true,
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 8000,
        disableOnInteraction: true,
      },
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
    });
  }


  /* ---------------------------------------------
    SPLIT TEXT / LIST ANIMATIONS
  ------------------------------------------------ */
  var controller = new ScrollMagic.Controller();
  var tl = gsap.timeline();
  document.fonts.ready.then(function () {
    var mySplitText = new SplitText('[data-break="lines"]', {type:"lines", linesClass: 'split-line-++'});
    new SplitText('[data-break="lines-masked"]', {type:"lines", linesClass: 'split-line-child'});
    new SplitText('[data-break="lines-masked"]', {type:"lines", linesClass: 'split-line-++'});
    new SplitText('[data-break="lines-masked-desc"] p', {type:"lines", linesClass: 'split-line-child'});
    new SplitText('[data-break="lines-masked-desc"] p', {type:"lines", linesClass: 'split-line-++'});

    $('[data-break="lines-masked"]').addClass('loaded');
    $('[data-break="lines-masked-desc"]').addClass('loaded');

    // resize function
    $(window).resize(function() {
      tl.progress(1);
      mySplitText.revert();
    });

    $('.list-animation-wrapper').each(function() {
      var scrollOffset = $(this).data('offset') || 0;
      var $thisWrapper = $(this);
      new ScrollMagic.Scene({
        triggerElement: this,
        offset: scrollOffset,
        triggerHook: .85
      })
        .setClassToggle(this, "scrolled") // add class toggle
        .reverse(false)

        .addTo(controller)
        .on("enter", function (e) {
          if ($thisWrapper.find('.animate-item').length > 0) {
            var $listItems = $thisWrapper.find('.animate-item');
          } else {
            var $listItems = $thisWrapper.find('li');
          }


          $listItems.each(function(i) {
            var delay = i * 100;
            var self = this;
            setTimeout(function() {
              $(self).addClass('fade-in');
            }, delay);
          });
        });
    });

  // END OF FONT LOADING
  });


    /* ---------------------------------------------
      PARALLAX & SCROLLING ZOOM EFFECTS
    ------------------------------------------------ */
    document.fonts.ready.then(function () {
      $('[data-anim="scroll"]').each(function() {
        var scrollWrapper = this;
        var scrollOffset = $(this).data('offset') || 0;
        new ScrollMagic.Scene(
          {
            triggerElement: this,
            offset: scrollOffset,
            triggerHook: .85
          })
          .setClassToggle(this, "js-animate") // add class toggle
          // .addIndicators('classAdd')
          .reverse(false)
          .addTo(controller);


          // SCALE IMAGE UP OR DOWN
          var $imageToScale = $(this).find('[data-anim="scale"]')
          if ($imageToScale.length > 0) {
            var scaleFrom = $imageToScale.data('scale-from') != undefined ? parseFloat($imageToScale.data('scale-from')) : 1;
            var scaleTo = $imageToScale.data('scale-to') != undefined ? parseFloat($imageToScale.data('scale-to')) : 1.09;
            var pointToTrigger = $imageToScale.data('trigger-hook') != undefined ? parseFloat($imageToScale.data('trigger-hook')) : 0.4;
            var dataDuration = $(this).data('duration') != undefined ? $(this).data('duration') : '100%';

            var timelineScale = new TimelineMax();
            var imageToAnimate = $imageToScale;
            timelineScale.fromTo(imageToAnimate, 1, {scale: scaleFrom}, {scale: scaleTo});

            var scaleScene = new ScrollMagic.Scene({
              triggerElement: scrollWrapper,
              triggerHook: pointToTrigger,
              duration: dataDuration
            })
            .setTween(timelineScale)
            .addTo(controller);
          }

          if ($(window).innerWidth() > 768) {
            // PARALLAX EFFECT
            var $itemToTranslate = $(this).find('[data-anim="parallax"]');
            if ($itemToTranslate.length > 0) {
              $itemToTranslate.each(function() {
                var timelineParallax = new TimelineMax();
                var translateFrom = $(this).data('translate-from') != undefined ? parseFloat($(this).data('translate-from')) : 40;
                var translateTo = $(this).data('translate-to') != undefined ? parseFloat($(this).data('translate-to')) : -40;
                var dataDuration = $(this).data('duration') != undefined ? $(this).data('duration') : '100%';
                timelineParallax.fromTo($(this), 1, {y: translateFrom}, {y: translateTo});

                var scene = new ScrollMagic.Scene({
                  triggerElement: scrollWrapper,
                  triggerHook: 0.4,
                  duration: dataDuration
                })
                .setTween(timelineParallax)
                .addTo(controller);
              });
            }
          }

      });

    // END OF FONT LOADING
    });



  /* ---------------------------------------------
  Accordion
  ------------------------------------------------ */
  $('.accordion').on('click', '.accordion-toggle', function() {
    $(this)
      .closest('.accordion-panel')
      .toggleClass('expanded');
  });


  /* ---------------------------------------------
  VIEW CART
  ------------------------------------------------ */
  $('.js-view-cart').on('click', function(e) {
    e.preventDefault();
    $('body').addClass('open-cart');
  });

  $('.js-close-cart').on('click', function(e) {
    e.preventDefault();
    $('body').removeClass('open-cart');
  });

  /* ---------------------------------------------
  SELECTRIC
  ------------------------------------------------ */
  $('.styled-select').selectric();
  /* ---------------------------------------------
  TEXT EFFECT WRAPPER
  ------------------------------------------------ */
  // $('.js-animation-wrapper').scrollClass();

  /* ---------------------------------------------
  SMOOTH SCROLL
  ------------------------------------------------ */
  // $('.scroll-to').on('click', function(e) {
  //   e.preventDefault();
  //
  //   var thisTarget = $(this).attr('href');
  //
  //   if (thisTarget == '#bottom') {
  //     var targetOffset = $('#top').offset().top + $('#top').outerHeight() - $(window).height();
  //   } else {
  //     var targetOffset = $(thisTarget).offset().top;
  //   }
  //
  //   $('html, body').animate({
  //     scrollTop: targetOffset
  //   }, 600);
  // });

  /* ---------------------------------------------
  PROMO POPUP
  ------------------------------------------------ */
  function getCookie(name) {
    const dc = document.cookie;
    const prefix = `${name}=`;
    let begin = dc.indexOf(`; ${prefix}`);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
      var end = document.cookie.indexOf(';', begin);
      if (end == -1) {
        end = dc.length;
      }
    }
    // because unescape has been deprecated, replaced with decodeURI
    // return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  }

  const urlParams = new URLSearchParams(window.location.search);
  // const isPreview = urlParams.get('preview'); // FOR TESTING

  const hasVisited = getCookie('show-email-popup');
  // var hasVisited = null; // FOR TESTING

  // if (true) {
  if (hasVisited === null) {
    $('#email-popup').addClass('popped-up');

    // Set a cookie so the popup only shows once every 30 days
    const date = new Date();
    const days = 30;

    // Get unix milliseconds at current time plus number of days
    date.setTime(+date + days * 86400000); // 24 * 60 * 60 * 1000
    window.document.cookie = `${'show-email-popup' +
      '=' +
      'no' +
      '; expires='}${date.toGMTString()}; path=/`;
  }
  // }

  $('.close-email-popup').on('click', function(e) {
    e.preventDefault();
    $('#email-popup').removeClass('popped-up');
  });

  $('#email-popup form').on('submit', function(e) {
    e.preventDefault();
    $('#email-popup').removeClass('popped-up');
  });
});
