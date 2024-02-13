$(function(){
/* 서브 헤더 시작 */
	function subHeader(){
		if ($(window).scrollTop() > 235) {
			$(".ollehtv_snb").css("position","fixed").css("top", "80px").css("left",0).css("z-index","1").css("width","100%");
			$(".page-wrap.media").css("margin-top","155px");
		} else {
			$(".ollehtv_snb").css("position","relative").css("top","0").css("left",0);
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

/* 서브 아이콘 올레 스크롤 시작 */
	$(".media_nav li:eq(0)").click(function(){
		$("html,body").animate({scrollTop:"200px"},{duration:1000, easing:"easeInCubic"});
	});

	$(".menu_2depth>li:eq(0)").click(function(){
		$("html,body").animate({
			scrollTop: $(".special").offset().top - 235 + "px"
		}, {
				duration:1500, easing:"easeInCubic"
		});
	});
	$(".menu_2depth>li:eq(1)").click(function(){
		$("html,body").animate({
			scrollTop: $(".productA").offset().top - 235 + "px"
		}, {
			duration:1500, easing:"easeInCubic"
		});
	});
	$(".menu_2depth>li:eq(2)").click(function(){
		$("html,body").animate({
			scrollTop: $(".productB").offset().top - 235 + "px"
		}, {
			duration:1500, easing:"easeInCubic"
		});
	});

	/* 2depth 메뉴 */
	$(".menu_2depth").hide();
	$(".media_nav li:eq(1) img").mouseover(function(){
		$(".menu_2depth").show();
	});
	$(".media_nav li:eq(1)").mouseleave(function(){
		$(".menu_2depth").hide();
	});
/* 서브 아이콘 올레 스크롤 끝 */

/* ollehtv 1위 그래프 시작 */
	$(".join1,.chanel1,.con1").delay(450).animate({width:"100%"},{duration: 2500,easing: "easeInOutExpo"});
	$(".join2,.chanel2,.con3").delay(450).animate({width:"70%"},{duration: 2500,easing: "easeInOutExpo"});
	$(".join3,.chanel3").delay(450).animate({width:"50%"},{duration: 2500,easing: "easeInOutExpo"});
	$(".con2").delay(450).animate({width:"40%"},{duration: 2500,easing: "easeInOutExpo"});
/* ollehtv 1위 그래프 끝 */

/* special 시작 */
	$(".category_t>li").css("opacity",0);

	if ($(window).scrollTop() > 1300 && $(window).scrollTop() < 1600) {
		$(".category_t>li:first-child").addClass("fadeInUp animated");
	} else if ($(window).scrollTop() > 1601 && $(window).scrollTop() < 1750) {
		$(".category_t>li:nth-child(2)").addClass("fadeInUp animated");
	} else if ($(window).scrollTop() > 1751 && $(window).scrollTop() < 2000) {
		$(".category_t>li:nth-child(3)").addClass("fadeInUp animated");
	} else if ($(window).scrollTop() > 2001 && $(window).scrollTop() < 3515) {
		$(".category_t>li:nth-child(4)").addClass("fadeInUp animated");
	}
	$(window).scroll(function(){
		if ($(window).scrollTop() > 1300 && $(window).scrollTop() < 1600) {
			$(".category_t>li:first-child").addClass("fadeInUp animated");
		} else if ($(window).scrollTop() > 1601 && $(window).scrollTop() < 1750) {
			$(".category_t>li:nth-child(2)").addClass("fadeInUp animated");
		} else if ($(window).scrollTop() > 1751 && $(window).scrollTop() < 2000) {
			$(".category_t>li:nth-child(3)").addClass("fadeInUp animated");
		} else if ($(window).scrollTop() > 2001 && $(window).scrollTop() < 3515) {
			$(".category_t>li:nth-child(4)").addClass("fadeInUp animated");
		}
	});


	if ($(window).scrollTop() > 1300 && $(window).scrollTop() < 1900) {
		$(".category_t>li:first-child").addClass("fadeInUp animated");
	} else if ($(window).scrollTop() > 1901 && $(window).scrollTop() < 2100) {
		$(".category_t>li:nth-child(2)").addClass("fadeInUp animated");
	} else if ($(window).scrollTop() > 2101 && $(window).scrollTop() < 2250) {
		$(".category_t>li:nth-child(3)").addClass("fadeInUp animated");
	} else if ($(window).scrollTop() > 2251 && $(window).scrollTop() < 3515) {
		$(".category_t>li:nth-child(4)").addClass("fadeInUp animated");
	}
	$(window).scroll(function(){
		if ($(window).scrollTop() > 1300 && $(window).scrollTop() < 2000) {
			$(".category_t>li:first-child").addClass("fadeInUp animated");
		} else if ($(window).scrollTop() > 2001 && $(window).scrollTop() < 2200) {
			$(".category_t>li:nth-child(2)").addClass("fadeInUp animated");
		} else if ($(window).scrollTop() > 2201 && $(window).scrollTop() < 2450) {
			$(".category_t>li:nth-child(3)").addClass("fadeInUp animated");
		} else if ($(window).scrollTop() > 2451 && $(window).scrollTop() < 3515) {
			$(".category_t>li:nth-child(4)").addClass("fadeInUp animated");
		}
	});

	$(".pack>div").mouseover(function(){
			$(this).siblings("div").animate({scale:"0.93"},50,"swing");
			$(this).animate({scale:"1"},50,"swing");
	});
/* special 끝 */

/* 노출형광고 슬라이드 시작 */
	$(".slide_btn>li").click(function(){
		var index = $(".slide_btn>li").index(this);
		$(".slide_btn>li").removeClass("action");
		$(this).addClass("action");
		$(".olleh_1>ul").animate({marginLeft: index * -1000 + "px"},{duration:1000, easing:"easeInCubic"});	
	});
 /* 노출형광고 슬라이드 끝 */

/* 노출형광고 단가 슬라이드 시작 */
	$(".slide_btn2>li").click(function(){
		var index = $(".slide_btn2>li").index(this);
		$(".slide_btn2>li").removeClass("action");
		$(this).addClass("action");
		$(".olleh_2>ul").animate({marginLeft: index * -1000 + "px"},{duration:1000, easing:"easeInCubic"});	
	});
 /* 노출형광고 단가 슬라이드 끝 */

/* 양방향광고 슬라이드 시작 */
	$(".slide_btn3>li").click(function(){
		var index = $(".slide_btn3>li").index(this);
		$(".slide_btn3>li").removeClass("action");
		$(this).addClass("action");
		$(".olleh_3>ul").animate({marginLeft: index * -1000 + "px"},{duration:1000, easing:"easeInCubic"});	
	});
/* 양방향광고 슬라이드 끝 */
	
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