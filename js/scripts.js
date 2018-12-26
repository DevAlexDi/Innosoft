$(document).ready(function(){
   

    var elStart = document.getElementById("start");
    var elProjects = document.getElementById("projects");

    
    //start to menu
    elStart.addEventListener("wheel", function (event) {
        if(event.deltaY > 0){
            $('.start').removeClass('visible');
            $('.menu').addClass('visible');
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



    elProjects.addEventListener("wheel", function (event) {
        isOpened = $('.projects-wr__title').hasClass('opened');
        console.log(isOpened);
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
   });
    
    //project close

    $('.close-project').click(function(){
        $('.project__slide--'+(activeSlide + 1)).removeClass('opened');
        $('.projects-wr__title').removeClass('opened').removeClass('hover-project');
        $('.project__slide__closed-wrapp').removeClass('hover-project');
    });



    
});


$(window).load(function() {
   $('.start').addClass('loaded');
   setTimeout(function(){
    $('.start__scroller').addClass('delay');
   },800);
});