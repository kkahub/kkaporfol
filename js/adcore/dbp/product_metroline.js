$(function(){
/* 서브 헤더 시작 */
	function subHeader(){
		if ($(window).scrollTop() > 235) {
			$(".metro_snb").css("position","fixed").css("top", "80px").css("left",0).css("z-index","1").css("width","100%");
			$(".page-wrap.media").css("margin-top","155px");
		} else {
			$(".metro_snb").css("position","relative").css("top","0").css("left",0);
			$(".page-wrap.media").css("margin-top",0);
		} 
	}
	subHeader();

	$(window).scroll(function(){
		var position = $(window).scrollTop();
		subHeader();
	});

	$(".menu-icon img").mouseover(function(){
		$(this).animate({opacity:"0.5"},200,"swing");
	});
	$(".menu-icon img").mouseleave(function(){
		$(this).animate({opacity:"1"},200,"swing");
	});
/* 서브 헤더 끝 */

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


/* 서브 아이콘 분당선 스크롤 시작 */
	$(".media_nav li:eq(0)").click(function(){
		$("html,body").animate({scrollTop:"200px"},{duration:1000, easing:"easeInCubic"});
	});
	$(".media_nav li:eq(1)").click(function(){
		$("html,body").animate({
			scrollTop: $(".metro_portfolio").offset().top - 235 + "px"
		}, {
			duration:1500, easing:"easeInCubic"
		});
	});
/* 서브 아이콘 분당선 스크롤 끝 */


/* 신분당선 노선 슬라이드 시작 */
	$(".line_img li").each(function(i){
		this.num = i;
		
		$(this).click(function(){
			var introOff = $('.line_intro ul').css('margin-left')
			if ( parseInt(introOff) / -1000 != this.num ){
				$(".line_img li").removeClass("on");
				$(this).addClass("on");
				$(".line_intro li").fadeOut(250);
				$(".line_intro ul").animate({marginLeft:-1000 * this.num + "px"},{duration:800, easing:"easeInCubic"});
				$(".line_intro li").delay(400).fadeIn(500);
			}
		});
	});
/* 신분당선 노선 슬라이드 끝 */


/* 신분당선 포트폴리오 시작 */
	$(".fade_li>li").css("opacity",0);

	if ($(window).scrollTop() >1200) {
		$(".fade_li>li").addClass("fadeInUp animated");
	}

	$(window).scroll(function(){
		if ($(window).scrollTop() >1200 && $(window).scrollTop() < 1800) {
			$(".fade_li>li:first-child").addClass("fadeInUp animated");
		} else if ($(window).scrollTop() > 1801) {
			$(".fade_li>li:gt(0)").addClass("fadeInUp animated");
		}
	});
/* 신분당선 포트폴리오 끝 */
	
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