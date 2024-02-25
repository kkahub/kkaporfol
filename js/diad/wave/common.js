$(function () {
    // 화면크기 최적화 지정
    bestScreen._initEvent();

    // 네비게이션
    navUI._initEvent();

    // 셀렉트박스
    label();

    // readonly
    inputAttr();

    (function($){
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
                                        <li><button class="btn basic btn_alert_ok" type="button">확인</button></li>\
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
                                            <li><button class="btn basic btn_confirm_ok" type="button">'+ defaultSet.confirmText + '</button></li>\
                                            <li><button class="btn second" type="button">취소</button></li>\
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
});

// 로딩
var loadingBar = {
    now: 0,
    delta: 0,
    loadW: 0,
    $loader: null,
    $loadImg: null,
    timeId: null,

    _init: function(){
        this.now = 0;
        this.delta = 20;
        this.loadW = 100;
    },
    _creatStr: function () {
        $('body').prepend('<div class="loader"><div class="load_inner"><div class="load_img"></div></div></div>');
        this.$loader = $('.loader');
        this.$loadImg = this.$loader.find('.load_img');
    },
    playLoad: function(){
        this._init();
        this._creatStr();

        var objThis = this;

        this.timeId= setInterval(function(){
            objThis.now += 3;

            if(objThis.now >= 360){
                objThis.now = 0;
                objThis.$loadImg.css('transform', 'rotate('+ objThis.now +'deg)');
            } else{
                objThis.$loadImg.css('transform', 'rotate('+ objThis.now +'deg)');
            }
        }, this.delta);
    },
    stopLoad: function(){
        clearInterval(this.timeId);
        this.$loader.remove();
    }
}

// NAV
var navUI ={
    $gnb: null,
    $depth1: null,
    $depth1Selector: null,
    $depth2: null,
    $navItem: null,
    $navOnItem: null,
    $allMenu: null,
    $selectItem: null,
    $selector: null,

    _init: function(){
        this.$gnb = $('.gnb.depth1');
        this.$depth1 = this.$gnb.children('.toggle_down');
        this.$depth1Selector = this.$depth1.children('a');
        this.$navItem = $('.nav_item');
        this.$allMenu = $('.gnb ul');
    },
    _menuSet: function () {
        var objThis = this;

        this.$navItem.children("a").each(function () {
            if ($(this).text() === $('.content_header h2').text()) {
                objThis._addClass($(this));
            }
        });
    },
    _addClass: function (selector) {
        this.$selector = $(selector);
        this.$selectItem = this.$selector.parent();
        this.$depth2 = this.$selectItem.closest('.toggle_down');

        this.$depth2.addClass('on');
        this.$depth2.children('ul').addClass('active');
        this.$selectItem.addClass('on');
    },
    _delClass: function () {
        if (this.$navOnItem.length > 0) {
            this.$depth1.removeClass('on');
        }
        this.$allMenu.removeClass('active');
    },
    _depth1Action: function () {
        this.$selectItem = this.$depth2.children('.depth2');

        $(".depth2").removeClass('active');
        this.$depth1.removeClass('on');

        if (this.$navOnItem.length > 0) {
            this.$selector.parent().addClass("on");
        }
        this.$selectItem.addClass('active');
    },
    _initEvent: function(){
        var objThis = this;

        this._init();
        this._menuSet();

        this.$depth1Selector.on('click', function () {
            objThis.$selector = $(this);
            objThis.$navOnItem = objThis.$selector.siblings('.depth2').find(".nav_item.on");
            objThis.$depth2 = objThis.$selector.closest('.toggle_down');

            if (objThis.$selector.siblings().hasClass('active') === false) {
                objThis._depth1Action();

                if (objThis.$navOnItem.length === 0) {
                    objThis.$depth1.removeClass('on');
                }
            } else {
                objThis._delClass();
            }
        });
    }
}

// 화면크기 최적화 지정
var bestScreen = {
    dpiWidth: null,
    agent: null,
    step:null,

    _init: function () {
        this.agent = navigator.userAgent.toLowerCase();
        this.step = 0;
    },
    _isBrowser: function () {
        if (this.agent.split("firefox").length > 1) {
            return true;
        }
        return false;
    },
    _figureScreen: function () {
        (this._isBrowser()) ? this.step = 1 : this.step = 100;
    },
    _minusWidth: function () {
        var logerH = 0;

        if (this._isBrowser()) {
            this.step -= 0.1;
            $('#wrap').css('MozTransform', 'scale(' + this.step + ')');
            $('#wrap').css('transform-origin', '0 0');
        } else {
            this.step -= 10;
            $('#wrap').css('zoom', this.step + '%');
        }
    },
    _plusWidth: function () {
        var logerH = 0;

        if (this._isBrowser()) {
            this.step += 0.1;
            $('#wrap').css('MozTransform', 'scale(' + this.step + ')');
            $('#wrap').css('transform-origin', '0 0');
        } else {
            this.step += 10;
            $('#wrap').css('zoom', this.step + '%');
        }
    },
    _initEvent: function () {
        var objThis = this;

        this._init();
        this._figureScreen();

        $('.text_zoom .minus').on('click', function () {
            objThis._minusWidth();
        });
        $('.text_zoom .plus').on('click', function () {
            objThis._plusWidth();
        });
    }
}

// 셀렉트 박스
function label() {
    var $select = ".select_box select";
    $('body').on("change", $select, function () {
		var selectName = $(this).children("option:selected").text();
		$(this).siblings("label").text(selectName);
	});
}

// readonly
function inputAttr(){
    $('input').each(function(){
        if($(this).attr('readonly') === 'readonly'){
            $(this).addClass('read_only');
        }
        if($(this).attr('disabled') === 'disabled'){
            $(this).addClass('disabled');
        }
    });
}

// 파일 트리거
function fileTrigger(){
    $('.file, .btn_file').on('click', function () {
        $(this).siblings('.ipt_file').trigger('click');
    });
}

// 메일 폼 셀렉트
function MailFormSel(mail1,mail2,option,fullEmail){
	this.$mailForm1 = null;
	this.$mailForm2 = null;
    this.$option = null;
    this.selectValue = null;
	this.$valCombine = null;

	this._init(mail1,mail2,option,fullEmail);
	this._initEvent();
}
MailFormSel.prototype._init = function(mail1, mail2, option,fullEmail){
	this.$mailForm1 = $(mail1);
	this.$mailForm2 = $(mail2);
    this.$option = $(option);
	this.selectValue = this.$option.val();
    this.$valCombine = $(fullEmail);
},
MailFormSel.prototype._valueChange = function(){
	var objThis = this;

	this.$option.on('change', function(){
		objThis.selectValue = $(this).val();

		if(objThis.selectValue === "self" || objThis.selectValue === ""){
			objThis.$mailForm2.val("").removeAttr("disabled");
		}else{
			objThis.$mailForm2.val(objThis.selectValue).attr("disabled","disabled");
		}

		objThis._inputBlur();
	});
},
MailFormSel.prototype._inputBlur =function(){
	this.$valCombine.val(
		this.$mailForm1.val()+"@"+this.$mailForm2.val()
	);
},
MailFormSel.prototype._initEvent =function(){
	var objThis = this;

	this._valueChange();

	this.$mailForm1.blur(function(){
		objThis._inputBlur();
	});
	this.$mailForm2.blur(function(){
		objThis._inputBlur();
	});
}

// 팝업
function PopUp(selector, pop, close){
    this.$selector = null;
    this.$pop = null;
    this.$close = null;

    this._init(selector, pop, close);
    this._initEvent();
}
PopUp.prototype._init = function(selector, pop, close){
    this.$selector = $(selector);
    this.$pop = $(pop);
    this.$close = $(close);
}
PopUp.prototype._popOpen = function(){
    var objThis = this;

    objThis.$pop
        .show()
        .find('input').eq(0).focus();
}
PopUp.prototype._popReset = function(){
    var objThis = this;

    objThis.$pop.find('select').each(function(){
        var firstOption= $(this).find('option:first').val();
        var labelText= $(this).find('option:first').text();

        $(this).val(firstOption);
        $(this).siblings('label').text(labelText);
    });

    objThis.$pop.find('input').val('');
}
PopUp.prototype._popClose = function(){
    var objThis = this;

    this.$close.on('click', function(){
        objThis._popReset();
        objThis.$pop.hide();
    });
}
PopUp.prototype._initEvent = function(){
    this._popOpen();
    this._popClose();
}

// 드롭메뉴
function DropMenu(selecter, menu, close){
    this.$selecter = null;
    this.$group = null;
    this.$dropMenu = null;
    this.$btnClose = null;

    this._init(selecter, menu, close);
    this._initEvent();
}
DropMenu.prototype._init = function (selecter, menu, close) {
    this.$selecter = $(selecter);
    this.$group = this.$selecter.parent();
    this.$dropMenu = $(menu);
    this.$btnClose = $(close);
};
DropMenu.prototype._focusToggle = function () {
    var objThis = this;

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.toggle_menu').length) {
            objThis.$selecter.removeClass('on');
            objThis.$dropMenu.slideUp(100);
        }
    });
}
DropMenu.prototype._initEvent = function () {
    var objThis = this;

    this._focusToggle();

    this.$selecter.on('click', function(){
        if($(this).hasClass('on') === false){
            $('.toggle_menu').removeClass('on');
            $('.toggle_drop').slideUp(100);
            $(this).addClass('on');
            objThis.$dropMenu.stop().slideDown(300);
        } else {
            objThis.$selecter.removeClass('on');
            objThis.$dropMenu.stop().slideUp(100);
        }
    });
    this.$btnClose.on('click', function(){
        objThis.$selecter.removeClass('on');
        objThis.$dropMenu.stop().slideUp(100);
    });
};

// 드롭레이어
function DropLayer(selecter, menu, close) {
    this.$selecter = null;
    this.$group = null;
    this.$dropMenu = null;
    this.$btnClose = null;

    this._init(selecter, menu, close);
    this._initEvent();
}
DropLayer.prototype._init = function (selecter, menu, close) {
    this.$selecter = $(selecter);
    this.$group = this.$selecter.parent();
    this.$dropMenu = $(menu);
    this.$btnClose = $(close);
};
DropLayer.prototype._initEvent = function () {
    var objThis = this;

    this.$selecter.on('click', function () {
        if ($(this).hasClass('on') === false) {
            $('.toggle_menu').removeClass('on');
            $('.toggle_drop').slideUp(100);
            $(this).addClass('on');
            objThis.$dropMenu.stop().slideDown(300);
        } else {
            objThis.$selecter.removeClass('on');
            objThis.$dropMenu.stop().slideUp(100);
        }
    });
    this.$btnClose.on('click', function () {
        objThis.$selecter.removeClass('on');
        objThis.$dropMenu.stop().slideUp(100);
    });
};

// 텝메뉴
function TabMenu(menu,tabContent, callback){
	this.tabMenu = null;
	this.tabMenuItem = null;
	this.selectMenuItem = null;
	this.tabContent = null;
	this.selectContent = null;

	this._init(menu,tabContent);
	this._initEvent(callback);
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
	this.$tabContentItem.hide();
	this.$tabContentItem.eq(index).show();
}
TabMenu.prototype._initEvent = function(){
	var objThis = this;

	this.$tabMenu.on('click','li',function(){
		var index = $(this).index();

		objThis._modifyClass(this,function(){
			objThis.$selectMenuItem;
			objThis.selectIndex;
			objThis._modifyContent(index, function () {
			    if (callback) callback;
			});
		});
	});
}

// 모두선택 - 버튼(고급설정)
function AllBtnSelect(btn) {
    this.$btnAll = null;
    this.$selectedBtn = null;
    this.$targetBtn = null;
    this.$targetChk = null;
    this.$sibilinsBtn = null;

    this._init(btn);
    this._initEvent();
}
AllBtnSelect.prototype._init = function (btn) {
    this.$btnAll = $(btn);
    this.$selectedBtn = this.$btnAll.siblings().find('.btn');
}
AllBtnSelect.prototype._pieceSelect = function (selector) {
    this.$targetBtn = $(selector);
    this.$sibilinsBtn = this.$targetBtn.closest('.btn_select').find('.btn');
    var onBtnLength = this.$sibilinsBtn.filter('.on').length;
    siblingsBtnLength = this.$sibilinsBtn.length - 2;

    if (this.$targetBtn.hasClass('on') === false) {
        this.$targetBtn.addClass('on');

        if (onBtnLength > 0 && onBtnLength === siblingsBtnLength) {
            this.$targetBtn.parent().siblings('.btn_all').addClass('on');
        }
    } else {
        this.$targetBtn.removeClass('on');
        this.$targetBtn.parent().siblings('.btn_all').removeClass('on');
    }
}
AllBtnSelect.prototype._allSelect = function (selector) {
    this.$btnAll = $(selector);
    this.$targetBtn = this.$btnAll.siblings().find('.btn');

    if (this.$btnAll.hasClass('on') === false) {
        this.$btnAll.addClass('on');
        this.$targetBtn.addClass('on');
    } else {
        this.$btnAll.removeClass('on');
        this.$targetBtn.removeClass('on');
    }
}
AllBtnSelect.prototype._initEvent = function () {
    var objThis = this;

    this.$selectedBtn.on('click', function () {
        objThis._pieceSelect(this);
    });
    this.$btnAll.on('click', function () {
        objThis._allSelect(this);
    });
}

// 모두선택 - 체크박스
function AllChkSelect(parent, middle) {
    this.$chkAll = null;
    this.$selectedChk = null;
    this.$targetChk = null;
    this.$sibilinsChk = null;

    this._init(parent, middle);
    this._initEvent(parent, middle);
}
AllChkSelect.prototype._init = function (parent, middle) {
    this.$chkAll = $('.chk_all');
    this.$selectedChk = this.$chkAll.closest(parent).find(middle).find('input[type="checkbox"]');
};
AllChkSelect.prototype._pieceSelect = function (selector, parent, middle) {
    this.$targetChk = $(selector);
    this.$sibilinsChk = this.$targetChk.closest(middle).find('input[type="checkbox"]');
    this.$chkAll = this.$sibilinsChk = this.$targetChk.closest(parent).find('.chk_all');
    var chkLength = this.$targetChk.closest(parent).find(middle).find('input[type="checkbox"]:checked').length;
    siblingsChkLength = this.$targetChk.closest(parent).find(middle).find('input[type="checkbox"]').length;

    if (this.$chkAll.hasClass('cascading') === false) {
        if (chkLength === siblingsChkLength) {
            this.$chkAll.prop('checked', true);
        } else {
            this.$chkAll.prop('checked', false);
        }
    } else {
        if (chkLength >= 1) {
            this.$chkAll.prop('checked', true);
        } else {
            this.$chkAll.prop('checked', false);
        }
    }
};
AllChkSelect.prototype._allSelect = function (selector, parent, middle) {
    this.$targetChk = $(selector).closest(parent).find(middle).find('input[type="checkbox"]');

    if ($(selector).prop('checked') === true) {
        this.$targetChk.prop('checked', true);
    } else {
        this.$targetChk.prop('checked', false);
    }
};
AllChkSelect.prototype._initEvent = function (parent, middle) {
    var objThis = this;
    this._init(parent, middle);

    this.$selectedChk.on('click', function () {
        objThis._pieceSelect(this, parent, middle);
    });
    this.$chkAll.on('click', function () {
        objThis._allSelect(this, parent, middle);
    });
};

// 모두 해제
function ChkAllReset(parent, group){
    this.$group = null;
    this.$resetGroup = null;
    this.$btnReset = null;

    this._init(parent, group);
    this._chkReset();
}
ChkAllReset.prototype._init = function (parent, group) {
    this.$group = $(parent);
    this.$resetGroup = this.$group.find(group);
    this.$btnReset = this.$group.find('.btn_reset');
};
ChkAllReset.prototype._chkReset = function () {
    this.$resetGroup.find('input[type="checkbox"]').prop('checked', true);
};

// 달력 포멧 컨버터
var formatConvert = {
    year: null,
    month: null,
    day: null,

    _init: function (date, period) {
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate() + period;
    },
    _terms: function () {
        if (this.month.toString().length === 1) this.month = "0" + this.month;
        if (this.day.toString().length === 1) this.day = "0" + this.day;
    },
    _convert: function (date, period) {
        this._init(date, period);
        this._terms();

        var convertDate = this.year + '-' + this.month + '-' + this.day;
        return convertDate;
    }
};

// 숫자 콤마 붙이기
function comma() {
    $('.comma').each(function () {
        var $num = $(this),
            res = $num.text().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

        $num.text(res);
    });
}
