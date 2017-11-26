
//owl single  carousel
$('.owl-single').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: false
        },
        992: {
            items: 1,
            nav: true,
            loop: false
        }
    },
    navText: false
})


//owl products carousel
$('.owl-products').owlCarousel({
    loop: true,
    margin: 28,
    nav: true,
    navText: false,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: true
        },
        1200: {
            items: 3,
            nav: true,
            loop: false
        }
    }
});

//owl products carousel
$('.owl-rand-items').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    navText: false,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 1,
            nav: true
        },
        1200: {
            items: 1,
            nav: true,
            loop: true
        }
    }
});
//old see owl carousel
$('.owl-old-see').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: false
        },
        992: {
            items: 4,
            nav: true,
            loop: false
        }
    },
    navText: false
})


//main owl carousel
$('.owl-main').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 4,
            nav: false
        },
        992: {
            items: 8,
            nav: true,
            loop: false
        }
    },
    navText: false
});

//old see owl carousel
$('.owl-add-see').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 2,
            nav: false
        },
        992: {
            items: 4,
            nav: true,
            loop: false
        }
    },
    navText: false
});
// find element
$owl = $('body').find('.owl_nav');

// set the owl-carousel otions
var carousel_Settings = {
    loop: true,
    margin: 0,
    nav: false,
    responsive: {
        0: {
            items: 1,
            nav: true
        }
    },
    navText: false
};

function initialize() {
    var containerWidth = $('body').outerWidth();
    if (containerWidth <= 992) {
        // initialize owl-carousel if window screensize is less the 767px
        $owl.owlCarousel(carousel_Settings);
    } else {
        // destroy owl-carousel and remove all depending classes if window screensize is bigger then 767px
        $owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $owl.find('.owl-stage-outer').children().unwrap();
    }
}
$owl.on('changed.owl.carousel', function (event) {
    $(this).find('.owl-item li').removeClass('active');
    setTimeout(function () {
        $('.owl_nav').find('.owl-item.active a').click();
    }, 500);
});

// initilize after window resize
var id;
$(window).resize(function () {
    clearTimeout(id);
    id = setTimeout(initialize, 500);
});

// initilize onload
initialize();