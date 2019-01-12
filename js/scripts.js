$(document).ready(function(){
   
    var widthScreen = $(window).width();

    if(widthScreen >= 1200){

        var elStart = document.getElementById("start");
        var elProjects = document.getElementById("projects");
        
        // переменные для touch event
        var startPoint ;
        var endPoint ;
        var touchDelta = 0;

        window.addEventListener('touchstart', function(event) {
          startPoint = event.changedTouches[0].pageY;
        }, false);


        //start to menu
        elStart.addEventListener("wheel", function (event) {
            if(event.deltaY > 0){
                $('.start').fadeOut(200,function(){
                    $('.start').removeClass('visible');
                    $('.menu').fadeIn(100,function(){
                        $('.menu').addClass('visible');
                    });
                });
            }
        }, true);

        //start to menu touch
        elStart.addEventListener('touchend', function(event) {
            endPoint = event.changedTouches[0].pageY;
            if((endPoint - startPoint) < -50) {
                $('.start').fadeOut(200,function(){
                    $('.start').removeClass('visible');
                    $('.menu').fadeIn(100,function(){
                        $('.menu').addClass('visible');
                    });
                });
            }
        }, false);

        //==========projects===================

        var activeSlide = 0;
        var canAnimate = true;
        var isOpened = $('.projects-wr__title').hasClass('opened');

        //названия проектов
        var projectsName = ['yorso','investore','ITS'];
        //текста с проектов
        var projectsSmallDescr = [
            'The only online solution for traditional business',
            'Accessible and state-of-art online investments to commercial property',
            'Newest data technologies to monitor transport infrastructure'
        ];
        var hoveredProject = false;
        $('.projects-wr__title__count-sildes__count').text('/ 0'+$('.project__slide').length);

        
        function ProjectsClassesScrollBott(activeSlide){
            var selectorNext = '.project__slide--'+(activeSlide + 1);
            var selectorPrev =  '.project__slide--'+(activeSlide == 0? $('.project__slide').length : activeSlide);
            $('.project__slide').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
            $(selectorPrev).addClass('hide-scroll-bott');
            $(selectorNext).addClass('visible-scroll-bott');
            $('.projects-wr__title__count-sildes__selected').text('0' + (activeSlide + 1));
            $('.name-project').text(projectsName[activeSlide]);
            $('.small-descr-project__text').text(projectsSmallDescr[activeSlide]);
            $(selectorNext).bind('animationend webkitAnimationEnd', function() {     
                setTimeout(function(){
                    canAnimate = true;
                },300); 
            });
        

        }
        function ProjectsClassesScrollTop(activeSlide){
            var selectorNext = '.project__slide--'+(activeSlide + 1);
            var selectorPrev =  '.project__slide--'+(activeSlide == ($('.project__slide').length - 1) ? 1 : (activeSlide + 2));
            $('.project__slide').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
            $(selectorPrev).addClass('hide-scroll-top');
            $(selectorNext).addClass('visible-scroll-top');
            $('.projects-wr__title__count-sildes__selected').text('0' + (activeSlide + 1));
            $('.name-project').text(projectsName[activeSlide]);
            $('.small-descr-project__text').text(projectsSmallDescr[activeSlide]);
            $(selectorNext).bind('animationend webkitAnimationEnd', function() {
                setTimeout(function(){
                    canAnimate = true;
                },300); 
            });

        }
        function openNextProject(activeSlide){
            var selectorNext = '.project__slide--'+(activeSlide + 1);
            var selectorPrev =  '.project__slide--'+(activeSlide == ($('.project__slide').length - 1) ? 1 : (activeSlide + 2));
            $(selectorPrev).removeClass('opened').removeClass('scrolled-proj');
            $(selectorNext).addClass('opened');
            $('.projects-wr__title').removeClass('scrolled-proj').addClass('opened');
            $('.project__slide').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
            $(selectorNext).find('.project__slide__closed-wrapp').addClass('next-proj-anim');
            $(selectorNext).addClass('visible-scroll-top');
            $('.projects-wr__title__count-sildes__selected').text('0' + (activeSlide + 1));
            $('.name-project').text(projectsName[activeSlide]);
            $('.small-descr-project__text').text(projectsSmallDescr[activeSlide]);
            $(selectorNext).bind('animationend webkitAnimationEnd', function() {
                setTimeout(function(){
                    canAnimate = true;
                },300); 
            });
        }


        
        elProjects.addEventListener("wheel", function (event) {
            isOpened = $('.projects-wr__title').hasClass('opened');
            if(canAnimate && !hoveredProject && !isOpened){
                if(event.deltaY > 0){
                    canAnimate = false;
                    activeSlide += 1;
                    if(activeSlide >= $('.project__slide').length){
                        activeSlide = 0;
                    }
                    ProjectsClassesScrollBott(activeSlide);
                }
                if(event.deltaY < 0){
                    canAnimate = false;
                    activeSlide -= 1;
                    if(activeSlide < 0){
                        activeSlide = ($('.project__slide').length - 1);
                    }
                    ProjectsClassesScrollTop(activeSlide)
                }
            }
        }, true);
        
        //touch
        elProjects.addEventListener('touchend', function(event) {
            if(!$('.projects-wr__title').hasClass('opened')){
                endPoint=event.changedTouches[0].pageY;
                isOpened = $('.projects-wr__title').hasClass('opened');
                if(canAnimate && !hoveredProject && !isOpened){
                    if((endPoint - startPoint) > 50) {
                        canAnimate = false;
                        activeSlide -= 1;
                        if(activeSlide < 0){
                            activeSlide = ($('.project__slide').length - 1);
                        }
                        ProjectsClassesScrollTop(activeSlide)
                    }
                    else if ((endPoint - startPoint) < -50) {
                        canAnimate = false;
                        activeSlide += 1;
                        if(activeSlide >= $('.project__slide').length){
                            activeSlide = 0;
                        }
                        ProjectsClassesScrollBott(activeSlide);
                    }
                }
            }
            else{
                endPoint=event.changedTouches[0].pageY;
                if((endPoint - startPoint) > 50) {
                    $('.project__slide.opened').removeClass('scrolled-proj');
                    $('.projects-wr__title.opened').removeClass('scrolled-proj');
                }
                else if ((endPoint - startPoint) < -50) {
                    $('.project__slide.opened').addClass('scrolled-proj');
                    $('.projects-wr__title.opened').addClass('scrolled-proj');
                }
            }
        }, true);
        
        //project hover
        $(' .projects-wr__title').mouseover(function() {
            $('.projects-wr__title').addClass('hover-project');
            $('.project__slide.visible-scroll-bott .project__slide__closed-wrapp, .project__slide.visible-scroll-top .project__slide__closed-wrapp').addClass('hover-project');
            hoveredProject = true;
        });
        $('.projects-wr__title').mouseout(function() {
            $('.projects-wr__title').removeClass('hover-project');
            $('.project__slide.visible-scroll-bott .project__slide__closed-wrapp, .project__slide.visible-scroll-top .project__slide__closed-wrapp').removeClass('hover-project');
            hoveredProject = false;
        });

        //project open

        $('.view-project__butt').click(function(){
            $('.project__slide--'+(activeSlide + 1)).addClass('opened');
            $('.projects-wr__title').addClass('opened');
            $('.projects-wr').addClass('project-opened');
        });
        
        //project close

        $('.close-project').click(function(){
            $('.project__slide').removeClass('opened').removeClass('scrolled-proj');
            $('.projects-wr__title').removeClass('opened').removeClass('hover-project');
            $('.project__slide__closed-wrapp').removeClass('hover-project');
            $('.projects-wr').removeClass('project-opened');
        });


        //scroll opened project

        $('.project__slide, .projects-wr__title').on('mousewheel', function (event) {
            if($(this).hasClass('opened')){
                if(event.originalEvent.deltaY > 0){
                    $('.project__slide.opened').addClass('scrolled-proj');
                    $('.projects-wr__title.opened').addClass('scrolled-proj');
                }
                if(event.originalEvent.deltaY < 0){
                    $('.project__slide.opened').removeClass('scrolled-proj');
                    $('.projects-wr__title.opened').removeClass('scrolled-proj');
                }
            }
        });
       
        //go to next project

        $('.hover-zone-project').click(function(){
            activeSlide += 1;
            if(activeSlide >= $('.project__slide').length){
                activeSlide = 0;
            }
            openNextProject(activeSlide);
        });


        //open menu

        $('.open-close-menu').click(function(){
            if(!$(this).hasClass("opened")){
                $(this).addClass('opened');
                $('.menu').fadeIn(300,function(){
                    $('.menu').addClass('visible');
                });
            }
            else{
                $(this).removeClass('opened');
                $('.menu').fadeOut(200,function(){
                    $('.menu').removeClass('visible');
                });
            }
        });

        function closeProjectOnChangePage(){
            $('.project__slide').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top scrolled-proj opened');
            $('.projects-wr__title').removeClass('opened');
            $('.projects-wr__title').removeClass('opened hover-project scrolled-proj')
            $('.project__slide__closed-wrapp').removeClass('hover-project');
            $('.projects-wr').removeClass('project-opened');
            activeSlide = 0; 
        }

        //open section from menu

        $('.menu__list li span').click(function (e) {
            $('.open-close-menu').addClass("showed");
            if ($(this).attr('data-href')) {
                var el = $(this).attr('data-href');
                $('.page').removeClass('visible');
                closeProjectOnChangePage();
                
                $('.menu').fadeOut(200,function(){
                    $('.menu').removeClass('visible');
                    $('.project__slide:first-child()').addClass('visible-scroll-bott');
                    $(el).addClass('visible');
                    $('.open-close-menu').removeClass('opened');
                });
                return;
            }
        });

        //=========== about ==============

        var elAbout = document.getElementById("about");
        var canAnimateAbout = true
        var activeSlideAbout = 0;
        var timingChangeSlide = [750,750,850,450,450,450];

        function AboutClassesScrollBott(activeSlide){
            var selectorNext = '.about-sl-'+(activeSlide + 1);
            var selectorPrev =  '.about-sl-'+(activeSlide == 0? $('.about-sl__slide').length : activeSlide);
            $(selectorPrev).removeClass('visible-scroll-bott hide-scroll-bott').addClass('hide-scroll-bott');
            $(selectorPrev+'-dot').removeClass('active-show-left active-hide-right active');
            $(selectorPrev+'-dot').addClass('active-hide-right');
            setTimeout(function(){
                $(selectorNext+'-dot').addClass('active-show-left active');
                $(selectorPrev).removeClass('opened hide-scroll-bott');
                $(selectorNext).addClass('opened visible-scroll-bott');
                if(activeSlide >= 2){
                    $('#about').addClass('white-bg');
                    $('.dots-about__list').addClass('black-style');
                    $('.open-close-menu').addClass('black-style')
                }
                else{
                    $('#about').removeClass('white-bg');
                    $('.dots-about__list').removeClass('black-style');
                    $('.open-close-menu').removeClass('black-style');
                }
                if(activeSlide >= 3){
                    $('.fixed-we-are').addClass('visible');
                    if(activeSlide == 4){
                        $('.fixed-we-are').addClass('color-black');
                    }
                    else{
                        $('.fixed-we-are').removeClass('color-black');
                    }
                    if(activeSlide == 5){
                        $('.fixed-we-are').addClass('hiring-visible');
                        $('.dots-about__list').removeClass('black-style');
                        $('.open-close-menu').removeClass('black-style')
                    }
                    else{
                        $('.fixed-we-are').removeClass('hiring-visible');
                    }
                }
                else{
                    $('.fixed-we-are').removeClass('visible');
                }
                setTimeout(function(){
                    canAnimateAbout = true;
                },500);
            },timingChangeSlide[activeSlide]);
        }

        function AboutClassesScrollTop(activeSlide){
            var selectorNext = '.about-sl-'+(activeSlide + 1);
            var selectorPrev =  '.about-sl-'+(activeSlide == ($('.about-sl__slide').length - 1) ? 1 : (activeSlide + 2));
            $(selectorPrev).removeClass('visible-scroll-bott hide-scroll-bott').addClass('hide-scroll-bott');
            $(selectorPrev+'-dot').removeClass('active-show-left active-hide-right active');
            setTimeout(function(){
                $(selectorNext+'-dot').addClass('active-hide-right active');
                $(selectorPrev).removeClass('opened hide-scroll-bott');
                $(selectorNext).addClass('opened visible-scroll-bott');
                if(activeSlide >= 2){
                    $('#about').addClass('white-bg');
                    $('.dots-about__list').addClass('black-style');
                    $('.open-close-menu').addClass('black-style');
                }
                else{
                    $('#about').removeClass('white-bg');
                    $('.dots-about__list').removeClass('black-style');
                    $('.open-close-menu').removeClass('black-style');
                }
                if(activeSlide >= 3){
                    $('.fixed-we-are').addClass('visible');
                    if(activeSlide == 4){
                        $('.fixed-we-are').addClass('color-black');
                    }
                    else{
                        $('.fixed-we-are').removeClass('color-black');
                    }
                    if(activeSlide == 5){
                        $('.fixed-we-are').addClass('hiring-visible');
                        $('.dots-about__list').removeClass('black-style');
                        $('.open-close-menu').removeClass('black-style')
                    }
                    else{
                        $('.fixed-we-are').removeClass('hiring-visible');
                    }
                }
                else{
                    $('.fixed-we-are').removeClass('visible');
                }
                setTimeout(function(){
                    canAnimateAbout = true;
                },500); 
            },timingChangeSlide[activeSlide]);
        }

        elAbout.addEventListener("wheel", function (event) {
            if(canAnimateAbout){
                if(event.deltaY > 0){
                    canAnimateAbout = false;
                    activeSlideAbout += 1;
                    if(activeSlideAbout >= $('.about-sl__slide').length){
                        activeSlideAbout = 0;
                    }
                    AboutClassesScrollBott(activeSlideAbout);
                }
                if(event.deltaY < 0){
                    canAnimateAbout = false;
                    activeSlideAbout -= 1;
                    if(activeSlideAbout < 0){
                        activeSlideAbout = ($('.about-sl__slide').length - 1);
                    }
                    AboutClassesScrollTop(activeSlideAbout)
                }
            }
        }, true);

        //touch
        elAbout.addEventListener("touchend", function (event) {
            if(canAnimateAbout){
                if((endPoint - startPoint) > 50) {
                    canAnimateAbout = false;
                    activeSlideAbout -= 1;
                    if(activeSlideAbout < 0){
                        activeSlideAbout = ($('.about-sl__slide').length - 1);
                    }
                    AboutClassesScrollTop(activeSlideAbout);
                }
                else if ((endPoint - startPoint) < -50) {
                    canAnimateAbout = false;
                    activeSlideAbout += 1;
                    if(activeSlideAbout >= $('.about-sl__slide').length){
                        activeSlideAbout = 0;
                    }
                    AboutClassesScrollBott(activeSlideAbout);
                }
            }
        }, true);



        //==============news==============

        var activeSlideNews = 0;

        function newsScrollBott(activeSlide){
            var indexNext = activeSlide + 1;
            var indexPrev =  (activeSlide == 0 ? $('.tab-pane.active .new-content__counter__item .news-animation').length : activeSlide);
            $('.news-animation').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
            $('.news-animation:nth-child('+indexPrev+')').addClass('hide-scroll-bott');
            $('.news-animation:nth-child('+indexNext+')').addClass('visible-scroll-bott');
            setTimeout(function(){
                canAnimate = true;
            },500); 
        
        }
        function newsScrollTop(activeSlide){
            var indexNext = activeSlide + 1;
            var indexPrev =  activeSlide == ($('.tab-pane.active .new-content__counter__item .news-animation').length - 1) ? 1 : (activeSlide + 2);
            $('.news-animation').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
            $('.news-animation:nth-child('+indexPrev+')').addClass('hide-scroll-top');
            $('.news-animation:nth-child('+indexNext+')').addClass('visible-scroll-top');
            setTimeout(function(){
                canAnimate = true;
            },500);
        }

        $('.news-wrapp__right, .cube-bg').on('mousewheel', function (event) {
            if(canAnimate){
                if(event.originalEvent.deltaY > 0){
                    canAnimate = false;
                    activeSlideNews += 1;
                    if(activeSlideNews >= $('.tab-pane.active .new-content__counter__item .news-animation').length){
                        activeSlideNews = 0;
                    }
                    newsScrollBott(activeSlideNews);
                }
                if(event.originalEvent.deltaY < 0){
                    canAnimate = false;
                    activeSlideNews -= 1;
                    if(activeSlideNews < 0){
                        activeSlideNews = ($('.tab-pane.active .new-content__counter__item .news-animation').length - 1);
                    }
                    newsScrollTop(activeSlideNews)
                }
            }
        });

        //touch
        $('.news-wrapp__right, .cube-bg').on('touchend', function (event) {
            if(canAnimate){
                console.log(event);
                endPoint=event.originalEvent.changedTouches[0].pageY;
                if((endPoint - startPoint) > 50) {
                    canAnimate = false;
                    activeSlideNews -= 1;
                    if(activeSlideNews < 0){
                        activeSlideNews = ($('.tab-pane.active .new-content__counter__item .news-animation').length - 1);
                    }
                    newsScrollTop(activeSlideNews);
                }
                else if ((endPoint - startPoint) < -50) {
                    canAnimate = false;
                    activeSlideNews += 1;
                    if(activeSlideNews >= $('.tab-pane.active .new-content__counter__item .news-animation').length){
                        activeSlideNews = 0;
                    }
                    newsScrollBott(activeSlideNews);
                }
            }
        });


        $('.nav-tabs li a').click(function(){
            var id = $(this).attr('href');
            activeSlideNews = 0;
            $('.news-animation').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
            $(id + ' .news-animation:nth-child(1)').addClass('visible-scroll-bott')
        });


        //================contacts=====================

        $('.change-to-adress').click(function(){
            $('.contacts__wrapp').removeClass('form-mode');
            $('.contacts__wrapp').addClass('map-mode');
        });

        $('.change-to-contacts').click(function(){
            $('.contacts__wrapp').removeClass('map-mode');
            $('.contacts__wrapp').addClass('form-mode');
        });
    }


    //sm modals projects

    $('.modal-open-1').click(function(){
        $('#modal-yourso').modal('show');
    });
    $('.modal-open-2').click(function(){
        $('#modal-inv').modal('show');
    });
    $('.modal-open-3').click(function(){
        $('#modal-its').modal('show');
    });

    // sliders init / disabled

    var flagInitSlider = false;
    $('.modal').on('shown.bs.modal', function (e) {
        $('.modal-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false,
            dots:true,
            fade: true
        });
        $('.modal-slider').addClass('visible-slider');
        flagInitSlider = true;
    });
    $('.modal').on('hidden.bs.modal', function () {
        if(flagInitSlider){
            $('.modal-slider').slick('unslick');
            $('.modal-slider').removeClass('visible-slider');
            flagInitSlider = false;
        }
    });

});


$(window).load(function() {
   $('.start').addClass('loaded');
   setTimeout(function(){
    $('.start__scroller').addClass('delay');
   },800);
});
