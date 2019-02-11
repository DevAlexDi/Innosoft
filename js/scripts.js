$(document).ready(function(){
   
    
    
   
    
    
    var widthScreen = $(window).width();
    var canAnimate  = true;
    
    
    if(widthScreen >= 1200){

        var elStart = document.getElementById("start");
        var elProjects = document.getElementById("projects-wr");
        var elContacts = document.getElementById("contacts");
        // переменные для touch event
        var startPoint ;
        var endPoint ;
        var touchDelta = 0;
        var prevTime = new Date().getTime();
        
//         var f = function(){
//            var curTime = new Date().getTime();
//            if(typeof prevTime !== 'undefined'){
//                var timeDiff = curTime-prevTime;
//                if(timeDiff>200){
//
//
//
//
//
//
//                }
//            }
//            prevTime = curTime;
//
//        }
//
//        $(window).on('mousewheel', f);
        
        
        
        window.addEventListener('touchstart', function(event) {
          startPoint = event.changedTouches[0].pageY;
            
        }, false);


        //start to menu
        elStart.addEventListener("wheel", function (event) {
            var curTime = new Date().getTime();
            if(typeof prevTime !== 'undefined'){
                var timeDiff = curTime-prevTime;
                if(timeDiff>50){
                    if(event.deltaY > 0){
                        $('.start').fadeOut(200,function(){
                            $('.start').removeClass('visible');
                            $('.menu').fadeIn(100,function(){
                                $('.menu').addClass('visible');
                                $('.projects-wr').addClass('visible');
                            });

                        });
                    }
                }
            }
            prevTime = curTime;
        }, true);

        //start to menu touch
        elStart.addEventListener('touchend', function(event) {
            endPoint = event.changedTouches[0].pageY;
            if((endPoint - startPoint) < -50) {
                $('.start').fadeOut(200,function(){
                    $('.start').removeClass('visible');
                    $('.menu').fadeIn(100,function(){
                        $('.menu').addClass('visible');
                        $('.projects-wr').addClass('visible');
                    });
                });
            }
        }, false);

        //projects
        
        //bg project
        
        var activeSlideProjects = 0;
        $('.projects-wrapp__left a').click(function(){
            $('.cube-bg').removeClass('cube-bg-show');
            $('.cube-bg:nth-child('+($(this).parent().index() + 1)+')').addClass('cube-bg-show');
            activeSlideProjects = $(this).parent().index();
        })
        
        
        elProjects.addEventListener("wheel", function (event) {
                var curTime = new Date().getTime();
                if(typeof prevTime !== 'undefined'){
                    var timeDiff = curTime-prevTime;
                    if(timeDiff>50){
                        if(canAnimateAbout){
                        canAnimateAbout = false;
                        if(event.deltaY > 0){
                            //вниз
                            activeSlideProjects += 1;
                            if(activeSlideProjects >= $('.projects-wrapp__left li').length){
                                activeSlideProjects -= 1;
                                $('.page').each(function(){
                                    if($(this).hasClass('visible')){
                                        $(this).addClass('hide-section');
                                    }
                                });
                                setTimeout(()=>{
                                    $('.menu__wrapp__left__list li span').each(function(e){
                                        if($(this).hasClass('active')){
                                            $('.menu__wrapp__left__list li span').removeClass('active');
                                            $('[data-href="#about"]').addClass('active');
                                        }   
                                    });
                                    if(activeSlideAbout >= 2){
                                        $('.menu').addClass('white-style');
                                    }
                                    else{
                                        $('.menu').removeClass('white-style');
                                    }
                                    if(activeSlideAbout == 5){
                                        $('.menu').removeClass('white-style');
                                    }
                                    $('.page').removeClass('visible hide-section');
                                    $('.about').addClass('visible');
                                    $('.about-sl-'+(activeSlideAbout + 1)).removeClass('hide-scroll-bott').addClass('visible-scroll-bott')
                                },650);
                                setTimeout(function(){
                                    canAnimateAbout = true;
                                },1350);
                                return;
                            }
                            setTimeout(function(){
                                canAnimateAbout = true;
                            },650);
                            $('.nav-tabs a[href="#projects-tab-'+(activeSlideProjects+1)+'"]').tab('show');
                            $('.cube-bg').removeClass('cube-bg-show');
                            $('.cube-bg:nth-child('+(activeSlideProjects + 1)+')').addClass('cube-bg-show');
                        }
                        if(event.deltaY < 0){
                            activeSlideProjects -= 1;

                            if(activeSlideProjects < 0){
                                activeSlideProjects += 1;
                                $('.page').each(function(){
                                    if($(this).hasClass('visible')){
                                        $(this).addClass('hide-section');
                                    }
                                });
                                setTimeout(()=>{
                                    $('.page').removeClass('visible hide-section');
                                    $('.start').addClass('visible');
                                    $('.menu').fadeOut(100,function(){
                                        $('.menu').removeClass('visible');
                                    });
                                    $('.start').fadeIn(200);
                                },650);
                                setTimeout(function(){
                                    canAnimateAbout = true;
                                },500);
                                return;
                            }
                            setTimeout(function(){
                                canAnimateAbout = true;
                            },650);
                            $('.nav-tabs a[href="#projects-tab-'+(activeSlideProjects+1)+'"]').tab('show');
                            $('.cube-bg').removeClass('cube-bg-show');
                            $('.cube-bg:nth-child('+(activeSlideProjects + 1)+')').addClass('cube-bg-show');
                        }
                    }
                    }

                }
            prevTime = curTime;
        }, true);

        //touch
        elProjects.addEventListener("touchend", function (event) {
            if(canAnimateAbout){
                endPoint = event.changedTouches[0].pageY;
                if((endPoint - startPoint) > 50) {
                    activeSlideProjects -= 1;
                    canAnimateAbout = false;
                    if(activeSlideProjects < 0){
                        activeSlideProjects += 1;
                        $('.page').each(function(){
                            if($(this).hasClass('visible')){
                                $(this).addClass('hide-section');
                            }
                        });
                        setTimeout(()=>{
                            $('.page').removeClass('visible hide-section');
                            $('.start').addClass('visible');
                            $('.menu').fadeOut(100,function(){
                                $('.menu').removeClass('visible');
                            });
                            $('.start').fadeIn(200);
                        },650);
                        setTimeout(function(){
                            canAnimateAbout = true;
                        },500);
                        return;
                    }
                    setTimeout(function(){
                        canAnimateAbout = true;
                    },800);
                    $('.nav-tabs a[href="#projects-tab-'+(activeSlideProjects+1)+'"]').tab('show');
                    $('.cube-bg').removeClass('cube-bg-show');
                    $('.cube-bg:nth-child('+(activeSlideProjects + 1)+')').addClass('cube-bg-show');
                }
                else if ((endPoint - startPoint) < -50) {
                   canAnimateAbout = false;
                    activeSlideProjects += 1;
                    if(activeSlideProjects >= $('.projects-wrapp__left li').length){
                        activeSlideProjects -= 1;
                        $('.page').each(function(){
                            if($(this).hasClass('visible')){
                                $(this).addClass('hide-section');
                            }
                        });
                        setTimeout(()=>{
                            $('.menu__wrapp__left__list li span').each(function(e){
                                if($(this).hasClass('active')){
                                    $('.menu__wrapp__left__list li span').removeClass('active');
                                    $('[data-href="#about"]').addClass('active');
                                }   
                            });
                            if(activeSlideAbout >= 2){
                                $('.menu').addClass('white-style');
                            }
                            else{
                                $('.menu').removeClass('white-style');
                            }
                            if(activeSlideAbout == 5){
                                $('.menu').removeClass('white-style');
                            }
                            $('.page').removeClass('visible hide-section');
                            $('.about').addClass('visible');
                            $('.about-sl-'+(activeSlideAbout + 1)).removeClass('hide-scroll-bott').addClass('visible-scroll-bott')
                        },650);
                        setTimeout(function(){
                            canAnimateAbout = true;
                        },1350);
                        return;
                    }
                    setTimeout(function(){
                        canAnimateAbout = true;
                    },800);
                    $('.nav-tabs a[href="#projects-tab-'+(activeSlideProjects+1)+'"]').tab('show');
                    $('.cube-bg').removeClass('cube-bg-show');
                    $('.cube-bg:nth-child('+(activeSlideProjects + 1)+')').addClass('cube-bg-show');
                }
            }
        }, true);
        
        
        

        //open section from menu

        $('.menu__wrapp__left__list li span').click(function (e) {
            if ($(this).attr('data-href')) {
                var el = $(this).attr('data-href');         
                $('.page').each(function(){
                    if($(this).hasClass('visible')){
                        $(this).addClass('hide-section');
                    }
                });
                if($('.about').hasClass('visible')){
                   $('.about-sl-'+(activeSlideAbout + 1)).removeClass('visible-scroll-bott hide-scroll-bott').addClass('hide-scroll-bott')
                    
                }
                setTimeout(()=>{
                    
                    $('.menu__wrapp__left__list li span').removeClass('active');
                    $(this).addClass('active');
                    $('.page').removeClass('visible hide-section');
                    $(el).addClass('visible');
                    $('.menu').removeClass('white-style');
                                     
                    if(el == '#about'){
                       $('.about-sl-'+(activeSlideAbout + 1)).removeClass('hide-scroll-bott').addClass('visible-scroll-bott');
                        if(activeSlideAbout >= 2){
                            $('.menu').addClass('white-style');
                        }
                        else{
                            $('.menu').removeClass('white-style');
                        }
                        if(activeSlideAbout == 5){
                            $('.menu').removeClass('white-style');
                        }
                    }
                    
                    
                },750);
                
                return;
            }
        });

        //=========== about ==============

        var elAbout = document.getElementById("about");
        var canAnimateAbout = true
        var activeSlideAbout = 0;
        //тайминги анимаций
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
                    $('.open-close-menu').addClass('black-style');
                    $('.menu').addClass('white-style');
                }
                else{
                    $('#about').removeClass('white-bg');
                    $('.dots-about__list').removeClass('black-style');
                    $('.open-close-menu').removeClass('black-style');
                     $('.menu').removeClass('white-style');
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
                        $('.open-close-menu').removeClass('black-style');
                        $('.menu').removeClass('white-style');
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
                    $('.menu').addClass('white-style');
                }
                else{
                    $('#about').removeClass('white-bg');
                    $('.dots-about__list').removeClass('black-style');
                    $('.open-close-menu').removeClass('black-style');
                    $('.menu').removeClass('white-style');
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
                        $('.open-close-menu').removeClass('black-style');
                         $('.menu').removeClass('white-style');
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
            
            
            var curTime = new Date().getTime();
            if(typeof prevTime !== 'undefined'){
                var timeDiff = curTime-prevTime;
                if(timeDiff>50){
                    if(canAnimateAbout){
                    canAnimateAbout = false;
                    if(event.deltaY > 0){

                        activeSlideAbout += 1;
                        if(activeSlideAbout >= $('.about-sl__slide').length){
                            activeSlideAbout -= 1;
                            $('.page').each(function(){
                                if($(this).hasClass('visible')){
                                    $(this).addClass('hide-section');
                                }
                            });
                            if($('.about').hasClass('visible')){
                               $('.about-sl-'+(activeSlideAbout + 1)).removeClass('visible-scroll-bott hide-scroll-bott').addClass('hide-scroll-bott')

                            }
                            setTimeout(()=>{
                                $('.menu__wrapp__left__list li span').each(function(e){
                                    if($(this).hasClass('active')){
                                        $('.menu__wrapp__left__list li span').removeClass('active');
                                        $('[data-href="#news"]').addClass('active');
                                    }   
                                });
                                $('.page').removeClass('visible hide-section');
                                $('.news').addClass('visible');

                            },650);
                            setTimeout(function(){
                                canAnimateAbout = true;
                            },1350); 
                            return;
                        }
                        AboutClassesScrollBott(activeSlideAbout);
                    }
                    if(event.deltaY < 0){

                        activeSlideAbout -= 1;
                        if(activeSlideAbout < 0){
                            activeSlideAbout += 1;
                            $('.page').each(function(){
                                if($(this).hasClass('visible')){
                                    $(this).addClass('hide-section');
                                }
                            });
                            if($('.about').hasClass('visible')){
                               $('.about-sl-'+(activeSlideAbout + 1)).removeClass('visible-scroll-bott hide-scroll-bott').addClass('hide-scroll-bott');

                            }
                            setTimeout(()=>{
                                $('.menu__wrapp__left__list li span').each(function(e){
                                    if($(this).hasClass('active')){
                                        $('.menu__wrapp__left__list li span').removeClass('active');
                                        $('[data-href="#projects-wr"]').addClass('active');
                                    }   
                                });
                                $('.page').removeClass('visible hide-section');
                                $('.projects-wr').addClass('visible');

                            },650);
                            setTimeout(function(){
                                canAnimateAbout = true;
                            },1350); 
                            return;
                        }
                        AboutClassesScrollTop(activeSlideAbout)
                    }
                }
                }
            }
            prevTime = curTime;
           
        }, true);

        //touch
        elAbout.addEventListener("touchend", function (event) {
            endPoint = event.changedTouches[0].pageY;
            if(canAnimateAbout){
                if((endPoint - startPoint) > 50) {
                    canAnimateAbout = false;
                    activeSlideAbout -= 1;
                    if(activeSlideAbout < 0){
                        activeSlideAbout += 1;
                        $('.page').each(function(){
                            if($(this).hasClass('visible')){
                                $(this).addClass('hide-section');
                            }
                        });
                        if($('.about').hasClass('visible')){
                           $('.about-sl-'+(activeSlideAbout + 1)).removeClass('visible-scroll-bott hide-scroll-bott').addClass('hide-scroll-bott')

                        }
                        setTimeout(()=>{
                            $('.menu__wrapp__left__list li span').each(function(e){
                                if($(this).hasClass('active')){
                                    $('.menu__wrapp__left__list li span').removeClass('active');
                                    $('[data-href="#projects-wr"]').addClass('active');
                                }   
                            });
                            $('.page').removeClass('visible hide-section');
                            $('.projects-wr').addClass('visible');

                        },650);
                        setTimeout(function(){
                            canAnimateAbout = true;
                        },600); 
                        return;
                    }
                    AboutClassesScrollTop(activeSlideAbout);
                }
                else if ((endPoint - startPoint) < -50) {
                    canAnimateAbout = false;
                    activeSlideAbout += 1;
                    if(activeSlideAbout >= $('.about-sl__slide').length){
                        activeSlideAbout -= 1;
                        $('.page').each(function(){
                            if($(this).hasClass('visible')){
                                $(this).addClass('hide-section');
                            }
                        });
                        if($('.about').hasClass('visible')){
                           $('.about-sl-'+(activeSlideAbout + 1)).removeClass('visible-scroll-bott hide-scroll-bott').addClass('hide-scroll-bott')

                        }
                       
                        setTimeout(()=>{
                            $('.menu__wrapp__left__list li span').each(function(e){
                                if($(this).hasClass('active')){
                                    $('.menu__wrapp__left__list li span').removeClass('active');
                                    $('[data-href="#news"]').addClass('active');
                                }   
                            });
                            
                            $('.page').removeClass('visible hide-section');
                            $('.news').addClass('visible');

                        },650);
                        setTimeout(function(){
                            canAnimateAbout = true;
                        },600); 
                        return;
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

        //arrows click
        $('.arrows-news-wrapp__butt--top').click(function(){
           if(canAnimate){
               canAnimate = false;
                activeSlideNews -= 1;
                if(activeSlideNews < 0){
                    activeSlideNews = ($('.tab-pane.active .new-content__counter__item .news-animation').length - 1);
                }
                newsScrollTop(activeSlideNews)
           }
        });
        $('.arrows-news-wrapp__butt--bott').click(function(){
           if(canAnimate){
                canAnimate = false;
                activeSlideNews += 1;
                if(activeSlideNews >= $('.tab-pane.active .new-content__counter__item .news-animation').length){
                    activeSlideNews = 0;
                }
                newsScrollBott(activeSlideNews);
           }
        });
        
        
        //news scroll page
        var activeSlideNewsTabs = 0;
        $('.news').on('mousewheel', function (event) {
            
            var curTime = new Date().getTime();
            if(typeof prevTime !== 'undefined'){
                var timeDiff = curTime-prevTime;
                if(timeDiff>50){
                    if(canAnimateAbout){
                    activeSlideNews = 0;
                    $('.news-animation').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
                    $('.news-animation:nth-child(1)').addClass('visible-scroll-bott');
                    canAnimateAbout = false;
                    if(event.originalEvent.deltaY > 0){

                        activeSlideNewsTabs += 1;

                        if(activeSlideNewsTabs >= $('.news-wrapp__left .nav li').length){
                            activeSlideNewsTabs -= 1;
                            $('.page').each(function(){
                                if($(this).hasClass('visible')){
                                    $(this).addClass('hide-section');
                                }
                            });
                            setTimeout(()=>{
                                $('.page').removeClass('visible hide-section');
                                $('.contacts').addClass('visible');
                                $('.menu__wrapp__left__list li span').each(function(e){
                                    if($(this).hasClass('active')){
                                        $('.menu__wrapp__left__list li span').removeClass('active');
                                        $('[data-href="#contacts"]').addClass('active');
                                    }   
                                });
                            },750);
                            setTimeout(function(){
                                canAnimateAbout = true;
                            },1350);
                            return;
                        }
                        setTimeout(function(){
                            canAnimateAbout = true;
                        },800);
                        $('.news-wrapp__left .nav-tabs a[href="#news-tab-'+(activeSlideNewsTabs+1)+'"]').tab('show');
                    }
                    if(event.originalEvent.deltaY < 0){
                        activeSlideNewsTabs -= 1;

                        if(activeSlideNewsTabs < 0){
                            activeSlideNewsTabs += 1;
                            $('.page').each(function(){
                                if($(this).hasClass('visible')){
                                    $(this).addClass('hide-section');
                                }
                            });
                            setTimeout(()=>{
                                $('.page').removeClass('visible hide-section');
                                $('.about').addClass('visible');
                                 $('.about-sl-'+(activeSlideAbout + 1)).removeClass('hide-scroll-bott').addClass('visible-scroll-bott');
                                if(activeSlideAbout >= 2){
                                    $('.menu').addClass('white-style');
                                }
                                else{
                                    $('.menu').removeClass('white-style');
                                }
                                if(activeSlideAbout == 5){
                                    $('.menu').removeClass('white-style');
                                }
                                $('.menu__wrapp__left__list li span').each(function(e){
                                    if($(this).hasClass('active')){
                                        $('.menu__wrapp__left__list li span').removeClass('active');
                                        $('[data-href="#about"]').addClass('active');
                                    }   
                                });
                            },750);
                            setTimeout(function(){
                                canAnimateAbout = true;
                            },1350);
                            return;

                        }
                        setTimeout(function(){
                            canAnimateAbout = true;
                        },800);
                        $('.news-wrapp__left .nav-tabs a[href="#news-tab-'+(activeSlideNewsTabs+1)+'"]').tab('show');

                    }
                }
                }
            }
            prevTime = curTime;
           
        });
        
        //touch
        $('.news').on('touchend', function (event) {  
            if(canAnimateAbout){
                endPoint=event.originalEvent.changedTouches[0].pageY;
                $('.news-animation').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
                $('.news-animation:nth-child(1)').addClass('visible-scroll-bott');
                if((endPoint - startPoint) > 50) {
                    activeSlideNews = 0;
                    activeSlideNewsTabs -= 1;
                    canAnimateAbout = false;
                    if(activeSlideNewsTabs < 0){
                        activeSlideNewsTabs += 1;
                        $('.page').each(function(){
                            if($(this).hasClass('visible')){
                                $(this).addClass('hide-section');
                            }
                        });
                        setTimeout(()=>{
                            $('.page').removeClass('visible hide-section');
                            $('.about').addClass('visible');
                             $('.about-sl-'+(activeSlideAbout + 1)).removeClass('hide-scroll-bott').addClass('visible-scroll-bott');
                            if(activeSlideAbout >= 2){
                                $('.menu').addClass('white-style');
                            }
                            else{
                                $('.menu').removeClass('white-style');
                            }
                            if(activeSlideAbout == 5){
                                $('.menu').removeClass('white-style');
                            }
                            $('.menu__wrapp__left__list li span').each(function(e){
                                if($(this).hasClass('active')){
                                    $('.menu__wrapp__left__list li span').removeClass('active');
                                    $('[data-href="#about"]').addClass('active');
                                }   
                            });
                        },750);
                        setTimeout(function(){
                            canAnimateAbout = true;
                        },800);
                        return;
                    }
                    setTimeout(function(){
                        canAnimateAbout = true;
                    },500);
                    $('.news-wrapp__left .nav-tabs a[href="#news-tab-'+(activeSlideNewsTabs+1)+'"]').tab('show');
                }
                else if ((endPoint - startPoint) < -50) {
                    activeSlideNews = 0;
                    canAnimateAbout = false;
                    activeSlideNewsTabs += 1;
                    if(activeSlideNewsTabs >= $('.news-wrapp__left .nav li').length){
                        $('.page').each(function(){
                            if($(this).hasClass('visible')){
                                $(this).addClass('hide-section');
                            }
                        });
                        setTimeout(()=>{
                            $('.page').removeClass('visible hide-section');
                            $('.contacts').addClass('visible');
                            $('.menu__wrapp__left__list li span').each(function(e){
                                if($(this).hasClass('active')){
                                    $('.menu__wrapp__left__list li span').removeClass('active');
                                    $('[data-href="#contacts"]').addClass('active');
                                }   
                            });
                        },750);
                        setTimeout(function(){
                            canAnimateAbout = true;
                        },600);
                        return;
                    }
                    setTimeout(function(){
                        canAnimateAbout = true;
                    },800);
                    $('.news-wrapp__left .nav-tabs a[href="#news-tab-'+(activeSlideNewsTabs+1)+'"]').tab('show');
                }
            }
        });
        
        
        
        //news scroll
//        $('.news-wrapp__right, .cube-bg').on('mousewheel', function (event) {
//            event.stopPropagation();
//            if(canAnimate){
//                if(event.originalEvent.deltaY > 0){
//                    canAnimate = false;
//                    activeSlideNews += 1;
//                    if(activeSlideNews >= $('.tab-pane.active .new-content__counter__item .news-animation').length){
//                        activeSlideNews = 0;
//                    }
//                    newsScrollBott(activeSlideNews);
//                }
//                if(event.originalEvent.deltaY < 0){
//                    canAnimate = false;
//                    activeSlideNews -= 1;
//                    if(activeSlideNews < 0){
//                        activeSlideNews = ($('.tab-pane.active .new-content__counter__item .news-animation').length - 1);
//                    }
//                    newsScrollTop(activeSlideNews)
//                }
//            }
//        });

        //touch
//        $('.news-wrapp__right, .cube-bg').on('touchend', function (event) {
//            event.stopPropagation();
//            
//            if(canAnimate){
//                endPoint=event.originalEvent.changedTouches[0].pageY;
//                if((endPoint - startPoint) > 50) {
//                    canAnimate = false;
//                    activeSlideNews -= 1;
//                    if(activeSlideNews < 0){
//                        activeSlideNews = ($('.tab-pane.active .new-content__counter__item .news-animation').length - 1);
//                    }
//                    newsScrollTop(activeSlideNews);
//                }
//                else if ((endPoint - startPoint) < -50) {
//                    canAnimate = false;
//                    activeSlideNews += 1;
//                    if(activeSlideNews >= $('.tab-pane.active .new-content__counter__item .news-animation').length){
//                        activeSlideNews = 0;
//                    }
//                    newsScrollBott(activeSlideNews);
//                }
//            }
//        });

        $('.news .nav-tabs li a').click(function(){
            var id = $(this).attr('href');
            activeSlideNews = 0;
            activeSlideNewsTabs = $(this).parent().index();
            $('.news-animation').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
            $(id + ' .news-animation:nth-child(1)').addClass('visible-scroll-bott')
        });

        
        //================contacts=====================

        elContacts.addEventListener("wheel", function (event) {   
            var curTime = new Date().getTime();
            if(typeof prevTime !== 'undefined'){
                var timeDiff = curTime-prevTime;
                if(timeDiff>50){
                    if(canAnimateAbout){
                         canAnimateAbout = false;
                        if(event.deltaY < 0){
                        $('.page').each(function(){
                            if($(this).hasClass('visible')){
                                $(this).addClass('hide-section');
                            }
                        });
                        setTimeout(()=>{
                            $('.menu__wrapp__left__list li span').each(function(e){
                                if($(this).hasClass('active')){
                                    $('.menu__wrapp__left__list li span').removeClass('active');
                                    $('[data-href="#news"]').addClass('active');
                                }   
                            });
                            $('.page').removeClass('visible hide-section');
                            $('.news').addClass('visible');
                        },650);
                        setTimeout(function(){
                            canAnimateAbout = true;
                        },1350); 
                        }
                    }
                }
            }
            prevTime = curTime;
                
            
        }, true);

        //touch
        elContacts.addEventListener("touchend", function (event) {
            if(canAnimateAbout){
                endPoint = event.changedTouches[0].pageY;
                if ((endPoint - startPoint) > 50) {
                   canAnimateAbout = false;
                    $('.page').each(function(){
                        if($(this).hasClass('visible')){
                            $(this).addClass('hide-section');
                        }
                    });
                    setTimeout(()=>{
                        $('.menu__wrapp__left__list li span').each(function(e){
                            if($(this).hasClass('active')){
                                $('.menu__wrapp__left__list li span').removeClass('active');
                                $('[data-href="#news"]').addClass('active');
                            }   
                        });
                        $('.page').removeClass('visible hide-section');
                        $('.news').addClass('visible');
                    },650);
                    setTimeout(function(){
                        canAnimateAbout = true;
                    },600);
                }
            }
        }, true);
        
        
        
        $('.change-to-adress').click(function(){
            $('.contacts__wrapp').removeClass('form-mode');
            $('.contacts__wrapp').addClass('map-mode');
        });

        $('.change-to-contacts').click(function(){
            $('.contacts__wrapp').removeClass('map-mode');
            $('.contacts__wrapp').addClass('form-mode');
        });
    }
    else{
        const appHeight = () => {
            const doc = document.documentElement
            doc.style.setProperty('--app-height', `${window.innerHeight}px`);
        }
        window.addEventListener('resize', appHeight);
        appHeight();
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
        $('.modal-dialog').addClass('slider-initialized');
        flagInitSlider = true;
    });
    $('.modal').on('hidden.bs.modal', function () {
        if(flagInitSlider){
            $('.modal-slider').slick('unslick');
            $('.modal-dialog').removeClass('slider-initialized');
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
