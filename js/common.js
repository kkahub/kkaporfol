$(function(){
	// 제일 위로 가기
	scrollTop();

	// 포트폴리오 툴팁
	$('.portfolio .list_con')
		.on('mouseenter',function(){
			toolTip.initEvent($(this));
		})
		.on('mouseleave',function(){
			toolTip.tooltipHide();
		});
});

$(window).load(function(){
	// 로딩 화면
	$('.load').fadeOut(300,function(){
		$('.load').remove();

		// 패럴럭스 메뉴
		var gnb = new NavUI();

		mNavUI.initEvent();

		// 스크롤 UI
		var position = $('#wrap').scrollTop();

		var headerZeroScroll = new ScrollZero('#header',position);
		var topZeroScroll = new ScrollZero('.btn_top',position);

		$(window).scroll(function(ojThis) {
			position = $(window).scrollTop();

			var headerZeroStart = new ScrollZero('#header',position);
			var topZeroStart = new ScrollZero('.btn_top',position);
		});
	});
});

// 스크롤 UI
function ScrollZero(item,position){
	this.$item = null;

	this._init(item);
	this._addZero(item,position);
}
ScrollZero.prototype._init = function(item){
	this.$item = $(item);
}
ScrollZero.prototype._addZero = function(item,position){
	(position==0) ?
		this.$item.addClass('zero')
		: this.$item.removeClass('zero');
}

// 제일 위로 가기
function scrollTop(){
	var $btnTop = $('.btn_top');

	$btnTop.on('click',function(){
		$('html,body').stop().animate({
			scrollTop:0
		},{
			duration:400, easing:'easeInCirc'
		},'swing');
	});
}

// 메뉴 네비게이션 UI
function NavUI(){
	this.headerH = 0,
	this.$nav = null,
	this.$gnbItem = null,
	this.$container = null,
	this.$containerItem = null,
	this.$itemLength = null;
	this.x = null;
	this.gnbScope = [];

	this._init();
	this._initEvent();
}
NavUI.prototype._init = function () {
	this.headerH = 60;
	this.$nav = $('#nav');
	this.$gnbItem = $('.gnb>li');
	this.$container = $('#container');
	this.$containerItem = this.$container.children();
	this.$itemLength = this.$container.children().length;
	this.x = $(window).scrollTop();
};
NavUI.prototype._navClose = function () {
	if (this.$nav.hasClass('on') == true){
		this.$nav.removeClass('on');
	}
};
NavUI.prototype._territoryArr = function () {
	for( var i=0 ; i < this.$itemLength; i++ ){
		this.gnbScope.push(this.$containerItem.eq(i).offset().top - this.headerH);
	}
}
NavUI.prototype._territorySet = function (x, callback) {
	for( var i=0 ; i < this.$itemLength; i++ ){
		var min = x >= this.gnbScope[i],
			max = x < this.gnbScope[i+1];

		if (min && max) {
			this.index = i;
		} else if (x > this.gnbScope[ this.$itemLength]) {
			this.index =  this.$itemLength;
		}
	}
	callback(); // _currentMenu
};
NavUI.prototype._currentMenu = function () {
	this.$gnbItem.removeClass('on');
	this.$gnbItem.eq(this.index).addClass('on');
};
NavUI.prototype._selectItem = function (i) {
	$('html,body').stop().animate({
		scrollTop: this.gnbScope[i]
	},{
		duration:400, easing:'easeInCirc'
	},'swing');

	this.index = i;
};
NavUI.prototype._initEvent = function () {
	var objThis = this;

	this._init();
	this._navClose();

	this._territoryArr();
	this._territorySet(this.x, function(){
		objThis._currentMenu();
	});

	this.$gnbItem
		.on('click', function(){
			var index = $(this).index();
			objThis._selectItem(index);
		})
		.on('focus', function(){
			var index = $(this).index();
			objThis._selectItem(index);
			$(this).focus();
		});

	$(window).on('resize', function(){
		objThis.gnbScope = [];
		objThis._territoryArr();
	});

	$(window).on('scroll', function(){
		objThis.x = $(window).scrollTop();
		objThis._territorySet(objThis.x, function(){
			objThis._currentMenu();
		});
	});
};

// 모바일 메뉴 UI
mNavUI = {
	$nav: null,
	$burger: null,
	$gnbItem: null,

	burgurOn: function(){
		if (this.$nav.hasClass('on') == false){
			this.$nav.addClass('on');
		} else {
			this.$nav.removeClass('on');
		}
	},
	removeOn:function(){
		if (this.$nav.hasClass('on')){
			this.$nav.removeClass('on');
		}
	},
	initEvent: function(){
		this.$nav = $('#nav');
		this.$burger = $('.burgur');
		this.$gnbItem = $('.gnb>li');
		var ojThis = this;

		ojThis.$burger.on('click',function(){
			if($(document).width()<1000){
				ojThis.burgurOn();
			}
		});
		ojThis.$gnbItem.on('click',function(){
			if($(document).width()<1000){
				ojThis.removeOn();
			}
		});
	}
}

// 포트폴리오 툴팁
toolTip = {
	$listItem: null,
	$hoverItem: null,
	$comment: null,
	$hoverComment: null,
	elementOffsetY: null,
	elementOffsetX: null,
	ducumentEndX: null,
	toolTopWidth: 0,
	listItemWidth: 0,

	init: function(){
		this.$listItem = $('.portfolio .list_con');
		this.$hoverItem = $('.portfolio .list_con.hover');
		this.$comment = this.$listItem.children('.comment');
		this.$hoverComment = this.$hoverItem.children('.comment');
		this.toolTopWidth = 280;
		this.listItemWidth = 290;
		this.ducumentEndX = $(document).width() - this.toolTopWidth;
	},
	addHover: function(selector, callback){
		ojThis = this;

		if($(selector).hasClass('hover') == false){
			$(selector).addClass('hover');
			callback();  // moveAction() 콜백
		}
	},
	tooltipShow: function(selector){
		this.$hoverComment.fadeIn(100);
	},
	tooltipHide: function(){
		this.$listItem.removeClass('hover');
		this.$comment.hide();
	},
	moveAction: function(){
		ojThis = this;

		this.$hoverItem.on('mousemove',function(e){
			ojThis.elementOffsetY = ojThis.$hoverItem.offset().top;
			ojThis.elementOffsetX = ojThis.$hoverItem.offset().left;

			if(ojThis.ducumentEndX > e.pageX){
				ojThis.$hoverComment.css({
					top:e.pageY - ojThis.elementOffsetY + 1 + 'px',
					left:e.pageX - ojThis.elementOffsetX + 1 + 'px',
					right: 'auto'
				});
			} else {
				ojThis.$hoverComment.css({
					top:e.pageY - ojThis.elementOffsetY + 'px',
					right:ojThis.elementOffsetX + ojThis.listItemWidth - e.pageX + 'px',
					left: 'auto'
				});
			}
		});
	},
	initEvent: function(selector){

		var ojThis = this;

		this.addHover(selector,function(){
			ojThis.init();
			ojThis.tooltipShow(selector);
			ojThis.moveAction();
		});
	}
}
