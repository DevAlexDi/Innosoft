$(document).ready(function(){
   

    var elStart = document.getElementById("start");
    var elProjects = document.getElementById("projects");
    
    //start to menu
    elStart.addEventListener("wheel", function (event) {
        if(event.deltaY > 0){
            $('.start').removeClass('visible');
            
            $('.menu').fadeIn(100,function(){
                $('.menu').addClass('visible');
            });
        }
    }, true);


    //projects scroll

    var activeSlide = 0;
    var canAnimate = true;
    var isOpened = $('.projects-wr__title').hasClass('opened');
    var projectsName = ['yorso','investore','ITS'];
    
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

    //project hover
    $('.project__slide__closed-wrapp, .projects-wr__title').mouseover(function() {
        if(canAnimate){
            $('.projects-wr__title').addClass('hover-project');
            $('.project__slide__closed-wrapp').addClass('hover-project');
            hoveredProject = true;
        }
        
    });
    $('.project__slide__closed-wrapp').mouseout(function() {
        if(canAnimate){
            $('.projects-wr__title').removeClass('hover-project');
            $('.project__slide__closed-wrapp').removeClass('hover-project');
            hoveredProject = false;
        }
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

    //open section from menu

    $('.menu__list li span').click(function (e) {
        $('.open-close-menu').addClass("showed");
        if ($(this).attr('data-href')) {
            var el = $(this).attr('data-href');
            $('.menu').fadeOut(200,function(){
                $('.menu').removeClass('visible');
                $(el).addClass('visible');
                $('.open-close-menu').removeClass('opened');
            });
            
            return;
        }
    });


    
});


$(window).load(function() {
   $('.start').addClass('loaded');
   setTimeout(function(){
    $('.start__scroller').addClass('delay');
   },800);
});
