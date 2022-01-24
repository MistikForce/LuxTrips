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
const raitingComment = (r)=> '<div class="romb romb1"></div>'.repeat(5-r)+'<div class="romb"></div>'.repeat(r);

$(function(){
    // Фикс Хедер
    $(window).on('scroll', function(){
        if($(window).scrollTop()>88){
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
                        <div class="image"><img data-src="${json[i].image}" alt="${json[i].place}"></div>
                    </a>
                </li>`;
            }
            $("#slider").html(html);
            let slider = $("#slider").lightSlider({
                item:3,
                auto: true,
                speed: 2000,
                pause: 2200,
                // loop: true,
                slideMargin: 30,
                // adaptiveHeight:true,
                onSliderLoad: function(el){lazyForSlider(el)},
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
    //слайдер отзывов 
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
    });
    //карта в контактах
    $("#init_contact_map").on('click', function(){
        $(this).remove();
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
    });
    //табы  
    $('.tabs_item').on('click', function(e){
        e.preventDefault();
        if(!$(this).hasClass('active')){
            $('.tabs_item').removeClass('active');
            $(this).addClass('active');
            $('.tabs_block').removeClass('active');
            $($(this).attr('href')).addClass('active');
        }
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
    // валидация форм + телеграмм
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };    
    const BOT_TOKEN = '5003716983:AAEDXQ0C0Ljct6LZJkOWu2nh2Im_0qY6RXY';
    const CHAT_ID = '-1001631956890';
    $(".form_phone").mask("+38 (999) 999-99-99");
    $('#subscribe_form').on('submit', function (e){
        e.preventDefault()
        let UserEmail = $('.form_email').val().trim();
        if (UserEmail === ''){
            tata.error('Enter your email', 'LuxTrips.com')
        }else if (UserEmail === ''){
            tata.error('Enter your email', 'LuxTrips.com')
        }else if (!validateEmail(UserEmail)) {
                tata.error(`${UserEmail} is not valid`, 'LuxTrips.com')
        }else{
            let text = encodeURI("<b>Email: </b>" +UserEmail);
            $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=`+text+'&parse_mode=html', (json)=>{
                if(json.ok){
                    $("#subscribe_form").trigger('reset');
                    tata.success('You ​successfully subscribe', 'LuxTrips.com')
                }else{
                    alert(json.description);
                }
            });
        }
    });
    $('#contact_form').on('submit', function (e){
        e.preventDefault()
        let UserName = $('.form_name').val().trim();
        let UserPhone = $('.form_phone').val().trim();
        if (UserName === ''){
            tata.error('Enter your name', 'LuxTrips.com')
        }else if(UserPhone === ''){
            tata.error('Enter your phone number', 'LuxTrips.com')
        }else{
            let text = encodeURI("<b>Name:</b> "+UserName+"\r\n<b>Phone:</b>" +UserPhone);
            $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=`+text+'&parse_mode=html', (json)=>{
                if(json.ok){
                    $("#contact_form").trigger('reset');
                    tata.success('Your data has been sent', 'LuxTrips.com')
                }else{
                    alert(json.description);
                }
            });
        }
    });
    // пост комментария
    $('#comment_form').on('submit', function (e){
        e.preventDefault()
        let UserEmail = $('.inp_mail').val().trim();
        let UserName = $('.inp_name').val().trim();
        let comment = $('.inp_comm').val().trim();
        let raitComfort = $('input[name="star1"]:checked').val();
        let raitHospitality = $('input[name="star2"]:checked').val();
        let raitHygiene = $('input[name="star3"]:checked').val();
        let raitReception = $('input[name="star4"]:checked').val();
        let html = `
            <div class="review_block">
                <div class="text_wrap">
                    <p class="citata">“${comment}”</p>
                    <div class="author">${UserName}</div>
                    <div class="date">${moment().format('lll')}</div>
                </div>
                <div class="raiting_wrap">
                    <div class="col_wrap">
                        <div class="rait_romb_col">
                            ${raitingComment(raitComfort)}
                        </div>
                        <div class="rait_text">Comfort</div>
                    </div>
                    <div class="col_wrap">
                        <div class="rait_romb_col">
                            ${raitingComment(raitHospitality)}
                        </div>
                        <div class="rait_text">Hospitality</div>
                    </div>
                    <div class="col_wrap">
                        <div class="rait_romb_col">
                            ${raitingComment(raitHygiene)}
                        </div>
                        <div class="rait_text">Hygiene</div>
                    </div>
                    <div class="col_wrap">
                        <div class="rait_romb_col">
                            ${raitingComment(raitReception)}
                        </div>
                        <div class="rait_text">Reception</div>
                    </div>
                </div>
            </div>`;
        if(UserName === ''){
            tata.error('Enter your name', 'LuxTrips.com')
        }else if (UserEmail === ''){
            tata.error('Enter your email', 'LuxTrips.com')
        }else if (!validateEmail(UserEmail)) {
                tata.error(`${UserEmail} is not valid`, 'LuxTrips.com')
        }else if(comment.length <= 30){
            tata.error('Minimum comment length 30 characters', 'LuxTrips.com')
        }else{
            $('.reviews_items').append(html);
            $("#comment_form").trigger('reset');
            tata.success('Сomment sent successfully', 'LuxTrips.com')

        }
    });
});