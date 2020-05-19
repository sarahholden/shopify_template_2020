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
  let lastScrollPosition = 0;

  $('.hamburger').on('click', function(e) {
    e.preventDefault();

    if ($('body').hasClass('open-mobile-nav')) {
      $('body').removeClass('open-mobile-nav');
      // Once the body is unfixed, scroll to the last position
      $(window).scrollTop(lastScrollPosition);
    } else {
      // Record last scroll position (for fixed body)
      lastScrollPosition = $(window).scrollTop();
      $('body').addClass('open-mobile-nav');
    }
  });


  /* ---------------------------------------------
    NAV FIXED WHEN SCROLLING UP
  ------------------------------------------------ */
  // if ($(window).scrollTop() < 30) {
  //   $('.nav-wrapper').addClass('loaded');
  // }
  //
  // $('.nav-wrapper').addClass('fade-in');
  //
  // // Hide Header on on scroll down
  // var didScroll;
  // var lastScrollTop = 0;
  // var delta = 5;
  // var navbarHeight = $('.nav-wrapper').outerHeight();
  //
  // $(window).scroll(function(event){
  //     didScroll = true;
  // });
  //
  // setInterval(function() {
  //     if (didScroll) {
  //         hasScrolled();
  //         didScroll = false;
  //     }
  // }, 250);
  //
  // function hasScrolled() {
  //     var distanceScrolled = $(this).scrollTop();
  //
  //     // Make sure they scroll more than delta (throttle scroll)
  //     if(Math.abs(lastScrollTop - distanceScrolled) <= delta)
  //         return;
  //
  //
  //
  //     // If they scrolled down and are past the navbar, add class .nav-up.
  //     // This is necessary so you never see what is "behind" the navbar.
  //     if (distanceScrolled > lastScrollTop && distanceScrolled > 30){
  //         // Scroll Down
  //         $('.nav-wrapper').removeClass('nav-down').addClass('nav-up');
  //     } else {
  //         // Scroll Up
  //         if(distanceScrolled + $(window).height() < $(document).height()) {
  //             $('.nav-wrapper').removeClass('nav-up').addClass('nav-down');
  //         }
  //     }
  //     if (distanceScrolled > $(window).height() || distanceScrolled > 30 && $(window).width() <= 768) {
  //       $('.nav-wrapper').addClass('scrolled-bg');
  //     } else {
  //       $('.nav-wrapper').removeClass('scrolled-bg');
  //     }
  //
  //     lastScrollTop = distanceScrolled;
  // }
  //
  // hasScrolled();

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
