jQuery(document).ready(function ($) {

    /* jQuery('button').click(function () {
     
     
     if (jQuery(this).attr('data-dir') == 'up') {
     var currentNumber = parseInt(jQuery(this).parent().prev().val());
     jQuery(this).parent().prev().val(currentNumber + 1);
     console.log(currentNumber);
     }
     if (jQuery(this).attr('data-dir') == 'dwn') {
     var currentNumber = parseInt(jQuery(this).parent().next().val());
     if (currentNumber >= 1) {
     jQuery(this).parent().next().val(currentNumber - 1);
     } else {
     return false;
     }
     }
     });*/

    function spinner() {
        jQuery('button').click(function () {


            if (jQuery(this).attr('data-dir') == 'up') {
                var currentNumber = parseInt(jQuery(this).parent().prev().val());
                jQuery(this).parent().prev().val(currentNumber + 1);
                console.log(currentNumber);
            }
            if (jQuery(this).attr('data-dir') == 'dwn') {
                var currentNumber = parseInt(jQuery(this).parent().next().val());
                if (currentNumber >= 1) {
                    jQuery(this).parent().next().val(currentNumber - 1);
                } else {
                    return false;
                }
            }
        });
    }

    spinner();


    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var MqL = 1170;
    //move nav element position according to window width
    moveNavigation();
    $(window).on('resize', function () {
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    //mobile - open lateral menu clicking on the menu icon
    $('.cd-nav-trigger').on('click', function (event) {
        event.preventDefault();
        if ($('.cd-main-content').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        } else {
            $(this).addClass('nav-is-visible');
            $('.cd-primary-nav').addClass('nav-is-visible');
            $('.cd-main-header').addClass('nav-is-visible');
            $('.cd-main-content').addClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $('body').addClass('overflow-hidden');
            });
            toggleSearch('close');
            $('.cd-overlay').addClass('is-visible');
        }
    });

    //open search form
    $('.cd-search-trigger').on('click', function (event) {
        event.preventDefault();
        toggleSearch();
        closeNav();
    });

    //close lateral menu on mobile 
    $('.cd-overlay').on('swiperight', function () {
        if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.nav-on-left .cd-overlay').on('swipeleft', function () {
        if ($('.cd-primary-nav').hasClass('nav-is-visible')) {
            closeNav();
            $('.cd-overlay').removeClass('is-visible');
        }
    });
    $('.cd-overlay').on('click', function () {
        closeNav();
        toggleSearch('close')
        $('.cd-overlay').removeClass('is-visible');
    });


    //prevent default clicking on direct children of .cd-primary-nav 
    $('.cd-primary-nav').children('.has-children').children('a').on('click', function (event) {
        event.preventDefault();

    });
    //open submenu
    $('.has-children').children('a').on('click', function (event) {
        $('html, body').animate({scrollTop: 0}, 500);
        if (!checkWindowWidth())
            event.preventDefault();
        var selected = $(this);
        if (selected.next('ul').hasClass('is-hidden')) {
            //desktop version only
            selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
            selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
            $('.cd-overlay').addClass('is-visible');

        } else {
            selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
            $('.cd-overlay').removeClass('is-visible');
        }
        toggleSearch('close');

    });

    //submenu items - go back link
    $('.go-back').on('click', function () {
        $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
    });

    function closeNav() {
        $('.cd-nav-trigger').removeClass('nav-is-visible');
        $('.cd-main-header').removeClass('nav-is-visible');
        $('.cd-primary-nav').removeClass('nav-is-visible');
        $('.has-children ul').addClass('is-hidden');
        $('.has-children a').removeClass('selected');
        $('.moves-out').removeClass('moves-out');
        $('.cd-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            $('body').removeClass('overflow-hidden');
        });
    }

    function toggleSearch(type) {
        if (type == "close") {
            //close serach 
            $('.cd-search').removeClass('is-visible');
            $('.cd-search-trigger').removeClass('search-is-visible');
            $('.cd-overlay').removeClass('search-is-visible');
        } else {
            //toggle search visibility
            $('.cd-search').toggleClass('is-visible');
            $('.cd-search-trigger').toggleClass('search-is-visible');
            $('.cd-overlay').toggleClass('search-is-visible');
            if ($(window).width() > MqL && $('.cd-search').hasClass('is-visible'))
                $('.cd-search').find('input[type="search"]').focus();
            ($('.cd-search').hasClass('is-visible')) ? $('.cd-overlay').addClass('is-visible') : $('.cd-overlay').removeClass('is-visible');
        }
    }

    function checkWindowWidth() {
        //check window width (scrollbar included)
        var e = window,
                a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if (e[ a + 'Width' ] >= MqL) {
            return true;
        } else {
            return false;
        }
    }

    function moveNavigation() {
        var navigation = $('.cd-nav');
        var desktop = checkWindowWidth();
        if (desktop) {
            navigation.detach();
            navigation.insertBefore('.cd-header-buttons');
        } else {
            navigation.detach();
            navigation.insertAfter('.cd-main-content');
        }
    }

    registerModalImage();
    orderHistory();
    selectedBasketItem();
    function registerModalImage() {
        $('button').on('click', function () {
            if ($(this).attr('data-toggle') == 'modal') {
                $('.in').modal('hide');
            }
        })


    }
    function orderHistory() {
        $('.panel-body a').on('click', function () {
            $('.panel-body li').removeClass('active');
        })
    }

    //окрашивание кнопки этапа заказа
    function selectedBasketItem() {
        $('.basket-tabs li').on('click', function () {
            $(this).siblings('li').removeClass('basket-selected');
            $(this).prevAll('li').addClass('basket-selected');
        })
    }
    //скрыть показать пароль
    $('.user-cabinet .input-group .btn').on('click', function () {
        $(this).closest('.input-group').toggleClass('see-pass');
        var type = $(this).closest('.input-group').find('input').attr('type');
        if (type == 'password') {
            $(this).closest('.input-group').find('input').attr('type', 'text');
        } else {
            $(this).closest('.input-group').find('input').attr('type', 'password');
        }
    })

    //событие для отмены закрытия выпадающей корзины
    $('.dropdown-basket').click(function (event) {
        event.stopPropagation();
    });
    //смена иконок у маленькой шапки при нажатии
    $('.small-navbar a').click(function (event) {

        if ($(this).find('.icon').hasClass('icon-down')) {
            $(this).closest('.navigation-menu').find('.icon-up').removeClass('icon-up').addClass('icon-down');
            $(this).find('.icon').removeClass('icon-down');
            $(this).find('.icon').addClass('icon-up');

        } else {
            $(this).find('.icon').removeClass('icon-up');
            $(this).find('.icon').addClass('icon-down');
        }

    });
    //кнопка закрытия корзины
	$('.basket-close').on('click',function (event) {
		event.preventDefault();
        $(this).parents('.dropdown-basket').hide();
    });

    //исправление бага при клике на корзину
    $(document).on('click', '#basket-simple', function (e) {
        e.preventDefault();
        $(this).parent().find('.dropdown-basket').toggle();
        $(this).parent().toggleClass('open');

    });
    $(document).on('click', '.top-basket .basket-header, .top-basket .basket-body', function (e) {
        e.preventDefault();
        window.location.assign('/personal/cart/');

    });

    $(document).on('click', '#basket-simple-mobile', function (e) {
        e.preventDefault();
        $(this).siblings('.dropdown-basket').toggle();
        $(this).parent().toggleClass('open');

    });

    /*скролл nav-catalog*/
    $('.nav-catalog-layout').scrollbar();

    $('.dropdown-toggle').on('click', function () {
        $('.dropdown-basket').hide();
    });

    //catalog menu
    /*$('.nav-catalog__item.nav-catalog__dropdown').on('click', function () {
        $(this).children('a').preventAction = false;

        $(this).toggleClass('open-nav');
        $(this).siblings().removeClass('open-nav');
    });*/

    //маленькая шапка
    function HeaderSlide() {
        $(window).scroll(function () {
            var nav = $('.navigation').offset().top;
            console.log(nav);
            if ($(window).scrollTop() < nav) {
                $('.small-navbar').addClass('hidden');
                /*$('.header').slideDown(200);*/
            } else {
                $('.small-navbar').removeClass('hidden');
               /* $('.header').slideUp(200);*/
            }
        });
    }

	function HeaderMobileStiсky(){
        $(window).scroll(function () {
            if ($(window).scrollTop() == 0) {
                $('.header').removeClass('header-mobile-scroll');
            } else {
                $('.header').addClass('header-mobile-scroll');
            }
        });
	}

    $(window).on('resize', function () {
        HeaderSlide();

		if ($(window).width() < 768) {
        	HeaderMobileStiсky();
    	}
    });

    if ($(window).width() >= 768) {
        HeaderSlide();
	}else{
		HeaderMobileStiсky();
	}

	






    //маленькая шапка end


    $('.item-group input').on('click', function () {
        if ($(this).is(':checked')) {
            $(this).closest('.item-group').find('.btn img').attr('src', '/local/templates/vodoley/images/icons/i-del-active.png')
        } else {
            $(this).closest('.item-group').find('.btn img').attr('src', '/local/templates/vodoley/images/icons/i-del.png')
        }
    });

    $('#product-table').on('click', function () {
        $('.product-list').find('.product-line').hide();
        $('.product-list').find('.col-sm-4').show();
        if ($(this).find('img').attr('src') == '/local/templates/vodoley/images/icons/i-table.png') {
            $(this).find('img').attr('src', '/local/templates/vodoley/images/icons/i-table-active.png')
            $('#product-row').find('img').attr('src', '/local/templates/vodoley/images/icons/i-rows.png');
        }

    })
    $('#product-row').on('click', function () {
        $('.product-list').find('.product-line').show();
        $('.product-list').find('.col-sm-4').hide();
        if ($(this).find('img').attr('src') == '/local/templates/vodoley/images/icons/i-rows.png') {
            $(this).find('img').attr('src', '/local/templates/vodoley/images/icons/i-rows-active.png');
            $('#product-table').find('img').attr('src', '/local/templates/vodoley/images/icons/i-table.png');
        }

    });
    $('body').on('hidden.bs.modal', function () {
        if ($('.modal.in').length > 0)
        {
            $('body').addClass('modal-open');
        }
    });



    // $('.tab-content-inner, .dropdown-body').scrollbar();

    function changelink() {
        var currentlink = window.location.href.toString();


        if (currentlink.indexOf('basket') + 1) {


        } else {

            $('.tab-content-inner, .dropdown-body').scrollbar();
        }

    }
    ;

    changelink();


    $('.history__open').on('click', function () {
        event.preventDefault()
        $('.history__dropdown').slideToggle();
    });


	/*$('.product-nav-btn').on('click', function(){
		$(this).siblings('.nav-catalog').toggle();
	});*/

	/*скрипт меню*/
	$('.header .product-nav-btn').on('click', function(){
		$('.header .product-nav .nav-catalog').toggle();
		$('.footer .small-navbar .product-nav .nav-catalog').toggle();
	});

	$('.footer .small-navbar .product-nav-btn').on('click', function(){
		$('.header .product-nav .nav-catalog').toggle();
		$('.footer .small-navbar .product-nav .nav-catalog').toggle();
	});

	$('.footer .small-navbar .product-nav-btn').on('click', function(){
		$('.header .product-nav .nav-catalog').toggle();
		$('.footer .small-navbar .product-nav .nav-catalog').toggle();
	});

	$('.footer .product-nav-btn').on('click', function(){
		$(this).siblings('.nav-catalog').toggle();
		$('.header .product-nav .nav-catalog').hide();
	});

	$('.navigation-menu li').on('click', function(){
		$('.product-nav .nav-catalog').hide();
	});


	$('.product-nav-btn').on('click', function(){
		/*$('.footer .nav-catalog .nav-catalog-submenu__item').each(function (index, element) {
			if(index > 9 && index < 70){
				$(this).closest('.dropdown-menu').addClass('menu-col');

			}else{
				$(this).closest('.dropdown-menu').removeClass('menu-col');
			}
		});*/

		$(".footer .nav-catalog .nav-catalog-submenu").each(function () {
		  var count = $(this).find('.dropdown-menu').children().length;
			if(count > 9){
				$(this).find('.dropdown-menu').addClass('menu-col');
			}else{
				$(this).closest('.dropdown-menu').removeClass('menu-col');
			}
		})
	});





});