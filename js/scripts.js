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

    
    function ProjectsClassesScrollBott(activeSlide){
        var selectorNext = '.project__slide--'+(activeSlide + 1);
        var selectorPrev =  '.project__slide--'+(activeSlide == 0? $('.project__slide').length : activeSlide);
       
        $('.project__slide').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
       
        $(selectorPrev).addClass('hide-scroll-bott');
        $(selectorNext).addClass('visible-scroll-bott');
        $(selectorNext).bind('animationend webkitAnimationEnd', function() {
            setTimeout(function(){
                canAnimate = true;
            },300); 
        });
       

    }
    function ProjectsClassesScrollTop(activeSlide){
        var selectorNext = '.project__slide--'+(activeSlide);
        var selectorPrev =  '.project__slide--'+(activeSlide == $('.project__slide').length? 1 : (activeSlide+1));
        $('.project__slide').removeClass('hide-scroll-bott visible-scroll-bott hide-scroll-top visible-scroll-top');
        $(selectorPrev).addClass('hide-scroll-top');
        $(selectorNext).addClass('visible-scroll-top');
        $(selectorNext).bind('animationend webkitAnimationEnd', function() {
            setTimeout(function(){
                canAnimate = true;
            },300); 
        });

    }



    elProjects.addEventListener("wheel", function (event) {
        if(canAnimate){
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
                
                if(activeSlide <= 0){
                    activeSlide = $('.project__slide').length;
                }
                ProjectsClassesScrollTop(activeSlide)
               
               
            }
        }
        
        
            



        

    }, true);


});


$(window).load(function() {
   $('.start').addClass('loaded');
   setTimeout(function(){
    $('.start__scroller').addClass('delay');
   },800);
});