$(function(){
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

                function close(isConfirm, callback){
                    $body.on('click', '.pop_alert .btn', function(isConfirm){
                        $(this).closest('.pop_alert').remove();
                        ($(this).hasClass('btn_confirm_ok') === true) ? isConfirm = true : isConfirm = false;

                        defaultSet.btnChk.call(this, isConfirm);
                        callback();
                    });
                }

                function eRemove(){
                    $body.off('click', '.pop_alert .btn');
                }

                init($(this));
                open();
                close(isConfirm, function(){
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
    _creatStr: function(){
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
    $depth2Selector: null,
    $depth3: null,
    $allMenu:null,
    $selectIcon:null,

    _init: function(){
        this.$gnb = $('.gnb.depth1');
        this.$depth1 = this.$gnb.children('.toggle_down');
        this.$depth1Selector = this.$depth1.children('a');
        this.$depth2 = $('.depth2').children('.toggle_down');
        this.$depth2Selector = this.$depth2.children('a');
        this.$allMenu = $('.gnb ul');
    },
    _delClass: function(selector){
        this.$depth2.removeClass('on');
        $(selector).parent('.toggle_down').siblings().removeClass('on');
        this.$allMenu.removeClass('active');
    },
    _addClass: function(selector){
        this.$toggleMenu = $(selector).parent('.toggle_down');

        this.$toggleMenu.addClass('on');
        this.$toggleMenu.children('ul').addClass('active');
    },
    _openedClass: function(selector){
        $(selector).parent().removeClass('on');
        $(selector).siblings().removeClass('active');
    },
    _menuAction: function(selector){
        if( $(selector).parent().hasClass('on') === false){
            this._delClass(selector);
            this._addClass(selector);
        } else {
            this._openedClass(selector);
        }
    },
    _initEvent: function(){
        var objThis = this;

        this._init();

        this.$depth1Selector.on('click', function(){
            objThis._menuAction(this);
        });
        this.$depth2Selector.on('click', function(){
            objThis._menuAction(this);
        });
    }
}

// 셀렉트 박스
function label(){
	var $select = $(".select_box select");
	$select.on("change",function(){
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

		if(objThis.selectValue == "self" || objThis.selectValue == ""){
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
DropMenu.prototype._initEvent = function () {
    var objThis = this;

    this.$selecter.on('click', function(){
        if($(this).hasClass('on') === false){
            $('.toggle_menu').removeClass('on');
            $('.toggle_drop').slideUp(100);
            $(this).addClass('on');
            objThis.$dropMenu.slideDown(300);
        } else {
            objThis.$selecter.removeClass('on');
            objThis.$dropMenu.slideUp(100);
        }
    });
    this.$btnClose.on('click', function(){
        objThis.$selecter.removeClass('on');
        objThis.$dropMenu.slideUp(100);
    });
};

// 텝메뉴
function TabMenu(menu,tabContent){
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
			objThis._modifyContent(index);
		});
	});
}

// 모두선택 - 버튼(고급설정)
var allBtnSelect = {
    $btnAll: null,
    $selectedBtn: null,
    $targetBtn: null,
    $sibilinsBtn: null,

    _init: function(){
        this.$btnAll = $('.btn_all');
        this.$selectedBtn = this.$btnAll.siblings().find('.btn');
    },
    _pieceSelect: function(selector){
        this.$targetBtn = $(selector);
        this.$sibilinsBtn = this.$targetBtn.closest('.btn_select').find('.btn');
        var onBtnLength = this.$sibilinsBtn.filter('.on').length;
            siblingsBtnLength = this.$sibilinsBtn.length -2;

        if (this.$targetBtn.hasClass('on') === false ) {
            this.$targetBtn.addClass('on');

            if (onBtnLength > 0 && onBtnLength === siblingsBtnLength) {
                this.$targetBtn.parent().siblings('.btn_all').addClass('on');
            }
        } else {
            $(selector).removeClass('on');
            this.$targetBtn.removeClass('on');
            this.$targetBtn.parent().siblings('.btn_all').removeClass('on');
        }
    },
    _allSelect: function(selector){
        this.$targetBtn = $(selector).siblings().find('.btn');

        if ($(selector).hasClass('on') === false ) {
            $(selector).addClass('on');
            this.$targetBtn.addClass('on');
        } else {
            $(selector).removeClass('on');
            this.$targetBtn.removeClass('on');
        }
    },
    _initEvent: function(){
        var objThis = this;
        this._init();

        this.$selectedBtn.on('click', function(){
            objThis._pieceSelect(this);
        });
        this.$btnAll.on('click', function(){
            objThis._allSelect(this);
        });
    }
}

// 모두선택 - 체크박스
function AllChkSelect(parent, middle){
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

    if(this.$chkAll.hasClass('cascading') === false){
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

    if ($(selector).prop('checked') === true ) {
        this.$targetChk.prop('checked',true);
    } else {
        this.$targetChk.prop('checked', false);
    }
};
AllChkSelect.prototype._initEvent = function (parent, middle) {
    var objThis = this;
    this._init(parent, middle);

    this.$selectedChk.on('click', function(){
        objThis._pieceSelect(this, parent, middle);
    });
    this.$chkAll.on('click', function(){
        objThis._allSelect(this, parent, middle);
    });
}

// 모두 해제
function ChkAllClear(parent, group){
    this.$group = null;
    this.$clearGroup = null;
    this.$btnReset = null;

    this._init(parent, group);
    this._initEvent();
}
ChkAllClear.prototype._init = function (parent, group) {
    this.$group = $(parent);
    this.$clearGroup = this.$group.find(group);
    this.$btnReset = this.$group.find('.btn_reset');
};
ChkAllClear.prototype._initEvent = function () {
    var objThis =this;

    this.$btnReset.on('click', function(){
        objThis.$clearGroup.find('input[type="checkbox"]').prop('checked', false);
    });
};

// 분류 등록/관리 수정
var sortModify ={
    $btnModify: null,
    $btnDel: null,
    $btnSave: null,
    $btnCancle: null,
    $modifyForm: null,
    $viewForm: null,
    $viewTxt: null,
    $modifyVal: null,
    $delDt: null,
    $delDd: null,

    _init: function(){
        this.$btnModify = $('.sort_register .btn_modify');
        this.$btnSave = $('.sort_register .btn_save');
        this.$btnCancle = $('.sort_register .btn_cancel');
    },
    _modifyAction: function(btn){
        this.$modifyVal = $(btn).siblings('.sort_name').text();
        this.$modifyForm = $(btn).siblings('.modify_wrap');
        this.$viewTxt = this.$modifyForm.children('input[type="text"]');

        this.$modifyForm.addClass('on');
        this.$viewTxt.val(this.$modifyVal);
    },
    _saveAction: function(btn){
        this.$viewTxt = $(btn).closest('.btn_group').siblings('input').val();
        this.$modifyForm = $(btn).closest('.modify_wrap');
        this.$viewForm = this.$modifyForm.siblings('.sort_name');

        this.$viewForm.text(this.$viewTxt);

        this.$modifyForm.removeClass('on');
    },
    _cancleAction: function(btn){
        this.$modifyForm = $(btn).closest('.modify_wrap');

        this.$modifyForm.removeClass('on');
    },
    _initEvent: function(){
        var objThis = this;

        this._init();
        this.$btnModify.on('click', function(){
            objThis._modifyAction(this);
        });
        this.$btnSave.on('click', function(){
            objThis._saveAction(this);
        });
        this.$btnCancle.on('click', function(){
            objThis._cancleAction(this);
        });
    }
}
