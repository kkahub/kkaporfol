$(function(){
    /* GNB */
    GnbUI.initEvent();

    $(window).on('resize', function(){
        GnbUI.initEvent();
    });

    // 툴팁
    toolTip._initEvent();

    // 텝메뉴
    var tabMenu = new TabMenu('.tab_menu', '.tab_con')

    // 파일
    var fileUI = new FileUI();
});

(function($){
    // 스크롤
    $(window).on("load",function(){
        $(".scrollbar").mCustomScrollbar({
            theme: "dark",
            autoHideScrollbar: true
        });
        $(".scrollbar-x").mCustomScrollbar({
            axis:"x",
            theme: "dark",
            autoHideScrollbar: true,
            mouseWheel:{
                enable: true,
            }
        });
    });

    // 팝업 플러그인 alert
    $.fn.popAlert = function(text){
        var $body = $('body'),
            text = text,
            $btnOpen,
            $btnClose;

        return this.each(function(){
            function open(btnOpen){
                $btnOpen = $(btnOpen);

                $body.append('\
                <div class="pop_alert">\
                    <div class="pop_inner">\
                        <div class="pop_win">\
                            <div class="pop_body">\
                                <p>' + text + '</p>\
                                <ul class="btn_group">\
                                    <li><button class="btn basic btn_alert_ok" type="button">닫기</button></li>\
                                </ul>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                ');
            }
            function close(){
                $body.on('click', '.btn_alert_ok', function(){
                    $(this).closest('.pop_alert').remove();
                });
            }
            function initEvent(btnOpen){
                open(btnOpen);
                close();
            }

            initEvent(this);
        });
    }

    // 팝업 플러그인 comfirm
    $.fn.popConfirm = function(options){
        var defaultSet = $.extend({}, $.fn.popConfirm.defaults, options);

        return this.each(function(){
            var $btn = null,
                 $body = null,
                 isConfirm = null;

            function init(el){
                $btn = $(el),
                $body = $('body'),
                isConfirm = false;
            }

            function open(){
                $body.append('\
                    <div class="pop_alert">\
                        <div class="pop_inner">\
                            <div class="pop_win">\
                                <div class="pop_body">\
                                    <p>' + defaultSet.text + '</p>\
                                    <ul class="btn_group">\
                                        <li><button class="btn sub" type="button">취소</button></li>\
                                        <li><button class="btn basic btn_confirm_ok" type="button">'+ defaultSet.confirmText + '</button></li>\
                                    </ul>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                ');
            }

            function close(isConfirm, callback) {
                $body.on('click', '.pop_alert .btn', function (isConfirm) {
                    $(this).closest('.pop_alert').remove();
                    ($(this).hasClass('btn_confirm_ok') === true) ? isConfirm = true : isConfirm = false;

                    defaultSet.btnChk.call(this, isConfirm);
                    callback();
                });
            }

            function eRemove() {
                $body.off('click', '.pop_alert .btn');
            }

            init($(this));
            open();
            close(isConfirm, function () {
                eRemove();
            });
        });
    }
    $.fn.popConfirm.default = {
        text: '내용을 입력해주세요.',
        confirmText:'확인'
    }
})(jQuery);

// GNB
var GnbUI = {
    $btn : null,
    $gnb : null,
    $top: null,
    $nav: null,
    init: function(){
        this.$btn = $('.burger');
        this.$gnb = $('#gnb');
        this.$top = $('.top_area');
        this.$nav = $('#nav');
    },
    elResetHide: function(){
        this.$btn.removeClass('on').hide();
        this.$nav.removeClass('on').hide();
        this.$gnb.removeClass('on').hide();
    },
    wideControl: function(){
        if( this.$btn.hasClass('on') === false ){
            this.$gnb.fadeIn(300);
        } else {
            this.$gnb.fadeOut(50);
        }
        this.$gnb.toggleClass('on')
        this.$btn.toggleClass('on');
    },
    largeControl: function(){
        if( this.$btn.hasClass('on') === false ){
            this.$nav.fadeIn(300);
        } else {
            this.$nav.fadeOut(50);
        }
        this.$nav.toggleClass('on')
        this.$btn.toggleClass('on');
    },
    initEvent: function(){
        var objThis = this;
        this.init();

        if($(window).width() < 1701 && $(window).width() >= 1081){
            this.elResetHide();
            this.$btn.removeClass('on').show();
            this.$nav.removeClass('on').show();

            this.$btn.off().on('click', function(){
                objThis.wideControl();
            });
        } else if($(window).width() < 1081){
            this.elResetHide();
            this.$btn.removeClass('on').show();
            this.$gnb.removeClass('on').show();

            this.$btn.off().on('click', function(){
                objThis.largeControl();
            });
        } else {
            this.elResetHide();
            this.$gnb.removeClass('on').show();
            this.$nav.removeClass('on').show();
        }
    }
}

// 툴팁
var toolTip = {
    $btn: null,
    $toolTip: null,
    $selectBtn: null,
    $selectToolTip: null,

    _init: function () {
        this.$btn = $('.tooltip .btn_tooltip');
        this.$toolTip = $('.tooltip .tooltip_con');
    },
    _toggleChk: function () {
        var objThis = this;

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.tooltip').length) {
                objThis.$btn.removeClass('on');
                objThis.$toolTip.hide();
            }
        });
    },
    _allHide: function () {
        if (this.$btn.filter('.on').length > 0) {
            this.$btn.not(this.$selectBtn).removeClass('on');
            this.$toolTip.hide();
        }
    },
    _toggleAction: function (el) {
        this.$selectBtn = $(el);
        this.$selectToolTip = $(el).siblings('.tooltip_con');

        this._allHide();

        if (this.$selectBtn.hasClass('on') === false) {
            this.$selectBtn.addClass('on');
            this.$selectToolTip.show();
        } else {
            this.$selectBtn.removeClass('on');
            this.$selectToolTip.hide();
        }
    },
    _initEvent: function () {
        var objThis = this;

        this._init();
        this._toggleChk();

        this.$btn.on('click', function () {
            objThis._toggleAction(this);
        });
    }
};

// 전체 체크
function AllChk(all, chk){
    this.allCtrl(all, chk);
    this.chkCtrl(all, chk);
}
AllChk.prototype.allCtrl = function (all, chk) {
    $(all).on('click', function () {
        $(chk).prop('checked', $(this).prop('checked'));
    });
};
AllChk.prototype.chkCtrl = function (all, chk) {
    $(chk).on('click', function(){

        if ( $(chk).filter(':checked').length === $(chk).length ) {
            $(all).prop('checked', true);
        } else {
            $(all).prop('checked', false);
        }
    });
};

// 팝업
function PopUp(pop, close){
    this.$pop = null;
    this.$close = null;

    this.init(pop, close);
    this.initEvent();
}
PopUp.prototype.init = function(pop, close){
    this.$pop = $(pop);
    this.$close = this.$pop.find('.pop_close');
}
PopUp.prototype.popOpen = function(){
    this.$pop.show();
}
PopUp.prototype.popClose = function(){
    var objThis = this;

    this.$close.on('click', function(){
        objThis.$pop.hide();
    });
}
PopUp.prototype.initEvent = function(){
    this.popOpen();
    this.popClose();
}

// 텝메뉴
function TabMenu(menu, tabContent){
	this.tabMenu = null;
	this.tabMenuItem = null;
	this.selectMenuItem = null;
	this.tabContent = null;
	this.selectContent = null;

	this._init(menu,tabContent);
	this._initEvent();
}
TabMenu.prototype._init = function(menu,tabContent){
	this.$tabMenu = $(menu);
	this.$tabMenuItem = this.$tabMenu.children();
	this.$selectMenuItem = this.$tabMenuItem.find('.on');
	this.$tabContent = $(tabContent);
	this.$tabContentItem = this.$tabContent.children();
	this.$selectContent = this.$tabContent.children(this.selectIndex);

}
TabMenu.prototype._modifyClass = function(selector,callback){
	this.$tabMenuItem.removeClass('on');
	$(selector).addClass('on');

	callback(); // this._modifyContent() 콜백
}
TabMenu.prototype._modifyContent = function(index){
	this.$tabContentItem.removeClass('on').hide();
	this.$tabContentItem.eq(index).addClass('on').show();
}
TabMenu.prototype._initEvent = function(){
	var objThis = this;

	this.$tabMenu.on('click','li',function(){
		var index = $(this).index();

		objThis._modifyClass(this,function(){
			objThis.$selectMenuItem;
			objThis.selectIndex;
			objThis._modifyContent(index);
		});
	});
}

// 파일
function FileUI(){
    this.fileWrap = null;
    this.viewFile = null;
    this.btn = null;
    this.file = null;

	this.init();
	this.initEvent();
}
FileUI.prototype.init = function () {
    this.fileWrap = $('.file_wrap');
    this.viewFile = this.fileWrap.find('.file_upload');
    this.btn = this.fileWrap.find('.btn_file');
    this.file = this.fileWrap.find('input[type="file"]');
};
FileUI.prototype.initEvent = function () {
    var objThis = this;

    this.viewFile.on('click', function(){
        $(this).siblings('input[type="file"]').trigger('click');
    });
    this.btn.on('click', function(){
        $(this).siblings('input[type="file"]').trigger('click');
    });
    this.file.on('change', function(){
        $(this).siblings('.file_upload').val($(this).val());
    });
};
