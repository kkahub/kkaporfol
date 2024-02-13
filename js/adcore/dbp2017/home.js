$(function(){
	/*
		슬라이드 매개변수
		var 인스턴스 = new SlideHorizon(컨텐츠ul,네비게이션ul,오토스피드,아이템스피드);
		인스턴스.mItemSelect($(this),해당리터럴객체,오토스피드,아이템스피드,컨텐츠ul);
	*/
	var slideSpeed = 5000;
	var slideItemSpeed = 600;

	/* Main Slide */
		var slideHorizonMain = new SlideHorizon(".visual_slide",".slide_nav",slideSpeed,slideItemSpeed);

		// 네비게이션 메뉴
		slideHorizonMain.menuAction(".slide_nav",slideDefault);

		// 네비게이션 메뉴 클릭 이벤트
		$(".slide_nav").on("click","li",function(e){
			e.preventDefault();
			slideHorizonMain.mItemSelect($(this),slideDefault,slideSpeed,slideItemSpeed,$(".visual_slide"));
		});

		// 리사이즈 할 때 마다 너비, left 위치 다시 구하기
		$(window).resize(function(){
			slideHorizonMain.itemW = slideHorizonMain.$items.width();
		});

	/* Spec Slide */
		var slideHorizonSpecCon = new SlideHorizon(".spec_con",".spec_nav",slideSpeed,slideItemSpeed);

		// 네비게이션 메뉴
		slideHorizonSpecCon.menuAction(".spec_nav",slideDefault)

		// 네비게이션 메뉴 클릭 이벤트
		$(".spec_nav").on("click","li",function(e){
			e.preventDefault();
			slideHorizonSpecCon.mItemSelect($(this),slideDefault,slideSpeed,slideItemSpeed,$(".spec_con"));
		});

	/* AD Tech */
		var slideHorizonTech = new SlideHorizon(".adtech_slide>ul",".adtech_nav",slideSpeed,slideItemSpeed);

		// 네비게이션 메뉴 클릭 이벤트
		$(".adtech_nav").on("click","div",function(e){
			e.preventDefault();
			slideHorizonTech.mItemSelect($(this),slideTech,slideSpeed,slideItemSpeed,$(".adtech_slide>ul"));
			slideHorizonTech.menuAction(".adtech_nav",slideTech);
		});

	/* 공지 UI */
		var noticeUI = new NoticeUI();
});

// animate 플러그인 옵션 셋팅
$.fn.extend({
	animateCss: function (animationName) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		this.addClass('animated ' + animationName).on(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);
		});
	}
});

// 슬라이드 클래스 ////////////////////////////////////////////////////////////////////////////////////
function SlideHorizon(selector,navSelector,playSpeed,itemSpeed){
	this.$selector = null;
	this.$items = null;
	this.itemW = 0;
	this.itemH = 0;
	this.itemLength = 0;
	this._timerID = -1;
	this.$currentItem = null;
	this.currentIndex = 0;
	this.nextIndex = 0;

	this.$navSelector =  null;
	this.$mNavItem =  null;

	this._init(selector,navSelector);
	this._initSet();
	this._initEvent(selector,navSelector,playSpeed,itemSpeed);
}

// 초기화
SlideHorizon.prototype._init = function(selector,navSelector){
	this.$selector = $(selector);
	this.$items = this.$selector.children();
	this.itemW = this.$items.width();
	this.itemH = this.$selector.children(".on").height();
	this.itemLength = this.$items.length;

	this.$navSelector = $(navSelector);
	this.$mNavItem = $(navSelector).children();
}

// 이벤트
SlideHorizon.prototype._initEvent = function(selector,navSelector,playSpeed,itemSpeed){
	this.startAutoPlay(selector,navSelector,playSpeed,itemSpeed);
}

// 시작 셋팅
SlideHorizon.prototype._initSet = function(){
	this.$selector.css("height",this.itemH);
	this.$selector.children(".on").css({left:0});
}

// 다음 아이템 높이 구하기
SlideHorizon.prototype._nextItemH = function(){
	var nextH = this.$items.eq(this.nextIndex).height();
	this.$selector.stop().animate({height:nextH},300,"easeInCubic");
}

// 이전 아이템 높이 구하기
SlideHorizon.prototype._prevItemH = function(){
	var prevH = this.$items.eq(this.prevIndex).height();
	this.$selector.stop().animate({height:prevH},300,"easeInCubic");
}

// 슬라이드 아이템 밖으로 우>좌
SlideHorizon.prototype._outNextSlide = function(itemSpeed){
	var objThis = this;

	this.$currentItem
		.removeClass("on")
		.stop()
		.animate({left:-this.itemW	},itemSpeed,"easeInCubic",function(){
			objThis.$currentItem.css("left",objThis.itemW);
	});
}

// 슬라이드 아이템 밖으로 좌>우
SlideHorizon.prototype._outPrevSlide = function(itemSpeed){
	var objThis = this;

	this.$currentItem
		.removeClass("on")
		.stop()
		.animate({left:this.itemW},itemSpeed,"easeInCubic");
}

// 다음 인덱스 호출
SlideHorizon.prototype.indexCall = function(){
	this.$currentItem = this.$selector.children(".on");
	this.currentIndex = this.$currentItem.index();
	this.nextIndex = this.currentIndex+1;
	this.prevIndex = this.currentIndex-1;
}

// 슬라이드 아이템 안으로 우>좌
SlideHorizon.prototype._nextSlide = function(itemSpeed){
	this.$items.eq(this.nextIndex)
		.stop()
		.animate({left:0},itemSpeed,"easeInCubic")
		.addClass("on");
}

// 슬라이드 아이템 안으로 좌>우
SlideHorizon.prototype._prevSlide = function(itemSpeed){
	var objThis = this;

	this.$items.eq(this.prevIndex).css("left",-this.itemW);
	this.$items.eq(this.prevIndex)
		.stop()
		.animate({left:0},itemSpeed,"easeInCubic")
		.addClass("on");
}

// 슬라이딩 액션 우>좌
SlideHorizon.prototype.slideActing = function($navItem,navSelector,itemSpeed){
	var objThis = this;

	// 슬라이드 방향 결정
	if (this.$currentItem.index() < this.nextIndex){

		// 인덱스 마이너스 될 때 인덱스 교체
		if(this.nextIndex > this.itemLength-1){
			this.nextIndex = 0;
		}

		// 슬라이드 우>좌
		this._nextItemH(this.nextIndex);
		this._nextSlide(itemSpeed);
		this._outNextSlide(itemSpeed);
		this._mNextOn(this.nextIndex);

	} else {

		// 인덱스 마이너스 될 때 인덱스 교체
		if(this.currentIndex >= this.itemLength){
			this.prevIndex = 0;
		}
		// 슬라이드 좌>우
		this._prevItemH(this.prevIndex);
		this._outPrevSlide(itemSpeed);
		this._prevSlide(itemSpeed);
		this._mPrevOn(this.prevIndex);

	}
}

// 슬라이드 애니메이션 이벤트
SlideHorizon.prototype.animateCon = function(selector){
	var $fadeItem = $(selector).children(".on").find(".fade").children();
	$fadeItem.animateCss('fadeInRight');

	if (selector ==".spec_con"){
		var $bounceInItem = $(selector).children(".on").find(".bounce_in");
		$bounceInItem.animateCss('bounceIn');
	}
}

// 슬라이드 플레이
SlideHorizon.prototype._play = function(selector,navSelector,itemSpeed){
	this.indexCall();
	this.slideActing(selector,navSelector,itemSpeed);
	this.animateCon(selector);
}

// 오토 플레이 ************************************************************
SlideHorizon.prototype.startAutoPlay = function(selector,navSelector,playSpeed,itemSpeed){
	var objThis = this;
	if(this._timerID == -1){
		this._timerID = setInterval(function(){
			objThis._play(selector,navSelector,itemSpeed);

			if (navSelector == ".adtech_nav"){
				slideTech.eachMenuAction(".adtech_nav");
			}
		},playSpeed);
	}
}

// 오토 플레이 정지
SlideHorizon.prototype.stopPlay = function(){
	if(this._timerID != -1){
		clearInterval(this._timerID);
		this._timerID = -1;
	}
}

// 메뉴 다음 인덱스 on ******************************************************
SlideHorizon.prototype._mNextOn = function(nextIndex){
	this.$mNavItem.removeClass("on");
	this.$mNavItem.eq(nextIndex).addClass("on");
}

// 메뉴 이전 인덱스 on
SlideHorizon.prototype._mPrevOn = function(prevIndex){
	this.$mNavItem.removeClass("on");
	this.$mNavItem.eq(prevIndex).addClass("on");
}

// 메뉴 클릭 이벤트
SlideHorizon.prototype.mItemSelect = function(navItem,navUi,playSpeed,itemSpeed,onItem){
	var objThis = this;
	if($(navItem).hasClass("on") == false){
		navUi.selectItem(navItem,objThis,playSpeed,itemSpeed,onItem);
	}
}

// 메뉴 네비게이션
SlideHorizon.prototype.menuAction = function($navItem,navUi){
	var objThis = this;
	navUi.eachMenuAction($navItem,objThis);
}

// 메인 슬라이드 네비게이션, olleh tv 슬라이드 ************************************
var slideDefault = {
	eachMenuAction: function(navItem,objThis){// 메뉴 다음 인덱스 on
		$(navItem).removeClass("on");
		$(navItem).eq(objThis.nextIndex).addClass("on");
	},
	selectItem: function($navItem,objThis,playSpeed,itemSpeed,onItem){
		// 오토 플레이 정지
		objThis.stopPlay();

		// 클릭에 따른 인덱스 교체
		objThis.$currentItem = $(onItem).children(".on");
		objThis.nextIndex = $navItem.index();
		objThis.prevIndex = objThis.nextIndex;
		objThis.currentIndex = objThis.nextIndex -1;

		// 슬라이드 액션
		objThis.slideActing($navItem,$navItem,itemSpeed);
		objThis.animateCon($(onItem));

		// 오토 플레이 재시작
		objThis.startAutoPlay($(onItem),$navItem,playSpeed,itemSpeed);
	}
}

// AD Tech 슬라이드
var slideTech = {
	eachMenuAction: function(navItem,objThis){
		var deg;
		var index = $(navItem).children(".on").index();
		switch(index){
			case 0:
				deg = "40";
				break;
			case 1:
				deg = "90";
				break;
			case 2:
				deg = "140";
				break;
		}
		$(".niddle").css({
			WebkitTransform : "rotate("+deg+"deg)",
			MozTransform: "rotate("+deg+"deg)",
			MsTransform: "rotate("+deg+"deg)",
			OTransform: "rotate("+deg+"deg)",
			transform: "rotate("+deg+"deg)"
		});
	},
	selectItem: function(navItem,objThis,playSpeed,itemSpeed,onItem){
		// 오토 플레이 정지
		objThis.stopPlay();

		// 클릭에 따른 인덱스 교체
		objThis.$currentItem = $(onItem).children(".on");
		objThis.nextIndex = navItem.index();
		objThis.prevIndex = objThis.nextIndex;
		objThis.currentIndex = objThis.nextIndex +1;

		// 슬라이드 액션
		objThis.slideActing(".adtech_nav",".adtech_nav",itemSpeed);
		objThis.animateCon($(onItem));

		// 오토 플레이 재시작
		objThis._timerID = -1;
		objThis.startAutoPlay(".adtech_nav",".adtech_nav",playSpeed,itemSpeed);

	}
}

// 공지 UI //////////////////////////////////////////////////////////////////////////////////////////
function NoticeUI(){
	var $tabItem = null;
	var $selector = null;
	var $selectTxt = null;
	var $articlesTb = null;
	var $atcTb = null;
	var $atcDetailTit = null;

	this._init();
	this._initEvent();
}

// 초기화
NoticeUI.prototype._init = function(){
	this.$tabItem = $(".articles_nav").children();
	this.$selector = $(".articles_nav").children(".action");
	this.$tabItemTxt = this.$tabItem.text().trim();
	this.$selectTxt = this.$selector.text().trim();
	this.$articlesTb = $(".articles_tb")
	this.$atcTb = $(".articles_tb .title");
	this.$atcDetailTit = $(".articles_info dd.title");
}

// 이벤트
NoticeUI.prototype._initEvent = function(){
	this._tabTit();
	this._tab();
}

// 말머리 교체
NoticeUI.prototype._tabTit = function(){
	var objThis = this;

	this.$tabItem.each(function(i){
		objThis.$tabItemTxt = objThis.$tabItem.eq(i).text().trim();
		objThis.$articlesTb.eq(i).find(".title").children("a").prepend("["+objThis.$tabItemTxt+"] ");
	});
	objThis.$selectTxt = objThis.$selector.text().trim();
	objThis.$atcDetailTit.prepend("["+objThis.$selectTxt+"] ");
}

// 텝 이벤트
NoticeUI.prototype._tab = function(){
	var objThis = this;

	this.$tabItem.on("click",function(e){
		var index = $(this).index();

		if(objThis.$tabItem.parent().parent().hasClass("detail")){
			e.preventDefault();
		}
		objThis.$tabItem.removeClass("action");
		objThis.$tabItem.eq(index).addClass("action");
		objThis.$articlesTb.removeClass("on");
		objThis.$articlesTb.eq(index).addClass("on");
	});
}
