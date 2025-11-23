var $$ = $$ || {};

$$.sliders = function () {
    const thumbsSwiper = new Swiper(".js-ms-thumbs", {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
        freeMode: true,
        centerInsufficientSlides: true,
    });

    // Переменная для слайдера отзывов
    let reviewSwiper = null;

    function initReviewSlider() {
        const isDesktop = window.innerWidth >= 480;
        const sliderElement = document.querySelector('.js-review-slider');

        if (isDesktop && !reviewSwiper && sliderElement) {
            // Инициализируем слайдер только на десктопе
            reviewSwiper = new Swiper('.js-review-slider', {
                effect: 'slide',
                slidesPerView: 3,
                spaceBetween: 16,
                loop: true,
                centeredSlides: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            });
        } else if (!isDesktop && reviewSwiper) {
            // Уничтожаем слайдер на мобильных
            reviewSwiper.destroy(true, true);
            reviewSwiper = null;
        }
    }

    // Инициализация слайдера отзывов при загрузке
    initReviewSlider();

    // Обновление при изменении размера
    window.addEventListener('resize', function() {
        initReviewSlider();
    });

    new Swiper('.js-main-slider', {
        enabled: true,
        effect: 'slide',
        slidesPerView: 1,
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
        breakpoints: {
            480: {
                slidesPerView: 3
            }
        }
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

    /*new Swiper('.js-review-slider', {
        enabled: false,
        effect: 'slide',
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        observer: true,
        observeParents: true,
        breakpoints: {
            480: {
                enabled: true,
                slidesPerView: 3
            }
        }
    });*/
};

$$.menu = function () {
    const offcanvasMenu = document.getElementById('offcanvasMenu');

    offcanvasMenu.addEventListener('show.bs.offcanvas', event => {
        let btn = document.getElementById('offcanvasMenuBtn');
        if (btn) btn.classList.add('opened');
    });
    offcanvasMenu.addEventListener('hide.bs.offcanvas', event => {
        let btn = document.getElementById('offcanvasMenuBtn');
        if (btn) btn.classList.remove('opened');
    });
};

$$.fileLoader = function (el) {
    const uploadContainer = el.querySelector('.js-file-loader-container');
    const uploadButton = el.querySelector('.js-file-loader-btn');
    const fileInput = el.querySelector('.js-file-loader-input');
    const fileInfo = el.querySelector('.js-file-loader-info');

    // Проверяем, что все необходимые элементы найдены
    if (!uploadContainer || !fileInput || !fileInfo) {
        console.warn('Не все необходимые элементы найдены в fileLoader');
        return;
    }

    // Клик по контейнеру открывает диалог выбора файла
    uploadButton.addEventListener('click', () => {
        fileInput.click();
    });

    // Обработка выбора файла через input
    fileInput.addEventListener('change', (e) => {
        handleFileSelection(e.target.files[0]);
    });

    // Функционал drag and drop
    uploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadContainer.classList.add('dragover');
    });

    uploadContainer.addEventListener('dragleave', () => {
        uploadContainer.classList.remove('dragover');
    });

    uploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadContainer.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelection(files[0]);
        }
    });

    // Функция обработки выбранного файла
    function handleFileSelection(file) {
        if (!file) return;

        // Проверка типа файла
        if (file.type !== 'application/pdf') {
            fileInfo.innerHTML = '<div class="text-danger mt-2">Ошибка: Можно загружать только PDF файлы</div>';
            return;
        }

        // Проверка размера файла (1 МБ = 1048576 байт)
        if (file.size > 1048576) {
            fileInfo.innerHTML = '<div class="text-danger mt-2">Ошибка: Размер файла превышает 1 МБ</div>';
            return;
        }

        // Отображение информации о файле
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        fileInfo.innerHTML = `
                <div class="mt-2"><span class="text-success">✓ Файл выбран:</span> ${file.name}<br>
                <small>Размер: ${fileSize} МБ</small></div>
            `;
    }
};

$$.mask = function () {
    document.querySelectorAll('input[type=tel]').forEach(function (el) {
        var im = new Inputmask("+7 (999) 999-99-99");
        im.mask(el);
        el.setAttribute('pattern', "\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}");
    });
};

$$.validator = function (form) {
    var self = this,
        fieldsSelector = 'input:not([type=hidden]):not(.novalidate), input[type=hidden][required]:not(.novalidate), textarea:not(.novalidate), select:not(.novalidate)';

    this.isFormValid = true;

    this.fields = function () {
        return form.querySelectorAll(fieldsSelector)
    };

    this._cloneState = function (validity) {
        return {
            badInput: validity.badInput,
            customError: validity.customError,
            patternMismatch: validity.patternMismatch,
            rangeOverflow: validity.rangeOverflow,
            rangeUnderflow: validity.rangeUnderflow,
            stepMismatch: validity.stepMismatch,
            tooLong: validity.tooLong,
            tooShort: validity.tooShort,
            typeMismatch: validity.typeMismatch,
            valid: validity.valid,
            valueMissing: validity.valueMissing
        };
    };

    this.getMessage = function (el, validity) {
        var semantic = el.getAttribute('data-semantic'),
            msg = '';

        if (!validity.valid) {
            if (el.type == 'email' && validity.typeMismatch) msg = 'Укажите корректный email';
            else if (validity.patternMismatch) msg = 'Неверный формат';
            else msg = el.validationMessage;
        }

        return msg;
    };

    this.validateElement = function (el) {
        var validityState;

        if (el.willValidate) {
            //проверка обычных полей
            el.checkValidity();
            validityState = self._cloneState(el.validity);
        } else {
            //проверка скрытых полей
            validityState = self._cloneState(el.validity);
            if (el.hasAttribute('required') && el.value.trim() == '') {
                validityState.valid = false;
                validityState.valueMissing = true;
            }
        }

        if (!validityState.valid) el.classList.add('invalid');
        else el.classList.remove('invalid');

        var parent = el.parentElement;
        var errorElement = parent ? parent.querySelector(':scope > .error-message') : null;

        if (validityState.valid) {
            if (errorElement) errorElement.remove();
        } else {
            if (!errorElement) {
                errorElement = document.createElement("div");
                errorElement.className = "error-message";

                if (el.type === 'checkbox') {
                    var checkboxParent = el.parentElement;
                    if (checkboxParent) checkboxParent.appendChild(errorElement);
                    else  el.after(errorElement);
                } else {
                    el.after(errorElement);
                }
            }

            errorElement.innerText = self.getMessage(el, validityState);
        }

        return validityState.valid;
    };

    this.validateForm = function () {
        var valid = true;
        self.fields().forEach(function (el) {
            if (!self.validateElement(el)) {
                valid = false;
            }
        });

        self.isFormValid = valid;

        return valid;
    };

    this.init = function () {
        self.fields().forEach(function (el) {
            el.addEventListener('change', function (e) {
                self.validateElement(this);
            })
        });

        form.addEventListener('submit', function (e) {
            if (!self.validateForm()) {
                e.preventDefault();
            }
        });
    };

    this.init();
};

$$.burger = function (burgerElement) {
    const burger = burgerElement;
    const nav = document.querySelector('.header-menu__nav');
    const offcanvasMenu = document.getElementById('offcanvasMenu');

    if (!burger || !nav) return;

    // Клик по бургеру
    burger.addEventListener('click', toggle);

    // Клик по ссылкам в меню
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', close);
    });

    // Клик вне области меню
    document.addEventListener('click', handleOutsideClick);

    // Ресайз окна
    window.addEventListener('resize', handleResize);

    function toggle() {
        if (burger.classList.contains('active')) {
            close();
        } else {
            open();
        }
    }

    function open() {
        burger.classList.add('active');
        nav.classList.add('active');
        document.body.classList.add('menu-open');
        closeOffcanvas();
    }

    function close() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    function handleOutsideClick(event) {
        if (!event.target.closest('.header-menu__nav') && !event.target.closest('.header-menu__burger') &&
            burger.classList.contains('active')) {
            close();
        }
    }

    function handleResize() {
        if (window.innerWidth > 768 && burger.classList.contains('active')) {
            close();
        }
    }

    function closeOffcanvas() {
        if (offcanvasMenu) {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasMenu);
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }
    }
};

window.addEventListener("DOMContentLoaded", function () {
    $$.menu();
    $$.sliders();
    $$.mask();

    $$.burger(document.querySelector('.header-menu__burger'));

    document.querySelectorAll('.file-loader').forEach(function (el) {
        $$.fileLoader(el);
    });

    document.querySelectorAll('form[novalidate]').forEach(function (form) {
        form.validator = new $$.validator(form);
    });

    Fancybox.bind("[data-fancybox]", {
        // Настройки Fancybox (опционально)
        Thumbs: {
            autoStart: true,
        },
        Toolbar: {
            display: {
                left: [],
                middle: [],
                right: ["close"],
            },
        },
    });

});