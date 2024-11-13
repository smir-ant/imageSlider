document.addEventListener('DOMContentLoaded', function () {
    var slides = document.querySelectorAll('.slide');
    var radiosContainer = document.querySelector('.radios');

    slides.forEach(function (slide, index) {
        // Создаем радиокнопки
        var radio = document.createElement('label');
        radio.classList.add('radio');
        if (index === 0) radio.classList.add('active');
        radiosContainer.appendChild(radio);
    });

    var radios = document.querySelectorAll('.radio');
    var leftArrow = document.querySelector('.left');
    var rightArrow = document.querySelector('.right');
    var slideInt;
    var intTime = 5000; // 5s

    radios.forEach(function (item, index) {
        item.addEventListener('click', function () {
            changeViaRadio(index);
        });
    });

    rightArrow.addEventListener('click', function (e) {
        e.preventDefault();
        nextSlide();
        clrInterval();
    });

    leftArrow.addEventListener('click', function (e) {
        e.preventDefault();
        prevSlide();
        clrInterval();
    });

    function changeViaRadio(index) {
        for (var i = 0; i < slides.length; i++) {
            if (i !== index) {  // reset all (goal is unset active)
                slides[i].classList.remove('active');
                radios[i].classList.remove('active');
            }
            else {  // set active
                slides[index].classList.add('active');
                radios[index].classList.add('active');
            }
        }
        clrInterval();
    }

    function nextSlide() {
        var active_slide = document.querySelector('.slide.active');
        var active_radio = document.querySelector('.radio.active');

        //unset current slide & radio
        active_slide.classList.remove('active');
        active_radio.classList.remove('active');

        //set next slide & radio
        if (active_slide.nextElementSibling) {
            active_slide.nextElementSibling.classList.add('active');
            active_radio.nextElementSibling.classList.add('active');
        }
        else {  // if out of range
            slides[0].classList.add('active');
            radios[0].classList.add('active');
        }
    }

    function prevSlide() {
        var active_slide = document.querySelector('.slide.active');
        var active_radio = document.querySelector('.radio.active');

        //unset current slide & radio
        active_slide.classList.remove('active');
        active_radio.classList.remove('active');

        //set next slide & radio
        if (active_slide.previousElementSibling) {
            active_slide.previousElementSibling.classList.add('active');
            active_radio.previousElementSibling.classList.add('active');
        }
        else {  // if out of range
            slides[slides.length - 1].classList.add('active');
            radios[radios.length - 1].classList.add('active');
        }
    }

    function clrInterval() {
        clearInterval(slideInt);
        slideInt = setInterval(nextSlide, intTime);
    }

    slideInt = setInterval(nextSlide, intTime);
});
