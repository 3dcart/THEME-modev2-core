//flyout cart
function update_flyoutcart() {
    if (window["_3d_cart"] != undefined) {
        if (_3d_cart.oid == 0)
            return;
        jQuery('#floating-cart .minicart-items').text(_3d_cart.itemsum);
        jQuery('#floating-cart').fadeIn(300);
        return;
    }	
    jQuery.ajax({
        url: '/frontapi.asp',
        dataType: 'json',
        type: 'GET',
        cache: false,
        data: {
            module: 'cartajax',
        },
        success: function (data) {
            if (data.ItemsInCart != undefined) {
                if (data.ItemsInCart.length > 0) {
                    var totalItems = 0;
                    for (i = 0; i < data.ItemsInCart.length; i++) {
                        totalItems += data.ItemsInCart[i].qty;
                    }
                    if (totalItems != null) jQuery('#floating-cart .minicart-items').text(totalItems);
                    jQuery('#floating-cart').fadeIn(300);

					//Dropdown cart
					//core_dropdown_cart(data);
                }
            }
        },
        error: function (objError) {
            //alert('Error');
            return;
        }
    });
}

function addcart_callback(productDiv, data) {
    jQuery(productDiv).addClass('ajaxcart-complete');
    setTimeout(function () { jQuery(productDiv).removeClass('ajaxcart-complete'); }, 1000);

    var itemsInCart = 0;
    var subtotal = 0;

    jQuery(data.ItemsInCart).each(function (index, item) {
        itemsInCart += item.qty;
        subtotal += (item.price * item.qty);
    });
	//minicart - subtotal
    subtotal = subtotal.toFixed(jQuery('body').data('decimal'));
    jQuery('.minicart-items').text(itemsInCart);
    update_flyoutcart();

    var currency = jQuery('body').data('currency');
    jQuery('.minicart-subtotal').text(currency + subtotal);   
}

function mailinglist_callfront(form) {
    jQuery(form).find('.mailinglist-input').prop('disabled', true);
    jQuery(form).find('.mailinglist-submit').prop('disabled', true);
    jQuery(form).find('#mailing-btn-txt').addClass('hidden');
    jQuery(form).find('#mailing-btn-load').removeClass('hidden');

    jQuery('#mailinglist-response').slideUp(300);
    jQuery('#mailinglist-response div').addClass('hidden');
}

function mailinglist_response(form, response) {

    jQuery(form).find('.mailinglist-input').prop("disabled", false);
    jQuery(form).find('.mailinglist-submit').prop("disabled", false);


    if (response == 1 || response == 3) {
        jQuery('#mailinglist-response .mailinglist-subscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
		jQuery('.mailinglist-input').attr( 'aria-invalid', 'false');
    }
    else if (response == -1) {
        jQuery('#mailinglist-response .mailinglist-unsubscribed').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
		jQuery('.mailinglist-input').attr( 'aria-invalid', 'false');
    }
    else if (response == 2) {
        jQuery('#mailinglist-response .mailinglist-error').removeClass('hidden');
        jQuery('#mailinglist-response').slideDown(300);
		jQuery('.mailinglist-input').attr( 'aria-invalid', 'true');
    }

    jQuery(form).find('#mailing-btn-txt').removeClass('hidden');
    jQuery(form).find('#mailing-btn-load').addClass('hidden');

}

function moveMenu() {
    var respWidth = window.innerWidth;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari/") !== -1 && ua.indexOf("chrom") === -1) {
        respWidth = jQuery(window).width();
    }

    if (respWidth < 767) {
        jQuery('#menulinks').appendTo('#mobile-menulinks');
        jQuery('#categories').appendTo('#mobile-categories');
    }
    else {
        jQuery('#menulinks').appendTo('#menulinks-outer');
        jQuery('#categories').appendTo('#navbar');
    }
}

jQuery(document).ready(function () {

    update_flyoutcart();

    jQuery('#mobile-menu-trigger').click(function (e) {
        e.preventDefault();

        jQuery('#mobile-menu').show(0, function () {
            jQuery('body').addClass('menu-open');
        });
    });

    jQuery('.mobile-menu-close').click(function (e) {
        e.preventDefault();

        jQuery('body').removeClass('menu-open');
        setTimeout(function () {
            jQuery('#mobile-menu').hide(0);
        }, 250);
    });


    var respWidth = window.innerWidth;
    if (respWidth >= 767) {
    	jQuery('.navbar .dropdown').hover(function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown('fast');

    	}, function () {
    		jQuery(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp('fast');

    	});

    	jQuery('.navbar .dropdown > a').click(function () {
    		location.href = this.href;
    	});
    }

});

jQuery(function () { 
	jQuery('.navbar .dropdown > a').attr("aria-expanded","false");
	jQuery('.navbar .dropdown > a').attr("aria-haspopup","true");
    jQuery('.navbar .dropdown > a').hover(function (e) {
        var menuItem = jQuery( e.currentTarget );

        if (menuItem.attr( 'aria-expanded') === 'true') {
            jQuery(this).attr( 'aria-expanded', 'false');
        } else {
            jQuery(this).attr( 'aria-expanded', 'true');
        }
    });
});


jQuery(window).load(function () {
    moveMenu();
});
jQuery(window).resize(function () {
    moveMenu();
});

jQuery(function ($) {
	$('.navbar .dropdown').hover(function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();

	}, function () {
		$(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();

	});

	$('.navbar .dropdown > a').click(function () {
		location.href = this.href;
	});

});

var domainName = document.location.host;
jQuery(window).resize(function() {
   if(navigator.userAgent.match(/Android/)) {
      $('#mobile-categories').css('max-height', (screen.height - 100));
   } 
   $('#mobile-categories > ul').css('max-height', screen.height);
});


jQuery(document).ready(function($) {
   
   //Mobile Menu Links
   $('#mobile-categories ul').prepend($('#top-categories-menu .container > ul').html());
   if(navigator.userAgent.match(/Android/)) {
      $('#mobile-categories').css('max-height', (screen.height - 100));
   }
   $('#mobile-categories > ul').css('max-height', screen.height);
   $('#mobile-customer ul').prepend('<li>' + $('.header-bottom .useraccount').html() + '</li>');
   $('#mobile-customer ul').append('<li class="wishlist">' + $('.wishlist-link').html() + '</li>');
   $('#mobile-customer ul').append($('.header-panel-top ul').html());


   $('#top-categories-menu ul li').has('ul li').addClass('hasSub');
   $('#mobile-categories ul li').has('ul li').addClass('hasSub').prepend('<span class="toggle-expand"></span>');
   $('#mobile-categories ul li.hasSub > span').click(function() {
      if ($(this).hasClass('toggle-expand')) {
         $(this).siblings('.subMegaMenu').addClass('sub-expand');
         $(this).parent().addClass('expanded');
         $(this).attr('class', 'toggle-close');
      } else if ($(this).hasClass('toggle-close')) {
         $(this).siblings('.subMegaMenu').removeClass('sub-expand');
         $(this).parent().removeClass('expanded');
         $(this).attr('class', 'toggle-expand');
      }
   });

});

jQuery(document).ready(function($) {
   //owl Global Options For Product Carousel
   var owlGlobalOpts = {
      nav: true,
      dots: false,
      items: 4,
      margin: 30,
      slideBy: 4,
      responsive: {
         0: {
            items: 1,
            slideBy: 1
         },
         480: {
            items: 2,
            slideBy: 2
         },
         768: {
            items: 3,
            slideBy: 3
         },
         992: {
            items: 4,
            slideBy: 4
         },
         1200: {
            items: 4,
            slideBy: 4
         }
      },
      responsiveRefreshRate: 0
   };


   $('.slick-cloned').remove();
   

   //Top Sellers
   var $modTopSellers = $('#modTopSellers .owl-carousel');
   if ($modTopSellers.length > 0) {
      $modTopSellers.owlCarousel({
         items: 4,
         nav: true,
         dots: false,
         margin: 30,
         responsiveRefreshRate: 0,
         responsive: {
            480: {
               items: 2,
               slideBy: 2
            },
            768: {
               items: 1,
               slideBy: 1
            }

         }
      });
   }

   //Home Brands Carousel
   var $homeBrands = $('#homeBrands .owl-carousel');
   if ($homeBrands.length > 0) {
      $homeBrands.owlCarousel({
         items: 5,
         nav: true,
         dots: false,
         slideBy: 5,
         responsive: {
            0: {
               items: 1,
               slideBy: 1
            },
            381: {
               items: 2,
               slideBy: 2
            },
            560: {
               items: 3,
               slideBy: 3
            },
            768: {
               items: 4,
               slideBy: 4
            },
            992: {
               items: 4,
               slideBy: 4
            },
            1200: {
               items: 5,
               slideBy: 5
            }
         },
         responsiveRefreshRate: 0
      });
   }

});

jQuery(document).ready(function($) {
   ella.init();
});
//ELLA THEME FUNCTIONS
var ella = {
   init: function() {
      this.initDropdownCart();
      this.initBackToTop();
      this.initSearchBoxFixed();
   },
   initDropdownCart: function() {
   
      /* DropdownCart*/
      if (jQuery('#top-cart .minicart-inner .minicart-items').text() == '0') {
         jQuery(".dropdown-cart").html("<div class='cart-empty'><div class='alert alert-warning text-center'>You don't have any products in your shopping cart.</div></div>");
         window.reloadCart = false;
     }
     jQuery("#top-cart .minicart-inner .minicart-items").bind("DOMSubtreeModified", function() {
         window.reloadCart = true;
      });

      $('#top-cart > a').click(function(ev) {
            ev.preventDefault();
            $(this).parent().toggleClass('cart-expanded');

            if (typeof window.reloadCart == 'undefined' || window.reloadCart == true) {
              jQuery(".dropdown-cart").load("/view_cart.asp #recalculate", function() {
                  jQuery(".dropdown-cart .checkout-btns").after("<a class='btn view-cart-btn' href='/view_cart.asp'>View Cart</a>");

                  // Toggle Options
                  jQuery('a.view-options').click(function (e) {
                     e.preventDefault();
                     var target = jQuery(this).data('target');
                     jQuery(target).slideToggle();
                  });

                  //Update cart
                     jQuery('.update-qty').click(function (e) {
                        e.preventDefault();
                        jQuery('#recalculate').submit();
                     });
              });
              window.reloadCart = false;
            }   
         });

      $(document).mouseup(function (ev) {
         if ($(ev.target).closest("#top-cart").length === 0) {
            $('#top-cart').removeClass('cart-expanded');
         }
      });       
   },
   initSearchBoxFixed: function() {
      var eventtype = jQuery.browser.mobile ? "touchstart" : "click";
      if ($(window).width() >=992) {
         $('.search-toggle').on(eventtype, function(ev) {
            ev.preventDefault();
            $(this).parent().toggleClass('on');
            $('body').toggleClass('search-bg');
         });
         
         $(document).on(eventtype, function(ev) {
            if ($(ev.target).closest("#FRAME_SEARCH").length === 0) {
               $('.search-toggle').parent().removeClass('on');
               $('body').removeClass('search-bg');
            }
         });
      }

      $('.search-toggle-mobile').click(function(ev) {
         ev.preventDefault();
         $('#searchBox').toggleClass('on');
         $('#FRAME_SEARCH').toggleClass('open');
         $('body').toggleClass('search-bg');
      });
   },
   initBackToTop: function() {
      // browser window scroll (in pixels) after which the "back to top" link is shown
      var offset = 300,
         //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
         offset_opacity = 1200,
         //duration of the top scrolling animation (in ms)
         scroll_top_duration = 700,
         //grab the "back to top" link
         $back_to_top = $('#back-to-top');

      //hide or show the "back to top" link
      $(window).scroll(function() {
         ($(this).scrollTop() > offset) ? $back_to_top.addClass('is-visible'): $back_to_top.removeClass('is-visible fade-out');
         if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('fade-out');
         }
      });
      //smooth scroll to top
      $back_to_top.on('click', function(event) {
         event.preventDefault();
         $('body,html').animate({
            scrollTop: 0,
         }, scroll_top_duration);
      });
   }
}



var SidebarMenuEffects = (function() {

   function hasParentClass(e, classname) {
      if (e === document) return false;
      if (classie.has(e, classname)) {
         return true;
      }
      return e.parentNode && hasParentClass(e.parentNode, classname);
   }

   function init() {

      var container = document.getElementById('st-container'),
         buttons = Array.prototype.slice.call(document.querySelectorAll('#st-trigger-effects > li > a:not(#mobile-cart)')),
         // event type (if mobile use touch events)
         eventtype = jQuery.browser.mobile ? "touchstart" : "click",
         resetMenu = function() {
            classie.remove(container, 'st-menu-open');
            jQuery('body').removeClass('st-off-canvas');
         },
         bodyClickFn = function(evt) {
            //if( hasParentClass( evt.target, 'close-canvas' ) ) {
            if (!hasParentClass(evt.target, 'st-menu')) {
               resetMenu();
               document.removeEventListener(eventtype, bodyClickFn);
            }
         };

      buttons.forEach(function(el, i) {
         var effect = el.getAttribute('data-effect');

         el.addEventListener(eventtype, function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            container.className = 'st-container'; // clear
            classie.add(container, effect);
            jQuery(window).scrollTop(0);
            setTimeout(function() {
               if (jQuery('body').hasClass('st-off-canvas')) {
                  classie.remove(container, 'st-menu-open');
                  jQuery('body').removeClass('st-off-canvas');
               } else {
                  classie.add(container, 'st-menu-open');
                  jQuery('body').addClass('st-off-canvas');
               }
               
            }, 05);
            document.addEventListener(eventtype, bodyClickFn);
         });
      });

   }

   init();

})();
