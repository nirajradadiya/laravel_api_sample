/* Script on ready
---------------------------------*/	
$(document).ready(function(){

    /* mobile navigation */

    $('.menu-trigger').click(function(){
        $(this).stop().toggleClass('act')
        $('body, html').stop().toggleClass('scroll-hidden');
        $('header nav').toggleClass('act');
    })
    $('header nav li a').click(function(){
        $('.menu-trigger').removeClass('act')
        $('body, html').removeClass('scroll-hidden');
        $('header nav').removeClass('act');
    })

    /* Hire Medical slider */
    if($(window).width() >= 768){
        $('.android-slider-nav').addClass('desk-nav')
    }
    $('.hire-medical .android-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        asNavFor: '.hire-medical .android-slider-nav',
    });
    $('.hire-medical .android-slider-nav').slick({
        slidesToShow: 6,
        asNavFor: '.hire-medical .android-slider',
        useCSS:false,
        arrows:false,
        dots: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 767,
                settings: {
                    dots: false,
                    variableWidth:true,
                    slidesToShow: 3
                }
            }
        ]
    });

    /* Hire Non Medical slider */
    $('.hire-non-medical .android-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        asNavFor: '.hire-non-medical .android-slider-nav',
    });
    $('.hire-non-medical .android-slider-nav').slick({
        slidesToShow: 6,
        asNavFor: '.hire-non-medical .android-slider',
        useCSS:false,
        arrows:false,
        dots: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 767,
                settings: {
                    dots: false,
                    variableWidth:true,
                    slidesToShow: 3
                }
            }
        ]
    });

    /* showcase-carousel */
    $('.showcase-carousel').slick({
        variableWidth:true,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 5,
    });

    // On before slide change
    $('.showcase-carousel .slick-current').next().addClass('nextSlide')
    $('.showcase-carousel .slick-current').prev().addClass('nextSlide')
    $('.showcase-carousel').on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.showcase-carousel .showcase-item').removeClass('nextSlide')
        $('.showcase-carousel .slick-current').next().addClass('nextSlide')
        $('.showcase-carousel .slick-current').prev().addClass('nextSlide')
    });

    /* partner carousel */
    $('.partner-carousel').slick({
        variableWidth:true,
        arrows: false,
        infinite:false
    });

    /* one page scroll */
    $('nav ul ').onePageNav();

    var th = $('.top-banner').height()
    $('.top-banner .parallax').css('top',th - 140 )

});

/* Script on scroll
---------------------------------*/
$(window).scroll(function() {
    if( $(window).scrollTop() > 100){
        $('header').addClass('sticky').stop(false,true);
    }
    if($('header').hasClass('sticky')){
        if( $(window).scrollTop() == 0){
            $('header').removeClass('sticky').stop(false,true);
        }        
    }
    /* Scroll Animatoion */
    ScrollAnimate()
});


/* Script on load
----------------------------------*/
$(window).load(function() {

    /* Scroll Animatoion */
    ScrollAnimate()

    var th = $('.top-banner').height()
    $('.top-banner .parallax').css('top',th - 140 )

});

/* Script all functions
----------------------------------*/

/* scroll animation */
function ScrollAnimate(){
    var scroll = $( window ).scrollTop(),
        sheight = $( window ).height(),
        dheight = $( document ).height();
    if ( $( '.animate-section' ).length > 0 ) {
        $( '.animate-section' ).each( function(){
            if( scroll >  $( this ).offset().top - sheight + 50){
                $( this ).stop().addClass( 'scrollas' )
            }else{
                $( this ).stop().removeClass( 'scrollas' )
            }
        })
        $( '.feature' ).each( function(){
            if( scroll >  $( this ).offset().top - sheight + 50){
                $( '.top-banner .parallax' ).stop().addClass( 'hide' )
            }else{
                $( '.top-banner .parallax' ).stop().removeClass( 'hide' )
            }
        })
    }
}
