$(function () {
    // 스크롤 헤더 변화
    scrollHeader._initEvent();

    // NAV
    var gnbNav = new NavUI();

    // Top 메뉴
    boardDropMenu._initEvent();

    // 텝메뉴
    var mainArrTab = new TabMenu('.main .arrange_panel  .tab_menu2');
    var cateTab = new TabMenu('.product_view .tab_menu1');

    // 주문하기 결제수단 텝
    accountTab._initEvent();

    // 셀렉트박스
    selectBox._initEvent();

    // 파일첨부 기본UI
    fileTrigger._initEvent();

    // 수량 카운터
    counter._initEvent();

    // 장바구니 체크 후 팝업
    var cartAllChk = new PopAfterChk('.cart_content .tb_style');

    // 장바구니 비우기 팝업
    var cartAllDel = new PopUp('.btn_all_del','.pop_wrap.all_del','.pop_wrap .close, .pop_wrap .confirm, .pop_wrap .cancel');

    // 장바구니 상품 삭제
    cartProductDel._initEvent();

    // 관심상품 팝업
    var cartSuccess = new PopUp('.btn_select_del','.pop_wrap.cart_put','.pop_wrap .close');
    var sameProduct = new PopUp('.btn_cart','.pop_wrap.cart_same','.pop_wrap .close, .pop_wrap .confirm, .pop_wrap .cancel');

    // 상품후기 구매자 리플
    userReply._initEvent();

    // 회원가입 전체동의 체크
    signInAllChk._initEvent();

    // 회원가입 메일 폼 셀렉트
    var signInEmail = new MailFormSel('.sign_wrap #email1','.sign_wrap #email2','.sign_wrap .email_wrap .select_box','.sign_wrap #email');

    // 회원가입 팝업
    var signInRepeat = new PopUp('.btn_repeat','.id_repeat_chk','.id_repeat_chk .close, .id_repeat_chk .confirm');
    var signInUserTerms = new PopUp('.btn_use_terms','.use_terms','.use_terms .close');
    var signInInfoAgree = new PopUp('.btn_info_agree','.info_agree','.info_agree .close');

    // 비회원 주문상세내역 팝업
    var nomemOrderCancel = new PopUp('.nomem_order_detail .order_cancel','.nomem_order.order_cancel','.order_cancel .close, .order_cancel .cancel');  // 주문취소
    var nomemOrderChange = new PopUp('.nomem_order_detail .order_change','.nomem_order.order_change','.order_change .close, .order_change .cancel'); // 교환신청
    var nomemOrderReturn = new PopUp('.nomem_order_detail .order_return','.nomem_order.order_return','.order_return .close, .order_return .cancel'); // 교환신청
    var nomemCancelDetail = new PopUp('.nomem_order_detail .cancel_detail','.nomem_order.cancel_detail','.cancel_detail .close, .cancel_detail .confirm'); // 주문취소 상세보기
    var nomemChangeDetail = new PopUp('.nomem_order_detail .change_detail','.nomem_order.change_detail','.change_detail .close, .change_detail .confirm'); // 교환신청 상세보기
    var nomemReturnDetail = new PopUp('.nomem_order_detail .return_detail','.nomem_order.return_detail','.return_detail .close, .return_detail .confirm'); // 교환신청 상세보기

    // 비회원 주문상세내역 모두체크
    var orderCancelAllChk = new PopAfterChk('.order_cancel .tb_style2');
    var orderChangelAllChk = new PopAfterChk('.order_change .tb_style2');
    var orderReturnAllChk = new PopAfterChk('.order_return .tb_style2');

    // 상품후기등록 파일첨부 추가/삭제
    var reviewWrite = new FilePlusDel('.nomem_review_register .file');

    // 비회원 주문서 작성 이메일
    var nomemverOrderEmail = new MailFormSel('.order_write #email1','.order_write #email2','.order_write .email_wrap .select_box','.order_write #email');

    // 관심상품 모두 체크
    var interestProductAllChk = new PopAfterChk('.interest_product .tb_style');

    // 쿠폰 조회 및 적용
    var couponPop = new PopUp('.order_write .btn_coupon','.pop_wrap.coupon_list','.coupon_list .apply, .coupon_list .cancel, .coupon_list .close');

    // 쿠폰 모두 체크
    var couponAllChk = new PopAfterChk('.coupon_list .tb_style2');

    // 1:1문의 파일첨부 추가/삭제
    var inquiryWrite = new FilePlusDel('.inquiry_write .file');
});
$(window).on('load',function(){
    // 스크롤 버튼 이동
    scrollTop();
    scrollBottom();
});

// NAV
function NavUI(){
    this.$gnb = null;
    this.$gnbItem = null;
    this.$selectItem = null;
    this.$subMenuOpen = null;
    this.$subMenuClose = null;

    this._init();
	this._initEvent();
}
NavUI.prototype._init = function(){
    this.$gnb = $('#nav .gnb');
    this.$gnbItem = this.$gnb.children();
    this.$subMenuClose = this.$gnbItem.children('.drop_down');
}
NavUI.prototype._menuOpen = function () {
    this.$subMenuClose.stop().hide();
    this.$subMenuOpen.stop().fadeIn(300);
};
NavUI.prototype._menuClose = function () {
    this.$subMenuClose.stop().hide();
}
NavUI.prototype._initEvent = function(){
    var objThis = this;

    this.$gnbItem.on('mouseenter',function(){
        objThis.$selectItem = $(this);
        objThis.$subMenuOpen = objThis.$selectItem.children('.drop_down');

        objThis._menuOpen();
    });
    this.$gnbItem.on('mouseleave',function(){
        objThis.$selectItem = $(this);

        objThis._menuClose();
    });
}

// BOARD 드롭메뉴
var boardDropMenu = {
    $menu:null,
    $downMenu:null,

    _init: function(){
        this.$menu = $('.top_menu');
        this.$menuItem = this.$menu.children('li');
        this.$downMenu = $('.drop_down');
    },
    _initEvent: function(){
        var objThis =this;

        this._init();
        this.$menuItem.on('mouseenter', function(){
            objThis.$downMenu = $(this).children('.drop_down');

            objThis.$downMenu.stop().slideDown(200);
        });

        this.$menuItem.on('mouseleave', function(){
            objThis.$downMenu.stop().slideUp(100);
        });
    }
}

// 텝메뉴
function TabMenu(selector){
    this.$selector = null;
    this.$menuItem = null;
    this.$selectItem = null;

    this._init(selector);
    this._initEvent();
}
TabMenu.prototype._init = function (selector) {
    this.$selector = $(selector);
    this.$menuItem = this.$selector.children();
};
TabMenu.prototype._addOn = function(){
    this.$menuItem.removeClass('on');
    this.$selectItem.addClass('on');
}
TabMenu.prototype._initEvent = function () {
    var objThis = this;

    this.$menuItem.on('click', function(e){
        e.preventDefault();
        objThis.$selectItem =$(this);
        objThis._addOn();
    });
};

// 셀렉트 박스
var selectBox = {
    $selector: null,
    $firstOption: null,
    $option: null,
    $OptionName: null,

    _init: function(selector){
        this.$selector = $(selector);
        this.$firstOption = this.$selector.children('.first_option');
        this.$option = this.$selector.siblings('.option');
        this.$optionName = this.$option.children('.option_name');
    },
    _optionHide: function(){
        this.$selector.removeClass('active');
        this.$optionName.css('display','none');
    },
    _optionShow: function(){
        $('.select_box .first').not(this.$selector).removeClass('active');
        $('.select_box .option_name').css('display','none');
        this.$selector.addClass('active');
        this.$optionName.css('display','block');
    },
    _initEvent: function(){
        var objThis = this;
        this._init('.select_box .first');

        this.$firstOption.on('click', function(){
            objThis._init($(this).parent());

            if( objThis.$selector.hasClass('active') === true){
                objThis._optionHide();
            } else {
                objThis._optionShow();
            }
        });

        this.$option.on('click', function(){
            objThis.$option.removeClass('on');
            objThis.$option.children('input').prop('checked', false);
            objThis._optionHide();
            objThis.$firstOption.prop('checked', false);
            $(this).addClass('on');
        });
    }
}

// 메일 폼 셀렉트
function MailFormSel(mailForm1,mailForm2,selectBox, mailForm){
	this.$mailForm1 = null;
	this.$mailForm2 = null;
    this.$mailForm = null;
	this.$mailFullValue = null;
	this.$selectValue = null;

	this._init(mailForm1,mailForm2,selectBox, mailForm);
	this._initEvent();
}
MailFormSel.prototype._init = function(mail1, mail2, sel, mail){
	this.$mailForm1 = $(mail1);
	this.$mailForm2 = $(mail2);
	this.$mailForm = $(sel).find('.option_name');
    this.$mailFullValue = $(mail);
	this.$selectValue = this.$mailForm.find('input[type="radio"]:checked').siblings('.option_name').text();
},
MailFormSel.prototype._valueChange = function(){
	var objThis = this;

	this.$mailForm.on('click', function(){
		objThis.$selectValue = $(this).text();

		if(objThis.$selectValue == "직접입력" || objThis.$selectValue == ""){
			objThis.$mailForm2.val("").removeAttr("disabled");
		}else{
			objThis.$mailForm2.val(objThis.$selectValue).attr("disabled","disabled");
		}

		objThis._inputBlur();
	});
},
MailFormSel.prototype._inputBlur =function(){
	this.$mailFullValue.val(
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

// 파일첨부 기본 UI
var fileTrigger = {
    $btnFile: null,
    $file: null,
    $fileName: null,
    fileVal: null,

    _init: function(){
        this.$btnFile = $('.btn_file .btn');
        this.$fileName = $('.file_name');
    },
    _fileSet: function(){
        this.$fileName.attr('readonly','readonly')
    },
    _currentFile: function(selector){
        this.$file = $(selector).closest('.line').find('input[type="file"]');
    },
    _inputChange: function(){
        var objThis =this;

        this.$file.change(function(){
            objThis.fileVal = objThis.$file.val();

            $(this).parent('.btn_file').siblings('.file_name').val(objThis.fileVal);
        });
    },
    _initEvent: function(){
        var objThis =this;

        this._init();
        this._fileSet();

        this.$fileName.off().on('click', function(){
            objThis._currentFile(this);
            $(this).siblings('.btn_file').find('input[type="file"]').trigger('click');
            objThis._inputChange();
        });
        this.$btnFile.off().on('click', function(){
            objThis._currentFile(this);
            $(this).siblings('input[type="file"]').trigger('click');
            objThis._inputChange();
        });
    }
}

// 파일첨부 추가/삭제
function FilePlusDel(group){
    this.$group = null;
    this.$btnPlus = null;
    this.$btnDel = null;
    this.$lastLine = null;
    this.$delLine = null;

    this._init(group);
    this._initEvent();
}
FilePlusDel.prototype._init = function (group) {
    this.$group = $(group);
    this.$btnPlus = this.$group.find('.btn_file_plus');
    this.$btnDel = this.$group.find('.btn_file_del');
};
FilePlusDel.prototype._lineAdd = function (btn, callback) {
    if($(btn).siblings('.line').length < 5){
        $(btn).parent().append('<div class="line"></div>');
        callback();  // _fileHtml 콜백
    } else {
        alert('최대 5개까지 이미지를 등록할 수 있습니다.');
    }
};
FilePlusDel.prototype._fileHtml = function (btn) {
    this.$lastLine = $(btn).closest('.file').find('.line').last();
    this.$lastLine.html('<input class="file_name" type="text"><div class="btn_file"><button class="btn charcoal" type="button">파일선택</button><input type="file"></div><button class="btn white btn_file_del" type="button">&#10005;</button>');
};
FilePlusDel.prototype._lineDel = function (btn) {
    $(btn).parent().remove();
};
FilePlusDel.prototype._initEvent = function () {
    var objThis = this;

    this.$btnPlus.on('click', function(){
        var selector = this;
        objThis._lineAdd(selector, function(){
            objThis._fileHtml(selector);
            objThis.$btnDel = objThis.$group.find('.btn_file_del');
        });
        fileTrigger._initEvent();
    });

    this.$group.on('click', '.btn_file_del', function(){
        objThis._lineDel(this);
    });
};

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

    this.$selector.on('click', function(e){
        e.preventDefault();
        objThis.$pop
            .css('display',' table')
            .find('input').eq(0).focus();
    });
}
PopUp.prototype._popClose = function(){
    var objThis = this;

    this.$close.on('click', function(){
        objThis.$pop.hide();
    });
}
PopUp.prototype._initEvent = function(){
    this._popOpen();
    this._popClose();
}

// 수량 카운터
var counter = {
    $counter: null,
    $countIpt: null,
    $btnPlus: null,
    $btnMinus: null,
    countNum: null,

    _init: function(selector){
        this.$counter = $(selector);
        this.$countIpt = this.$counter.find('input');
        this.$btnPlus = this.$counter.find('.plus');
        this.$btnMinus = this.$counter.find('.minus');
        this.countNum = this.$countIpt.val();
    },
    _countChange: function(){
        if(this.countNum >= 1){
            this.$countIpt.val(this.countNum);
        }
    },
    _initEvent: function(){
        var objThis = this;
        this._init('.counter');
        this.$btnPlus.on('click', function(){
            objThis._init($(this).closest('.counter'));
            objThis.countNum++
            objThis._countChange();
        });
        this.$btnMinus.on('click', function(){
            objThis._init($(this).closest('.counter'));
            objThis.countNum--;
            objThis._countChange();
        });
    }
}

// 장바구니 선택상품 삭제
var cartProductDel = {
    $selector: null,
    $chkItem: null,

    _init: function(){
        this.$pickUpDel = $('.select_del .confirm');
        this.$allDel = $('.all_del .confirm');
        this.$chkItem = $('.cart_content .tb_style tbody input[type="checkbox"]');
    },
    _initEvent: function(){
        var objThis = this;

        this._init();

        this.$pickUpDel.on('click', function(){

            objThis.$chkItem.each(function(){
                objThis.$delItem = $(this).closest('tr');

                if($(this).prop('checked') === true){
                    objThis.$delItem.remove();
                }
            })
        });

        this.$allDel.on('click', function(){
            objThis.$delItem = objThis.$chkItem.closest('tr');

            objThis.$delItem.remove();
        });
    }
}

// 상세페이지 입력값 삭제
var iptTextDel = {
    $textDel: null,

    _init: function(){
        this.$textDel = $('.text_del');
    },
    _initEvent: function(){
        var objThis = this;
        this._init();

        this.$textDel.on('click', function(){
            $(this).siblings('input').val('').focus();
        });
    }
}

// 상세페이지 선택 옵션 삭제
var optionDel = {
    $btnDel: null,
    $delDd: null,
    $delDt: null,

    _init: function(selector){
        this.$btnDel = $(selector);
        this.$delDd = this.$btnDel.parent('dd');
        this.$delDt = this.$delDd.prev('dt');
    },
    _initEvent: function(selector){
        var objThis = this;
        this._init(selector);

        this.$btnDel.on('click', function(){
            objThis._init(this);
            objThis.$delDd.remove();
            objThis.$delDt.remove();
        });
    }
}

// 패럴럭스 스크롤 UI 이벤트
function ScrollAction(parallaxNav, parallaxCon) {
    this.$parallaxNav = null;
    this.parallaxNavH = 0;
    this.headerH = 0;
    this.minusH = 0;
    this.$navItem = null;
    this.position = null;
    this.atOffsetPosition = null;
    this.$parallaxItem = null;
    this.offsetArray = [];

    this._init(parallaxNav, parallaxCon);
    this._initEvent();
}
ScrollAction.prototype._init = function (parallaxNav, parallaxCon) {
    this.$parallaxNav = $(parallaxNav);
    this.parallaxNavH = this.$parallaxNav.height();
    this.headerH = $('#header').outerHeight();
    this.minusH = this.headerH + this.parallaxNavH*2;
    this.$navItem = this.$parallaxNav.children();
    this.position = $(window).scrollTop;
    this.atOffsetPosition = this.$parallaxNav.offset().top - this.headerH;
    this.$parallaxItem = $(parallaxCon).children('div');
}
ScrollAction.prototype._addFix = function (position) {
    if (this.atOffsetPosition <= position) {
        this.$parallaxNav.addClass('fixed');
    } else {
        this.$parallaxNav.removeClass('fixed');
    }
}
ScrollAction.prototype._offsetInit = function () {
    var ojThis = this;
    for (var i = 0; i < this.$parallaxItem.length; i++){
        ojThis.offsetArray.push(ojThis.$parallaxItem.eq(i).offset().top);
    }
}
ScrollAction.prototype._offsetMenuOn = function (position) {
    var ojThis = this;
    var startLine;
    var endLine;

    for (var i = 0; i < this.$parallaxItem.length; i++) {
        startLine = position >= ojThis.offsetArray[i] - this.minusH;
        endLine = position < ojThis.offsetArray[i] + ojThis.$parallaxItem.eq(i).height();

        if (startLine && endLine) {
            ojThis.$navItem.removeClass('on');
            ojThis.$navItem.eq(i).addClass('on');
        }
    }
}
ScrollAction.prototype.menuScrolling = function (i, position) {
    this.minusH = this.headerH + this.parallaxNavH;
    var computeOffset = this.offsetArray[i] - this.minusH;
    this.$navItem.removeClass('on');
    this.$navItem.eq(i).addClass('on');
    $('html,body').stop().animate({ scrollTop: computeOffset }, 500, 'swing');
}
ScrollAction.prototype._initEvent = function () {
    var ojThis = this;
    var winPosition = $(window).scrollTop() + $('.header').height();

    this._addFix(winPosition);
    this._offsetInit();
    this._offsetMenuOn(winPosition);

    this.$navItem.on('click', function () {
        var index = $(this).index();
        ojThis.menuScrolling(index, winPosition);
    });

    $(window).scroll(function () {
        winPosition = $(window).scrollTop() + $('.header').height();
        ojThis._addFix(winPosition);
        ojThis._offsetMenuOn(winPosition);
    });
}

// 상품후기 팝업 갤러리
var reviewGallery = {
    $thum: null,
    $view: null,

    _init: function(){
        this.$thum = $('.photo_select .slide_item img');
        this.$view = $('.photo_view img');
    },
    _initEvent: function(){
        var objThis = this;
        var imgUrl;
        this._init();

        this.$thum.off().on('click', function(){
            imgUrl = $(this).attr('src');
            objThis.$view.attr('src',imgUrl);
        });
    }
}

// 상품후기 구매자 리플
var userReply ={
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
        this.$btnModify = $('.review_coment .btn_modify');
        this.$btnDel = $('.review_coment .btn_del');
        this.$btnSave = $('.review_coment .btn_save');
        this.$btnCancle = $('.review_coment .btn_cancle');
    },
    _modifyAction: function(btn){
        this.$modifyVal = $(btn).closest('.btn_group').siblings('.wrote').text();
        this.$viewForm = $(btn).closest('.view_wrap');
        this.$modifyForm = this.$viewForm.siblings('.modify_wrap');
        this.$viewTxt = this.$modifyForm.children('input');

        this.$viewTxt.val(this.$modifyVal);

        this.$viewForm.hide();
        this.$modifyForm.show();
    },
    _delAction: function(btn){
        this.$delDd = $(btn).closest('dd');
        this.$delDt = this.$delDd.prev('dt');

        this.$delDt.remove();
        this.$delDd.remove();
    },
    _saveAction: function(btn){
        this.$viewTxt = $(btn).closest('.btn_group').siblings('input').val();
        this.$modifyForm = $(btn).closest('.modify_wrap');
        this.$viewForm = this.$modifyForm.siblings('.view_wrap');

        this.$viewForm.children('.wrote').text(this.$viewTxt);

        this.$modifyForm.hide();
        this.$viewForm.show();
    },
    _cancleAction: function(btn){
        this.$modifyForm = $(btn).closest('.modify_wrap');
        this.$viewForm = this.$modifyForm.siblings('.view_wrap');

        this.$modifyForm.hide();
        this.$viewForm.show();
    },
    _initEvent: function(){
        var objThis = this;

        this._init();
        this.$btnModify.on('click', function(){
            objThis._modifyAction(this);
        });
        this.$btnDel.on('click', function(){
            objThis._delAction(this);
        });
        this.$btnSave.on('click', function(){
            objThis._saveAction(this);
        });
        this.$btnCancle.on('click', function(){
            objThis._cancleAction(this);
        });
    }
}

// 장바구니 체크
function PopAfterChk(selector){
    this.$selector = null;
    this.$allItem = null;
    this.$checkItem = null;

    this._init(selector);
    this._initEvent();
}
PopAfterChk.prototype._init = function (selector) {
    this.$selector = $(selector);
    this.$allItem = this.$selector.find('.chk_all');
    this.$checkItem = this.$selector.find('input[type="checkbox"]');
}
PopAfterChk.prototype._chking = function (allChk) {
    this.$checkItem = $(allChk).closest('table').find('tr td:first-child').find('input[type="checkbox"]');

    if($(allChk).prop('checked') === true ){
        this.$checkItem.prop('checked',true);
    } else {
        this.$checkItem.prop('checked', false);
    }
}
PopAfterChk.prototype._afterPop = function () {
    var cartSelectDel;

    if( this.$checkItem.is(':checked') === true){
        cartSelectDel = new PopUp('.btn_select_del','.pop_wrap.select_del','.pop_wrap .close, .pop_wrap .confirm, .pop_wrap .cancel');
    } else {
        delete cartSelectDel;
        $('.btn_select_del').off();
    }
}
PopAfterChk.prototype._initEvent = function () {
    var objThis = this;

    this.$allItem.on('click', function(){
        objThis._chking(this);
        objThis._afterPop();
    });
    this.$checkItem.on('click', function(){
        if ($(this).is(':checked') === false) objThis.$allItem.prop('checked', false);
        objThis._afterPop();
    });
}

// 아코디언 클릭 요소를 selector로
function AccordionMenu(selector) {
    this.$menuItem = null;
    this.$selectItem = null;
    this.$toggleCon = null;
    this.$toggleOpen = null;

    this._init(selector);
    this._initEvent();
}
AccordionMenu.prototype._init = function (selector) {
    this.$menuItem = $(selector);
    this.$toggleCon = this.$menuItem.next();
}
AccordionMenu.prototype._selectOn = function (selector, callback) {
    this.$menuItem.removeClass('on');
    $(selector).addClass('on');

    this.$selectItem = this.$menuItem.filter('.on');
    this.$toggleOpen = this.$selectItem.next('.toggle_con');

    callback();
}
AccordionMenu.prototype._initEvent = function () {
    var objThis = this;
    this.$menuItem.on('click', function () {
        if ($(this).hasClass('on') == false) {
            objThis._selectOn(this, function () {
                objThis.$toggleCon.slideUp(300);
                objThis.$toggleOpen.slideDown(300);
            });
        } else {
            objThis.$toggleOpen.slideUp(300);
            $(this).removeClass('on');
        }
    });
}

// 회원가입 전체동의 체크
signInAllChk = {
    $selector: null,
    $chkItem: null,

    _init: function(){
        this.$selector = $('.all_chk input');
        this.$chkItem = $('.detail_chk input[type="checkbox"]');
    },
    _initEvent: function(){
        var objThis = this;

        this._init();
        this.$selector.on('click', function(){
            if (objThis.$selector.prop('checked') === false) {
                objThis.$chkItem.prop('checked', false);
            } else {
                objThis.$chkItem.prop('checked', true);
            }
        });
    }
}

// 주문하기 결제수단 텝
var accountTab = {
    $meansGroup: null,
    $meansSelector: null,
    $selectTable: null,
    $receiptGroup: null,

    _init: function(){
        this.$meansGroup = $('.account_means_wrap .means_wrap');
        this.$meansSelector = this.$meansGroup.find('input');
        this.$selectTable = $('.account_means');
        this.$receiptGroup = $('.receipt_select');
        this.$receiptSelector = this.$receiptGroup.find('input');
    },
    _meanAddOn: function(i){
        this.$selectTable.removeClass('on');
        this.$selectTable.eq(i).addClass('on');
    },
    _receiptAddOn: function(chk, i){
        console.log(i);
        this.$receiptTable = $(chk).closest('tr').siblings().find('.receipt_wrap');
        this.$receiptTable.removeClass('on');
        this.$receiptTable.eq(i).addClass('on');
    },
    _initEvent: function(){
        var index;
        var objThis = this;

        this._init();
        this.$meansSelector.on('click', function(){
            index = objThis.$meansSelector.index(this);
            objThis._meanAddOn(index);
        });
        this.$receiptGroup.on('click', 'input',function(){
            index = $(this).index() / 2;
            console.log(this, index);
            // index = objThis.$receiptSelector.index(this);
            objThis._receiptAddOn(this, index);
        });
    }
}

// 스크롤 헤더 변화
var scrollHeader = {
    $header: null,
    $body: null,
    position: null,

    _init: function(){
        this.$header = $('#header');
        this.$body = $('body');
    },
    _zeroControl: function(){
        this.position = $(window).scrollTop();

        if(this.position > 0) {
            this.$body.removeClass('zero');
        } else{
            this.$body.addClass('zero');
        }
    },
    _initEvent: function(){
        var objThis = this;

        this._init();
        this._zeroControl();

        $(window).scroll(function(){
            objThis._zeroControl();
        });
    }
}

// 스크롤 버튼 이동
function scrollTop(){
	var $btnTop = $('.scroll_top');

	$btnTop.on('click',function(){
		$('html,body').stop().animate({scrollTop:0 }, '400','swing');
	});
}
function scrollBottom(){
	var $btnBottom = $('.scroll_bottom');

	$btnBottom.on('click',function(){
		$('html,body').stop().animate({scrollTop:$('html').height()}, '400','swing');
	});
}
