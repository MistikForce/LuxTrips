// $(function(){
//     console.log("test");
//     topPanel("qwe");
// })

function lazyForSlider (el) {
    var showActiveSlides = function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    };
    var imageWidth = el.find("li").outerWidth() + "px";

    var observer = new window.IntersectionObserver(showActiveSlides, {
        root: el.parent()[0],
        rootMargin: " 0px "+ imageWidth + " 0px " + imageWidth
    });
    console.log(observer);

    el.find("li img").each(function () {
        observer.observe(this);
    });
}

const raiting = (r)=> `<div class="rait">${r.toFixed(1)}</div>`+'<div class="romb romb1"></div>'.repeat(5-r)+'<div class="romb"></div>'.repeat(r);

$(function(){
    // Фикс Хедер
    $(window).on('scroll', function(){
        if($(window).scrollTop()>0){
            if(!$('body').hasClass('fixed_nav')){
            $('body').addClass('fixed_nav');
            }
        }else{
            if($('body').hasClass('fixed_nav')){
            $('body').removeClass('fixed_nav');
            }
        }
    });
    // Гамбургер меню
    $(".hamburger, #page_overlay").on('click', function(){
        $("#mobile_menu_wrap .hamburger").toggleClass("is-active");
        $("body").toggleClass("open");
    });
    //Плавный скрол на якоря
    $('.anchor').on('click', function(e){
        e.preventDefault();
        const top = $($(this).attr('href')).offset().top;
        $('html, body').animate({scrollTop:top+'px'}, 900);
    });
    $('.anchor_on_top').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 1500);
    });
    //карточки на главной
    $.ajax({
        url:'assets/common/tours.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            for(let i=0;i<json.length;i++){
                html += `
                <li class="card">
                    <a href="package.html">
                        <div class="info">
                            <div class="col_info">
                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 0.5C7.2069 0.5 9 2.24603 9 4.39499C9 5.17399 8.73793 5.89927 8.35172 6.51709C7.46897 7.95421 5 11.5 5 11.5C5 11.5 2.53103 7.95421 1.64828 6.51709C1.26207 5.89927 1 5.17399 1 4.39499C1 2.24603 2.7931 0.5 5 0.5Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="overhead">${json[i].country}</span>
                                <h4>${json[i].place}</h4>
                                <div class="price_wrap">
                                    <span>from</span>
                                    <span>&euro; ${json[i].price}</span>
                                </div>
                            </div>
                            <div class="col_rait">
                                ${raiting(json[i].rait)}
                            </div>
                        </div>
                        <div class="image"><img src="${json[i].image}" alt="${json[i].place}"></div>
                    </a>
                </li>`;
            }
            $("#slider").html(html);
            $("#slider").lightSlider({
                item:3,
                auto: true,
                speed: 2000,
                pause: 2200,
                // loop: true,
                slideMargin: 30,
                // adaptiveHeight:true,
                pager: false,
                responsive : [
                    {
                    breakpoint: 1000,
                    settings: 
                        {
                        item:2,
                        slideMargin: 30,
                        }
                    },
                    {
                    breakpoint:600,
                    settings: 
                        {
                        item:1,
                        }
                    }
                ]
            });
            $(".prev").on('click', function(){slider.goToPrevSlide()});
            $(".next").on('click', function(){slider.goToNextSlide()});
        }
    });
    //карточки на странице люкс пэкаджес
    $.ajax({
        url:'assets/common/tours.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            for(let i=0;i<json.length;i++){
                html += `
                <li class="card">
                    <a href="package.html">
                        <div class="info">
                            <div class="col_info">
                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 0.5C7.2069 0.5 9 2.24603 9 4.39499C9 5.17399 8.73793 5.89927 8.35172 6.51709C7.46897 7.95421 5 11.5 5 11.5C5 11.5 2.53103 7.95421 1.64828 6.51709C1.26207 5.89927 1 5.17399 1 4.39499C1 2.24603 2.7931 0.5 5 0.5Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="overhead">${json[i].country}</span>
                                <h4>${json[i].place}</h4>
                                <div class="price_wrap">
                                    <span>from</span>
                                    <span>&euro; ${json[i].price}</span>
                                </div>
                            </div>
                            <div class="col_rait">
                                ${raiting(json[i].rait)}
                            </div>
                        </div>
                        <div class="image"><img src="${json[i].image}" alt="${json[i].place}"></div>
                    </a>
                </li>`;
            }
            $("#lux_pack").html(html);
        }
    });   
    $("#slider_reviews").lightSlider({
        item:2,
        auto: false,
        speed: 3000,
        pause: 3000,
        slideMargin: 30,
        pager: false,
        responsive : [
            {
            breakpoint: 800,
            settings: 
                {
                item:1,
                }
            }
        ]
    });
    //карта в табах
    $("#init_map").on('click', function(){
        $(this).remove();
        // Этого достаточно для отображения карты, без всяких инициализаций и маркеров
        var map = L.map('map').setView([-13.1634363, -72.5447859], 18);
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        //можно коректировать пути к маркеру, или менять на кастомный
        var myIcon = L.icon({
            iconUrl: 'assets/images/map_marker.png',
            iconSize: [40, 70],
        });
        //вставляем маркер
        const marker = L.marker([-13.1634363, -72.5447859], {icon:myIcon}).addTo(map)
        .bindPopup(`
        <div class="map_popup">
        <img src="assets/images/car_1.jpg" alt="">
        <div class="map_info">
        <b>Hello</b>
        <p>I am here</p>
        </div>
        </div>
        `);
    });
    //карта в контакстах
    $("#init_contact_map").on('click', function(){
        $(this).remove();
        // Этого достаточно для отображения карты, без всяких инициализаций и маркеров
        var map = L.map('contact_map').setView([46.0026361, 8.9623026], 12);
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        //можно коректировать пути к маркеру, или менять на кастомный
        var myIcon = L.icon({
            iconUrl: 'assets/images/map_marker.png',
            iconSize: [40, 70],
        });
        //вставляем маркер
        const marker = L.marker([46.0026361, 8.9623026], {icon:myIcon}).addTo(map)
        .bindPopup(`
        <div class="map_popup">
        <img src="assets/images/car_1.jpg" alt="">
        <div class="map_info">
        <b>Hello</b>
        <p>I am here</p>
        </div>
        </div>
        `);
    });
    //галерея
    lightGallery(document.getElementById('light_gallery'), {
        plugins: [lgZoom, lgThumbnail],
        speed: 500,
        thumbnail: true,
        preload: true,
        actualSize: true,
        animateThumb: true,
        zoomFromOrigin: true,
    });    
    // $("#light_gallery").lightGallery({
    //     plugins: [lgZoom, lgThumbnail],
    //     speed: 500,
    //     thumbnail: true,
    //     preload: true,
    //     actualSize: true,
    //     animateThumb: true,
    //     zoomFromOrigin: true,
    // });
    $('.tabs_item').on('click', function(e){
        e.preventDefault();
        if(!$(this).hasClass('active')){
            $('.tabs_item').removeClass('active');
            $(this).addClass('active');
            $('.tabs_block').removeClass('active');
            $($(this).attr('href')).addClass('active');
        }
    });

    // валидация форм 
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };  
    let email = $('.form_email').val().trim();
    // const validate = () => {
    //     const $result = $('#result');
    //     $result.text('');
    //     if (validateEmail(email)) {
    //         $result.text(email + ' is valid :)');
    //         $result.css('color', 'green');
    //         $result.css('display', 'block');
    //     } else {
    //         $result.text(email + ' is not valid :(');
    //         $result.css('color', 'red');
    //         $result.css('display', 'block');
    //     }
    //     return false;
    // }
    // validate();

    $('#subscribe_form').on('submit', function (e){
        e.preventDefault()
        if (email === ''){
            tata.error('Enter your email', 'LuxTrips.com')
        }else{
            const validate = () => {
            const $result = $('#result');
            $result.text('');
            if (validateEmail(email)) {
                $result.text(email + ' is valid :)');
                $result.css('color', 'green');
                $result.css('display', 'block');
            } else {
                $result.text(email + ' is not valid :(');
                $result.css('color', 'red');
                $result.css('display', 'block');
            }
            return false;
            }
            validate();
        }
    });

    function validateForm () {
        if ($('.form_name').val().trim() === ''){
            tata.success('Enter your name', 'LuxTrips.com')
        }
        if ($('.form_email').val().trim() === ''){
            tata.success('Enter your email', 'LuxTrips.com')
        }
        if ($('.form_phone').val().trim() === ''){
            tata.success('Enter your number', 'LuxTrips.com')
        }
    }

});