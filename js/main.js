window.addEventListener("DOMContentLoaded", function () {
    const offcanvasMenu = document.getElementById('offcanvasMenu');
    console.log(offcanvasMenu);
    offcanvasMenu.addEventListener('show.bs.offcanvas', event => {
        let btn = document.getElementById('offcanvasMenuBtn');
        if (btn) btn.classList.add('opened');
    })
    offcanvasMenu.addEventListener('hide.bs.offcanvas', event => {
        let btn = document.getElementById('offcanvasMenuBtn');
        if (btn) btn.classList.remove('opened');
    });

    const thumbsSwiper = new Swiper(".js-ms-thumbs", {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
        freeMode: true,
        centerInsufficientSlides: true,
    });

    new Swiper('.js-main-slider', {
        enabled: true,
        effect: 'slide',
        slidesPerView: 3,
        spaceBetween: 16,
        loop: true,
        autoplay: {
            delay: 5000
        },
        thumbs: {
            swiper: thumbsSwiper
        },
        centeredSlides: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
    });

    new Swiper('.js-promo-slider', {
        enabled: true,
        effect: 'slide',
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
    });

    new Swiper('.js-review-slider', {
        enabled: true,
        effect: 'slide',
        slidesPerView: 3,
        spaceBetween: 16,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
    });
});