$(document).ready(function(){
	$('a.mailto').mailto();
    $(".lazy").lazyload();
    $('.video-wrapper').fitVids();
	$('label').click(function() {
	    var e = document.createEvent('MouseEvents');
	    e.initMouseEvent('mousedown');
		console.log($(this).attr("for"));
	    $("#"+$(this).attr("for"))[0].dispatchEvent(e);
	});

	$(".nav .menu-icon").click(function(){
		$(this).parent().find("ul").toggleClass("active");
		$(this).toggleClass('fa-bars fa-times');
	});

	$(".nav li").click(function(){
	    if($(".menu-icon").is(":visible")){
	      $(".menu-icon").toggleClass('fa-bars fa-times');
	      $(this).parent().parent().find("ul").toggleClass("active");
	    }
	});

    if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1 && navigator.userAgent.toLowerCase().indexOf('linux') > -1){
        $("body *").each(function(){
            $(this).addClass("no-scrollbar");
        });
    }
});
