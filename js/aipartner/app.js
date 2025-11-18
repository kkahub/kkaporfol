function SYalertMessage(sy_text) {
    $(".SYalertLayerWrap").remove();
    $("body").append("<div class='SYalertLayerWrap'><div class='alertContentWrap'> <a href='javascript:;' class='close'><i class='SYicon'></i></a> <div class='alertContent'>" + sy_text + "</div> <div class='buttonWrap'><button type='button' class='check'>확인</button></div> </div></div>");
    $(".SYalertLayerWrap .check, .SYalertLayerWrap .close").unbind("click").click(function () {
        $(".SYalertLayerWrap").remove();
    });
}

function SYalertMessageReload(sy_text) {
    $(".SYalertLayerWrap").remove();
    $("body").append("<div class='SYalertLayerWrap'><div class='alertContentWrap'> <a href='javascript:;' class='close'><i class='SYicon'></i></a> <div class='alertContent'>" + sy_text + "</div> <div class='buttonWrap'><button type='button' class='check'>확인</button></div> </div></div>");
    $(".SYalertLayerWrap .check, .SYalertLayerWrap .close").unbind("click").click(function () {
        $(".SYalertLayerWrap").remove();

        location.reload();
    });
}

function SYalertMessageConfirm(text, okCb, noCb) {
    $(".SYalertLayerWrap").remove();
    $("body").append(`<div class="SYalertLayerWrap">
        <div class="alertContentWrap">
            <a href="javascript:;" class="close"><i class="SYicon"></i></a>
            <div class="alertContent">${text}</div>
            <div class="buttonWrap">
                <button type="button" id="SYalertLayerWrapNo">취소</button>
                <button type="button" id="SYalertLayerWrapOk">확인</button>
            </div>
        </div>
        </div>`);
    $(".SYalertLayerWrap .check, .SYalertLayerWrap #SYalertLayerWrapOk").unbind("click").click(okCb);
    $(".SYalertLayerWrap .check, .SYalertLayerWrap #SYalertLayerWrapNo, .SYalertLayerWrap .close").unbind("click").click(function () {
        noCb();
        $(".SYalertLayerWrap").remove();
    });
}

/*  헤더 */

//header
$(window).mousemove(function(e){
    // gnb
    if($(e.target).parents(".headerNavigation").length >= 1){
        if($(e.target).parents(".menu").find("span").length >=1 || $(e.target).parents(".gnbWrap").length >=1){
            $(".gnbWrap").addClass("on")
        }else{
            $(".gnbWrap").removeClass("on")
        }
    }else{
        $(".gnbWrap").removeClass("on")
    }
});

/*  */
 bannerId = '';
$(document).on('click', '.btnBanner', function () {
    let id = $(this).attr('data-id');
    bannerId = id;

    $('.popupWrap').attr('aria-hidden', 'false');
    $('#'+id).attr('aria-hidden', 'false');
    $('body').addClass('popupView');

    $('.tabArea li').each(function (id, el) {
        $(el).removeClass('current');
    });

    $('.tabCon').each(function (id, el) {
        $(el).removeClass('current');
    })

    $('#'+id+' .tabArea li:first-child').addClass('current');
    $('#'+id+' .tabCon').addClass('current');
});

$(document).on('click', '.tabArea li', function() {
    $('.tabArea li').removeClass("current");
    $(".tabCon").removeClass("current");

    $(this).addClass("current");
    var tab_id = $(this).attr("data-tab");
    $("#" + tab_id).addClass("current");
});

$(document).on('click', '.guideItem, .btnBanner, .mainV2-guideItem', function() {
    let id = $(this).attr('data-id');
    // init
    $('.tabArea li').removeClass("current");
    $(".tabCon").removeClass("current");

    $('.popupWrap').attr('aria-hidden', 'false');
    $('#' + id).attr('aria-hidden', 'false');
    $('body').addClass('popupView');

    $('.firstContent').addClass('current');
    $('.tabArea li:first-child').addClass('current');
});

$(document).on('click', '.btnPopClose', function() {
    document.activeElement.blur();
    $('body').removeClass('popupView');
    $('.popupWrap').attr('aria-hidden', 'true');
    $('.popContentWrap').attr('aria-hidden', 'true');
    $('.tabArea li').removeClass("current");
    $(".tabCon").removeClass("current");
    var tab_id = $(this).attr("data-tab");
    $("#" + tab_id).addClass("current");
})
/* //팝업 탭 */

$(document).ready(function () {

    /* 푸터 */
    $(".footerContent .btnMoreDetail").click(function () {
        $(".footerContent").removeClass("sub");
    });

    /** 팝업 닫기 버튼 **/
    $(".SYlayerPopupWrap .close").unbind("click").click(function() {
        if ($(this).attr("class").includes("decisionPopupReload")) {
            decisionPopupReload($(this));
        } else {
            document.activeElement.blur();
            $(".SYlayerPopupWrap").attr("aria-hidden", "true");
            $("body").removeClass("popupView");
        }
    });

    /** 영상 가이드 페이지 **/
    if ($(".video-guide").length == 1){
        /* 리스트 내 이벤트 */
        var vidCateTab = $(".video-guide-container .category-tab .btn");
        var vidSelectSection = $(".video-guide-container .list-section");
        var headerHeight = $("header").outerHeight();
        var vidExceptHeight = headerHeight + $(".video-guide .tab-wrap").outerHeight() + parseInt($("#wrap.headerFixed").css("padding-top"));
        // 탭 클릭 이벤트
        vidCateTab.each(function (q){
            $(this).click(function (){
                $("html, body").animate({
                    scrollTop: vidSelectSection.eq(q).offset().top - vidExceptHeight
                }, 200)
            })
        })
        //scroll 이벤트
        $(window).scroll(function (){
            if ($(window).scrollTop() >= $(".video-guide .headTitle").offset().top - 24){
                $(".video-guide .tab-wrap").addClass("fixed");
                $(".video-guide .tab-wrap").css({"top": headerHeight})
            }else{
                $(".video-guide .tab-wrap").removeClass("fixed");
                $(".video-guide .tab-wrap").css({"top": ""})
            }
            vidCateTab.each(function (q) {
                if (q == vidCateTab.length - 1) {
                    if ($(window).scrollTop() >= vidSelectSection.eq(q).offset().top - vidExceptHeight) {
                        if (!vidCateTab.eq(q).hasClass("active")) {
                            vidCateTab.removeClass("active");
                            vidCateTab.eq(q).addClass("active");
                        }
                    }
                } else {
                    if ($(window).scrollTop() >= vidSelectSection.eq(q).offset().top - vidExceptHeight && $(window).scrollTop() < vidSelectSection.eq(q+1).offset().top - vidExceptHeight) {
                        if (!vidCateTab.eq(q).hasClass("active")) {
                            vidCateTab.removeClass("active");
                            vidCateTab.eq(q).addClass("active");
                        }
                    }
                }
            })
        });

        /* 팝업 내 이벤트 */
        $(".video-guide-pop .list").click(function (){
            $(".video-guide-pop .list").removeClass("active");
            $(this).addClass("active");
            $(".video-guide-pop .video-title").text($(this).text())
        })
        /* // 팝업 내 이벤트 */
    }
    /** // 영상 가이드 페이지 **/
});
