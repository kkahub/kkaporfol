jQuery(document).ready(function() {

	/* 공지사항 토글 */
	$(".notice_inner,.full_bg").hide();

	$(".new_notice .carrot").click(function(){
      if( $(".new_notice").hasClass("on") ){
         $(".notice_inner,.full_bg").fadeOut(50);
         $(".new_notice").removeClass("on");
      } else {
         $(".new_notice").addClass("on");
         $(".notice_inner,.full_bg").fadeIn(50);
      }
   });

   $(".full_bg").click(function(){
      $(".notice_inner,.full_bg").fadeOut(50);
      $(".new_notice").removeClass("on");
   });

	$('.home-container, #myCarousel, #service').hover(function() {
		$('.carousel-control.left, .carousel-control.right, .carousel-indicators').css('display', 'block');
	},
	function() {
		$('.carousel-control.left, .carousel-control.right, .carousel-indicators').css('display', 'none');
	});
/*
	$(".media_nav a").bind('click',function(event){
		
		$(".main-menu a").removeClass('active');
		$(this).addClass('active');			
		var headerH = $('.navigation').outerHeight();
	
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top - headerH + 'px'
		}, {
			duration: 1200,
			easing: "easeInOutExpo"
		});

		event.preventDefault();

	});
*/
	$('.portfolio-title').css('height',$('.portfolio-image').height() + 'px');
	$(window).resize(function() {
		$('.portfolio-title').css('height',$('.portfolio a').height() + 'px');
	});

	$('.s-station').on('click', function() {
		var description = $(this).children('.txt-wrap').attr('aria-controls');
		
		$('.s-desc div.' + description + ' ul').css('display', 'block');
		$('.s-desc div:not(.' + description + ') ul').css('display', 'none');
	});

	$('.media-box').hover(function() {
		$(this).find('.media-icon').addClass('scale');
	},
	function() {
		$(this).find('.media-icon').removeClass('scale');
	});

	$('a.smooth').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 80
				}, 1000);
				return false;
			}
		}
	});


/* 서브 아이콘 오버 시작 */
	$(".icon_box:eq(0)").mouseover(function(){
		$(".icon_box:eq(0):not(:animated)").stop().animate({
			scale:"0.7"
		},{
			duration:90, easing:"easeInCirc"
		}).animate({
			scale:"1"
		},{
			duration:1000, easing:"easeOutElastic"
		}).siblings('h2').addClass('hover');
	});
	$(".icon_box:eq(0)").mouseleave(function(){
		$(this).siblings('h2').removeClass('hover');
	});

	$(".icon_box:eq(1)").mouseover(function(){
		$(".icon_box:eq(1):not(:animated)").stop().animate({
			scale:"0.7"
		},{
			duration:90, easing:"easeInCirc"
		}).animate({
			scale:"1"
		},{
			duration:1000, easing:"easeOutElastic"
		}).siblings('h2').addClass('hover');
	});
	$(".icon_box:eq(1)").mouseleave(function(){
		$(this).siblings('h2').removeClass('hover');
	});

	$(".icon_box:eq(2)").mouseover(function(){
		$(".icon_box:eq(2):not(:animated)").stop().animate({
			scale:"0.7"
		},{
			duration:90, easing:"easeInCirc"
		}).animate({
			scale:"1"
		},{
			duration:1000, easing:"easeOutElastic"
		}).siblings('h2').addClass('hover');
	});
	$(".icon_box:eq(2)").mouseleave(function(){
		$(this).siblings('h2').removeClass('hover');
	});

	$(".icon_box:eq(3)").mouseover(function(){
		$(".icon_box:eq(3):not(:animated)").stop().animate({
			scale:"0.7"
		},{
			duration:90, easing:"easeInCirc"
		}).animate({
			scale:"1"
		},{
			duration:1000, easing:"easeOutElastic"
		}).siblings('h2').addClass('hover');
	});
	$(".icon_box:eq(3)").mouseleave(function(){
		$(this).siblings('h2').removeClass('hover');
	});

	$(".icon_box:eq(4)").mouseover(function(){
		$(".icon_box:eq(4):not(:animated)").stop().animate({
			scale:"0.7"
		},{
			duration:90, easing:"easeInCirc"
		}).animate({
			scale:"1"
		},{
			duration:1000, easing:"easeOutElastic"
		}).siblings('h2').addClass('hover');
	});
	$(".icon_box:eq(4)").mouseleave(function(){
		$(this).siblings('h2').removeClass('hover');
	});

	$(".icon_box:eq(5)").mouseover(function(){
		$(".icon_box:eq(5):not(:animated)").stop().animate({
			scale:"0.7"
		},{
			duration:90, easing:"easeInCirc"
		}).animate({
			scale:"1"
		},{
			duration:1000, easing:"easeOutElastic"
		}).siblings('h2').addClass('hover');
	});
	$(".icon_box:eq(5)").mouseleave(function(){
		$(this).siblings('h2').removeClass('hover');
	});
/* 서브 아이콘 오버 끝 */

/* graph 시작 */
	$(".iptv1").delay(2000).animate({bottom:"-10%"},{duration:2000, easing:"easeInOutExpo"});
	$(".iptv2").delay(2000).animate({bottom:"-40%"},{duration:2000, easing:"easeInOutExpo"});
	$(".iptv3").delay(2000).animate({bottom:"-80%"},{duration:2000, easing:"easeInOutExpo"});
	$(".iptv4").delay(2000).animate({bottom:"-60%"},{duration:2000, easing:"easeInOutExpo"});
/* graph 끝 */
	
	/*
	var items = $(".portfolio-item");
	for(var i = 0; i < items.length; i++){
	    var target = Math.floor(Math.random() * items.length - 1) + 1;
	    var target2 = Math.floor(Math.random() * items.length - 1) +1;
	    items.eq(target).before(items.eq(target2));
	    console.log(target + ' + ' + target2 + " : " + items.eq(target).before(items.eq(target2)).find('img').attr('src'));
	}
	 */
	/* START PORTFOLIO ITEM RANDOM ORDER */
	/*
	var grp = $('#portfolio-wrap').children();
	var cnt = grp.length;
	
	var temp, x;
	for (var i = 0; i < cnt; i++) {
        temp = grp[i];
        x = Math.floor(Math.random() * cnt);
        grp[i] = grp[x];
        grp[x] = temp;
    }
    $(grp).remove();
    
    $('#portfolio-wrap').append($(grp));
    */
    /* END PORTFOLIO ITEM RANDOM ORDER */
    

	$('.portfolio a').hover(function() {
		$(this).find('.portfolio-title').removeClass('display');
		$(this).find('.portfolio-overlay-wrap').addClass('overlay-wrap wow bounceInDown animated');
		$(this).find('.portfolio-title').addClass('bounceInDown animated');
	},
	function() {
		$(this).find('.portfolio-title').addClass('display');
		$(this).find('.portfolio-overlay-wrap').removeClass('overlay-wrap wow bounceInDown animated');
		$(this).find('.portfolio-title').removeClass('bounceInDown animated');
	});
	
	$('.carousel_service').carousel();
	
	/* 로그인 팝업 */
	$('.txt_login').toggle(function() {
		$('.memAttr .log').css('display', 'block');
	},
	function() {
		$('.memAttr .log').css('display', 'none');
	});
	
	$('#pop_mem_id').focus(function() {
		$('.log_alert').css('display', 'none');
	});
	
	$('#pop_mem_pwd').focus(function() {
		$('.log_alert').css('display', 'none');
	});
});