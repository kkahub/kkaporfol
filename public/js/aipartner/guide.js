/**
 *  퍼블리셔 전용 js 파일
 *  퍼블리셔 이외 수정 및 추가 금지
 */

var subScript = (function () {
  return {
    selectEvt: function () {
      //select custom
      let open = false;
      let selectChangeClass = ''
      $(document).on('click', '.select-div .select-info, .select-div .selectInfo, .select-box .select-info', function () {
        if ($(this).attr('aria-pressed') === 'true') {
          $(this).attr('aria-pressed', 'false')
          open = false;
        } else {
          if ($(this).hasClass('disabled')) return
          $(this).attr('aria-pressed', 'true')
          open = true;
        }

        // init class명 저장용
        selectChangeClass = $(this).siblings('.select-list').children('a[aria-selected=true]').attr('class')

        // 팝업 내 select 위치로 이동
        const popupContent = $(this).parents('.popupContent, .popup-content')
        if (popupContent.length > 0) {
          const scrollGap = 14
          const popContentHeight = popupContent.innerHeight()
          const popupScrollTop = popupContent.scrollTop()
          const selectHeight = $(this).innerHeight() + $(this).siblings('.select-list, .selectList').innerHeight()
          const selectTop = this.getBoundingClientRect().top + popupScrollTop - popupContent.offset().top
          const scrollBoundary = selectTop + selectHeight
          const scrollDistance = -popContentHeight + scrollBoundary + scrollGap

          if (popContentHeight <= scrollBoundary - popupScrollTop) {
            // 아래가 가릴 때
            popupContent.animate({ scrollTop: popupScrollTop + scrollDistance }, 300)
          } else if (popupScrollTop > selectTop) {
            // 위가 가릴 때
            popupContent.animate({ scrollTop: selectTop - scrollGap }, 300)
          }
        }
      })
      $('.select-div .select-list > a, .select-div .selectList > a, .select-box .select-list > a')
        .off('click')
        .on('click', function () {
          const selectList = $(this).closest('.selectList, .select-list')

          $(this).siblings('a').attr('aria-selected', 'false')
          $(this).attr('aria-selected', 'true')
          selectList.siblings('.select-info').attr('aria-pressed', 'false').removeClass(selectChangeClass).html($(this).html()).addClass($(this).attr('class')).html($(this).html())
          $(this).parents('.select-div, .select-box, .selectBox').addClass('on')
          open = false;

          if (selectList.hasClass('not-close')) {
            selectList.siblings('.select-info').attr('aria-pressed', 'true')
          }
        })
      $('body').on('click', function (e) {
        if (open) {
          if ($(e.target).parent('.select-list').hasClass('not-close')) {
            $(e.target).parents('.select-div').find('.selectInfo, .select-info').attr('aria-pressed', 'true')
          } else {
            if($(e.target).attr('aria-pressed') === undefined || $(e.target).closest('.select-info').attr('aria-pressed') === undefined || $(e.target).attr('aria-pressed') === 'false' || $(e.target).closest('.select-info').attr('aria-pressed') === 'false'){
              $('.select-div .select-info[aria-pressed="true"], .select-div .selectInfo[aria-pressed="true"], .select-box .select-info[aria-pressed="true"]').attr('aria-pressed', 'false')
            }
          }
        }

        // 홈 - 지역 선택 셀렉트박스
        if($(e.target).closest('.wrap-select-region').length === 0) {
            $('.btn-select-region').removeClass('active');
        }
      })
    },

    searchSelectEvt: function () {
      $('.search-select-wrap')
        .on('click', '.select-info', function () {
          $(this).parent().toggleClass('active')
        })
        .on('click', '.select-list > a', function () {
          $(this).parent().siblings('.select-info').html($(this).html())
          $(this).closest('.search-select-wrap').removeClass('active')
        })

      $('body').on('mousedown', function (e) {
        if ($(e.target).hasClass('.search-select-wrap') === false && $(e.target).closest('.search-select-wrap').length < 1) {
          $('.search-select-wrap').removeClass('active')
        }
      })
    },

    tabEvt: function () {
      //탭이벤트
      $(document).on('click', '.tab-btn-wrap .btn', function () {
        if ($(this).attr('aria-selected', 'false')) {
          $(this).siblings().attr('aria-selected', 'false')
          $(this).attr('aria-selected', 'true')
        }

        if ($(this).parents('.tab-container').length > 0) {
          var presentIndex = $(this).index()
          $(this).parents('.tab-container').find('.tab-content').eq(presentIndex).siblings('.tab-content').attr('aria-hidden', 'true')
          $(this).parents('.tab-container').find('.tab-content').eq(presentIndex).attr('aria-hidden', 'false')
        }
      })
    },

    accorEvt: function () {
      //아코디언 이벤트
      $(document).on('click', '.accor-div .open', function () {
        //아코디언 이벤트, each클래스 있을시 다른 아코디언과 관계 없이 움직임. each클래스 없을시 다른 아코디언 열릴시 닫힘.
        if (!$(this).parents('.list').hasClass('on')) {
          if (!$(this).parents('.accor-div').hasClass('each')) {
            $(this).parents('.accor-div').find('.list').removeClass('on')
            $(this).parents('.accor-div').find('.list .close').stop(true, true).slideUp(300)
          }
          $(this).parents('.list').addClass('on')
          $(this).parents('.list').find('.close').stop(true, true).slideDown(300)
        } else {
          $(this).parents('.list').removeClass('on')
          $(this).parents('.list').find('.close').stop(true, true).slideUp(300)
        }
      })

      $(document).on('click', '.list-wrap .list .open-items', function () {
        $(this).find('i').toggleClass('icon-top')
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).find('i').removeClass('icon-top')
          $(this).parents('.list-wrap').find('.hidden-items').stop(true, true).slideUp(300)
        } else {
          $(this).addClass('on')
          $(this).find('i').addClass('icon-top')
          $(this).parents('.list-wrap').find('.hidden-items').stop(true, true).slideDown(300)
        }
      })
    },

    detailsAccorEvt: function () {
      // 아코디언 이벤트 - details tag
      $('.wrap-details-accor .details-tit').on('click', function () {
        const $items = $(this).parent().siblings().not($(this))
        $items.removeAttr('open')
      })
    },

    scrollEvt: function () {
      $(window).scroll(function () {
        const scrollTop = $(this).scrollTop()

        if ($('.contract-container').length > 0) {
          var contractContainer = $('.contract-container')
          var contract = contractContainer.find('.content-wrap')
          var tabBtn = contract.find('.tab-btn-wrap .btn')
          var tabBtnActive = contract.find('.tab-btn-wrap .btn[aria-selected=true]')

          if (contractContainer.find('.tab-container').length > 0) {
            if (scrollTop == $(document).height() - $(window).height() && tabBtnActive.index() < tabBtn.length - 1) {
              tabBtnActive.next().click()
              $(this).scrollTop(0)
            }
          }

          if (contractContainer.find('.floating-remote-wrap').length > 0) {
            var remoteBtn = contractContainer.find('.floating-remote-wrap')
            var remoteBtnTop
            var remoteBtnLeft = contract.offset().left - 16
            var changePoint

            changePoint = contract.offset().top - $('header').outerHeight()
            remoteBtnTop = $('header').outerHeight() + 60

            if (scrollTop > changePoint) {
              remoteBtn.addClass('fixed')
              remoteBtn.css({
                position: 'fixed',
                top: remoteBtnTop,
                left: remoteBtnLeft,
              })
            } else {
              remoteBtn.removeClass('fixed')
              remoteBtnTop = contract.offset().top - contractContainer.offset().top + 60
              remoteBtn.css({
                position: '',
                top: remoteBtnTop,
                left: '',
              })
            }
          }
        }

        if ($('.ai-album .onboarding.free').length > 0) {
          var startBtn = $('.start-btn')
          var headerH = $('header').outerHeight()
          if (scrollTop + headerH + startBtn.outerHeight() > $('.onboarding .box').offset().top) {
            if (scrollTop > $('footer').offset().top - $(window).height() - 62) {
              startBtn.removeClass('fixed')
              startBtn.css({
                bottom: 'unset',
                top: $('footer').offset().top - $(window).height() / 2 + startBtn.outerHeight() + 62,
              })
            } else {
              startBtn.addClass('fixed')
              startBtn.css({ bottom: '', top: 'unset' })
            }
          } else {
            startBtn.removeClass('fixed')
          }
        }

        // 집찍고 유료 온보딩 버튼
        if ($('.ai-album .onboarding .apply-btn').length > 0) {
          const applyBtnPosition = $('.ai-album .onboarding .wrap-start-btn').offset().top
          const actionPosition = applyBtnPosition - $(window).height()

          if (scrollTop > actionPosition) {
            $('.ai-album .onboarding .apply-btn').removeClass('fixed')
          } else {
            $('.ai-album .onboarding .apply-btn').addClass('fixed')
          }
        }
      })
      $(window).scroll()
    },

    etcEvt: function () {
        function updateLabelRoleState($radio) {
            const $radioBox = $radio.closest('.radioBox');
            const $labelRole = $radioBox.find('.label-role-div');

            if ($radio.prop('checked')) {
                $labelRole.removeClass('disabled');
            } else {
                $labelRole.addClass('disabled');
            }
        }

        // 초기 상태 반영
        $('.radioBox input[type=radio]').each(function () {
            updateLabelRoleState($(this));
        });

        // label-role-div 클릭 시 해당 라디오 선택
        $('.radioBox .label-role-div').on('click', function () {
            const $radio = $(this).closest('.radioBox').find('input[type=radio]');
            $radio.prop('checked', true).trigger('change');
        });

        // 라디오 버튼 클릭 시 label-role-div 상태 갱신
        $('.radioBox input[type=radio]').on('change', function () {
            $('.radioBox input[type=radio]').each(function () {
                updateLabelRoleState($(this));
            });
        });

      $('.date-select-div .date-select-btn').click(function () {
        dateRangeCalendar($(this))
      })

      // 화살표 있는 sort 버튼 방향 변경
      $('.sort-btn').click(function () {
        if ($(this).attr('aria-pressed') == 'true') {
          $(this).attr('aria-pressed', 'false')
        } else {
          $(this).attr('aria-pressed', 'true')
        }
      })

      // 계약관리 상세 내 리모트 플로팅 버튼
      if ($('.contract-container').find('.floating-remote-wrap').length > 0) {
        var contractContainer = $('.contract-container')
        var contract = contractContainer.find('.content-wrap')
        var remoteBtn = contractContainer.find('.floating-remote-wrap')
        var remoteBtnTop
        remoteBtnTop = contract.offset().top - contractContainer.offset().top + 60
        remoteBtn.css({ top: remoteBtnTop })
        $(window).resize(function () {
          if (remoteBtn.hasClass('fixed')) {
            var remoteBtnLeft = contract.offset().left - 16
            remoteBtn.css({ left: remoteBtnLeft })
          }
        })
      }

      // 사진첩
      if ($('.content.ai-album').length > 0) {
        var container = $('.content.ai-album')
        //  사진첩 아코디언
        var accorSection = $('.accor-section')
        accorSection.each(function () {
          var open = $(this).find('.list-open')
          var content = $(this).find('.list-div')
          open.click(function () {
            if (accorSection.hasClass('on')) {
              accorSection.removeClass('on')
              content.stop(true, true).slideUp(300)
              open.find('span').text('목록 펼침')
            } else {
              accorSection.addClass('on')
              content.stop(true, true).slideDown(300)
              open.find('span').text('목록 접힘')
            }
          })
        })

        var viewType = $('.content.ai-album .view-type-btn')
        viewType.click(function () {
          var type = $(this).attr('aria-label')
          viewType.attr('aria-selected', 'false')
          $(this).attr('aria-selected', 'true')
          container.find('.content-wrap').attr('class', 'content-wrap').addClass(type)
          if (type == 'type-table') {
            $('.gridDate').attr('style', 'display: none !important')
            $('.tableDate').css('display', 'block')
            $(this).parents('.view-type').find('.sorting-select').hide()
          } else {
            $('.gridDate').css('display', 'block')
            $('.tableDate').attr('style', 'display: none !important')
            $(this).parents('.view-type').find('.sorting-select').show()
          }
        })

        // 사진첩 폴더 셀렉트 박스
        $('.view-folder').click(function () {
          if ($(this).attr('aria-pressed') == 'true') {
            $(this).attr('aria-pressed', 'false')
          } else {
            $(this).attr('aria-pressed', 'true')
          }
        })
        $('body').on('click', function (e) {
          if ($(e.target).parents('.view-folder').length < 1 && $('.view-folder').attr('aria-pressed', 'true')) {
            $('.view-folder').attr('aria-pressed', 'false')
          }
        })

        // 폴더 depth accordian
        $('.folder-list').click(function () {
          $(this).toggleClass('on')
          $(this).parent('.list').next('.list-wrap').stop(true, true).slideToggle(300)
          // alert();
        })
      }

      // footer
      $('.footerContent .btnMoreDetail')
        .off('click')
        .click(function () {
          $('.footerContent').removeClass('sub')
        })

      //textarea
      $('.textarea-div').click(function () {
        if (!$(this).hasClass('on')) {
          $(this).find('textarea').focus()
        }
      })
      $('.textarea-div textarea').focus(function () {
        $(this).parents('.textarea-div').addClass('on')
      })
      $('.textarea-div textarea').blur(function () {
        $(this).parents('.textarea-div').removeClass('on')
      })

      if ($('.contract-paper').length > 0) {
        var $textareas = $('.textarea-div textarea')
        $textareas.each(function () {
          // to avoid the shrinking

          var row = $(this).attr('rows')
          if (row === undefined) {
            row = 1
          }
          this.style.minHeight = Number(row) * 18 + 'px'
          this.style.height = this.scrollHeight + 'px'
        })

        $textareas.on('input', function () {
          this.style.height = ''
          this.style.height = this.scrollHeight + 'px'
        })
      }

      //인풋 password view
      $('.input-form .input-area').each(function () {
        if ($(this).hasClass('pw-view')) {
          $(this)
            .find('.view')
            .click(function () {
              if (!$(this).hasClass('on')) {
                $(this).addClass('on')
                $(this).parents('.input-area').find('input').attr('type', 'text')
              } else {
                $(this).removeClass('on')
                $(this).parents('.input-area').find('input').attr('type', 'password')
              }
            })
        }
      })

      //input X버튼
      var isMouseCheck = new Array()
      $(document).on('click', '.clear-has input', function () {
        if ($(this).val() != '') {
          $(this).parents('.clear-has').find('.delete').show()
        }
      })
      $(document).on('keyup', '.clear-has input', function () {
        if ($(this).val() == '') {
          $(this).parents('.clear-has').find('.delete').hide()
        } else {
          $(this).parents('.clear-has').find('.delete').show()
        }
      })
      $(document).on('click', '.clear-has .delete', function () {
        $(this).parents('.clear-has').find('input').val('')
        $(this).parents('.clear-has').find('input').removeClass('on')
        $(this).parents('.clear-has').find('.delete').hide()
        $(this).parents('.clear-has').find('input').focus()
      })

      $(document).on('mouseenter', '.clear-has', function () {
        isMouseCheck[$('.clear-has').index(this)] = true
      })
      $(document).on('mouseleave', '.clear-has', function () {
        isMouseCheck[$('.clear-has').index(this)] = false
      })

      $(document).on('focusout', '.clear-has', function () {
        if (!isMouseCheck[$('.clear-has').index(this)]) {
          $(this).find('.delete').hide()
        }
      })

      // tooltip 닫기
      $('.tooltip .x-btn').click(function () {
        $(this).parents('.tooltip').hide()
      })

      var tooltipDiv = $('.tooltip-div.clickable')
      var viewTooltip = tooltipDiv.find('.view-tooltip')
      var closeTooltip = tooltipDiv.find('.close-btn')
      tooltipDiv.each(function () {
        viewTooltip.click(function () {
          tooltipDiv.removeClass('on')
          $(this).parents(tooltipDiv).toggleClass('on')
        })
        closeTooltip.click(function () {
          tooltipDiv.removeClass('on')
        })
      })
      $('body').click(function (e) {
        if (tooltipDiv.hasClass('on') && $(e.target).parents('.tooltip-div').length < 1) {
          tooltipDiv.removeClass('on')
        }
      })
    },

    chkEvt: function () {
      //전체체크 이벤트
      $(document).on('change', '.all-chk-wrap input[type=checkbox]', function () {
        //     $(".all-chk-wrap input[type=checkbox]").on("change", function(){ //전체체크에 해당되는 체크 class
        var check = $(this).prop('checked')
        //전체 체크
        if ($(this).hasClass('check-all')) {
          $(this).parents('.all-chk-wrap').find('[type=checkbox][name=checkItem]').prop('checked', check)
          //단일 체크
        } else {
          var all = $(this).parents('.all-chk-wrap').find('.check-all')
          var len = $(this).parents('.all-chk-wrap').find('[type=checkbox][name=checkItem]').not('.check-all').length
          var ckLen = $(this).parents('.all-chk-wrap').find('[type=checkbox][name=checkItem]:checked').not('.check-all').length
          if (len == ckLen) {
            $(all).prop('checked', true)
          } else {
            $(all).prop('checked', false)
          }
        }

        // e집찍고 - 사진 선택갯수 element check
        if ($('#selCnt')) {
          let cnt = $('input[name="checkItem"]:checked').length
          $('#selCnt').html(cnt)
          if (cnt == 0) {
            $('.select-summary').css('display', 'none')
          } else {
            $('.select-summary').css('display', 'block')
          }
        }
      })
    },
  }
})()

$(document).ready(function () {
  subScript.selectEvt()
  subScript.searchSelectEvt()
  subScript.tabEvt()
  subScript.accorEvt()
  subScript.detailsAccorEvt()
  subScript.scrollEvt()
  subScript.etcEvt()
  subScript.chkEvt()
})

/*--------- 로딩 이벤트 ---------*/
function showLoader() {
  const container = document.createElement('div')
  container.setAttribute('id', 'Ai_loader_container')
  const childContainer = document.createElement('div')
  childContainer.setAttribute('class', 'Ai_loader')
  container.appendChild(childContainer)
  document.body.appendChild(container)
}

function closeLoader() {
  const removeContainer = document.querySelector('#Ai_loader_container')
  if (removeContainer) {
    document.body.removeChild(removeContainer)
  }
}
/*--------- //로딩 이벤트 ---------*/

/*--------- 알럿 이벤트 ---------*/
function SYalertMessage(sy_text) {
  $('.SYalertLayerWrap').remove()
  $('body').append(`
        <div class='SYalertLayerWrap'>
            <div class='alertContentWrap'>
                <a href='javascript:;' class='close'><i class='SYicon'></i></a>
                <div class='alertContent'>${sy_text}</div>
                <div class='buttonWrap'>
                <button type='button' class='check'>확인</button></div>
            </div>
        </div>
    `)
  $('.SYalertLayerWrap .check, .SYalertLayerWrap .close')
    .unbind('click')
    .click(function () {
      $('.SYalertLayerWrap').remove()
    })
}
function SYalertIconMessage(sy_type, sy_text) {
  $('.SYalertLayerWrap').remove()
  $('body').append(`
        <div class='SYalertLayerWrap'>
            <div class='alertContentWrap'>
                <a href='javascript:;' class='close'><i class='SYicon'></i></a>
                <div class='alertContent'><i class='SYicon ${sy_type}'></i>
                    ${sy_text}
                </div>
                <div class='buttonWrap'>
                <button type='button' class='check'>확인</button></div>
            </div>
        </div>
    `)
  $('.SYalertLayerWrap .check, .SYalertLayerWrap .close')
    .unbind('click')
    .click(function () {
      $('.SYalertLayerWrap').remove()
    })
}
function SYcheckMessage(sy_text) {
  $('.SYalertLayerWrap').remove()
  $('body').append(`
        <div class='SYalertLayerWrap'>
            <div class='alertContentWrap'>
                <a href='javascript:;' class='close'><i class='SYicon'></i></a>
                <div class='alertContent'>${sy_text}</div>
                <div class='buttonWrap'>
                    <button type='button' class='verify'>확인</button>
                </div>
            </div>
        </div>
    `)
  $('.SYalertLayerWrap .verify, .SYalertLayerWrap .close')
    .unbind('click')
    .click(function () {
      $('.SYalertLayerWrap').remove()
    })
}
function SYcheckIconMessage(sy_type, sy_text) {
  $('.SYalertLayerWrap').remove()
  $('body').append(`
        <div class='SYalertLayerWrap'>
            <div class='alertContentWrap'>
                <a href='javascript:;' class='close'><i class='SYicon'></i></a>
                    <div class='alertContent'><i class='SYicon ${sy_type}'></i>${sy_text}</div>
                    <div class='buttonWrap'><button type='button' class='verify'>확인</button>
                </div>
            </div>
        </div>
    `)
  $('.SYalertLayerWrap .verify, .SYalertLayerWrap .close')
    .unbind('click')
    .click(function () {
      $('.SYalertLayerWrap').remove()
    })
}

function commonAlertMsg(title, type, txt, txt2, subtxt, noId, noBtn, okID, okBtn) {
  //팝업타이틀, 아이콘타입, 큰텍스트, 기본텍스트, 서브텍스트(red), 버튼(취소 id/닫기 텍스트/확인 id/확인 텍스트)
  $('.alert-popup').remove()
  $('body').append(`
        <div class='popup-layer-wrap alert-popup'>
            <div class='popup-content-wrap'>
                <div class='popup-content'>
                    <i class='p-icon ${type}'></i>
                    <p class='b-txt'>${txt}</p>
                    <p class='txt'>${txt2}</p>
                    <p class='sub-txt'>${subtxt}</p>
                </div>
                <div class='popup-button-wrap lg'>
                    <button type='button' class='check' id='${noId}'>${noBtn}</button>
                    <button type='button' class='verify' id='${okID}'>${okBtn}</button>
                </div>
            </div>
        </div>
    `)
  $('.alert-popup')
    .find('.check,.close')
    .unbind('click')
    .click(function () {
      $(this).parents('.alert-popup').remove()
    })
  if (txt == undefined || txt == '') {
    $('.alert-popup .popup-content .b-txt').remove()
  }
  if (subtxt == undefined || subtxt == '') {
    $('.alert-popup .popup-content .sub-txt').remove()
  }
  if (noBtn == undefined || noBtn == '') {
    $('.alert-popup .popup-button-wrap .check').remove()
  }
  if (okBtn == undefined || okBtn == '') {
    $('.alert-popup .popup-button-wrap .verify').remove()
  }
  if (title == undefined || title == '') {
    $('.alert-popup .popup-header .p-title').remove()
    $('.alert-popup .popup-content-wrap').addClass('no-title')
  }
  if (type == undefined || type == '') {
    $('.alert-popup .popup-content-wrap .popup-content .p-icon').remove()
    if (title == undefined || title == '') {
      $('.alert-popup .popup-header .p-title').remove()
      $('.alert-popup .popup-content-wrap').removeClass('no-title')
    }
  }
}

function commonAlert({ title = '', msg = '', btnClose = '확인', className = '', idName = '' }) {
  $('body').append(`
        <div class="wrap-alert${' ' + className}">
            <div class="alert-inner">
                <div class="alert-header">
                    <h2 class="title">${title}</h2>
                </div>
                <div class="alert-content">
                    ${msg !== '' ? `<p class="alert-msg">${msg}</p>` : ''}
                </div>
                <div class="alert-footer">
                    <button type="button" class="btn-close"${idName != '' ? ' id="' + idName + '"' : ''}>${btnClose}</button>
                </div>
            </div>
        </div>
    `)
  $('.wrap-alert').on('click', '.btn-close', function () {
    $(this).off('click')
    $('.wrap-alert').remove()
  })
}

function commonComfirm({ title = '', msg = '', btnClose = '취소', btnComfirm = '확인', className = '', idName = '' }) {
  $('body').append(`
        <div class="wrap-confirm${' ' + className}">
            <div class="confirm-inner">
                <div class="confirm-header">
                    <h2 class="title">${title}</h2>
                </div>
                <div class="confirm-content">
                    <p class="confirm-msg">${msg}</p>
                </div>
                <div class="confirm-footer">
                    <button type="button" class="btn btn-close">${btnClose}</button>
                    <button type="button" class="btn btn-confirm"${idName != '' ? ' id="' + idName + '"' : ''}>${btnComfirm}</button>
                </div>
            </div>
        </div>
    `)
  $('.wrap-confirm').on('click', '.btn-close', function () {
    $(this).off('click')
    $('.wrap-confirm').remove()
  })
}

function layerPopup(popName, title) {
  $('body').addClass('popupView')
  $('.layer-popup.' + popName).css('display', 'block')
  $('.popup-layer-wrap.' + popName).show()
  $('.' + popName).addClass('popup-layer-wrap')
  $('body').append($('.' + popName))
  $('.' + popName + ' .popup-content-wrap').prepend(`
        <div class='popup-header'>
            <p class='p-title'>${title}</p>
            <a href='javascript:;' class='close'></a>
        </div>
    `)

  if (title == undefined || title == '') {
    $('.popup-header .p-title').remove()
    $('.' + popName)
      .find('.popup-content-wrap')
      .addClass('no-title')
  }

  $('.popup-layer-wrap.' + popName + ' .close, .popup-layer-wrap.' + popName + ' .close-btn')
    .unbind('click')
    .click(function () {
      $(this)
        .parents('.' + popName)
        .removeClass('popup-layer-wrap')
      $(this)
        .parents('.layer-popup.' + popName)
        .css('display', 'none')
      $(this)
        .parents('.layer-popup.' + popName)
        .find('.popup-header')
        .remove()
      $('body').removeClass('popupView')
    })

  var swiperPop = $('.' + popName + '.swiper-popup')
  var swiperPrevBtn = swiperPop.find('.swiper-button-prev')
  var swiperNextBtn = swiperPop.find('.swiper-button-next')
  if (swiperPop.length > 0) {
    var swiperPopup = new Swiper('.swiper-popup .swiper-container', {
      slidesPerView: 1,
      observer: true,
      observeParents: true,
      navigation: {
        prevEl: swiperPrevBtn,
        nextEl: swiperNextBtn,
      },
      on: {
        slideChange: function () {
          title = $('.swiper-slide').eq(this.realIndex).attr('aria-label')
          $('.swiper-popup .popup-header .p-title').text(title)
          var prevTitle = $('.swiper-slide')
            .eq(this.realIndex - 1)
            .attr('aria-label')
          var nextTitle = $('.swiper-slide')
            .eq(this.realIndex + 1)
            .attr('aria-label')
          swiperPrevBtn.find('.tooltip').text(prevTitle)
          swiperNextBtn.find('.tooltip').text(nextTitle)
        },
      },
    })
  }
}

function newLayerPopup(popName, title = '') {
  $('.popup-layer-bold.' + popName).css('display', 'block')
  $('.popup-layer-bold.' + popName).addClass('dim')
  $('body').append($('.' + popName))

  if (title == undefined || title == '') {
    // 팝업 타이틀 영역 없이 이미지 팝우일 경우
    $('.' + popName + ' .popup-inner').prepend(`
        <div class='popup-header'>
            <a href='javascript:;' class='close'></a>
        </div>
    `)
  } else {
    $('.' + popName + ' .popup-inner').prepend(`
        <div class='popup-header'>
            <div class='headline'><p class='title'>${title}</p></div>
            <a href='javascript:;' class='close'></a>
        </div>
    `)
  }

  $('.' + popName + ' .btn-close, .' + popName + ' .close')
    .off('click')
    .on('click', function () {
      $(this)
        .parents('.' + popName)
        .removeClass('dim')
      $(this)
        .parents('.' + popName)
        .css('display', 'none')
      $(this)
        .parents('.' + popName)
        .find('.popup-header')
        .remove()
    })
}

function newlayerPopupClose(popName) {
  $(`.${popName}`).removeClass('dim')
  $(`.${popName}`).css('display', 'none')
  $(`.${popName}`).find('.popup-header').remove()
}

/*--------- //알럿 이벤트 ---------*/
$(document).ready(function () {
  /* 헤더 */
  $('header .menu-wrap').hover(
    function () {
      $('header .sub-menu-wrap').addClass('active')
    },
    function () {
      $('header .sub-menu-wrap').removeClass('active')
    },
  )

  $('header .user, header .alarm')
    .unbind('click')
    .click(function () {
      $(this).siblings('a').attr('aria-pressed', 'false')
      if ($(this).attr('aria-pressed') == 'true') $(this).attr('aria-pressed', 'false')
      else $(this).attr('aria-pressed', 'true')
      $('.gnbButton').attr('aria-pressed', 'false')
    })

  var $headerTooltips = $('header .family-service .tooltip')
  var currentIndex = 0
  var tooltipInterval

  function startTooltipAnimation() {
    tooltipInterval = setInterval(function () {
      $headerTooltips.eq(currentIndex).fadeOut(500, function () {
        currentIndex = (currentIndex + 1) % $headerTooltips.length
        $headerTooltips.eq(currentIndex).fadeIn(500)
      })
    }, 10000)
  }

  function stopTooltipAnimation() {
    $headerTooltips.hide()
    clearInterval(tooltipInterval)
  }

  $headerTooltips.hide().eq(currentIndex).show()

  startTooltipAnimation()

  $('.site').hover(
    function () {
      stopTooltipAnimation()
      $(this).find('.tooltip').show()
    },
    function () {
      $headerTooltips.hide()
      startTooltipAnimation()
    },
  )

  // 회원 정보 마우스 아웃 닫기 && 알림 마우스 아웃 닫기
  $('html').on('click', function (e) {
    const $target = $(e.target)
    if ($target.parents('.alarm').length < 1 && $target.parents('.alarmLayerWrap').length < 1 && !$target.hasClass('alarm')) {
      $('header .alarm').attr('aria-pressed', 'false')
    }
    if ($target.parents('.user').length < 1 && $target.parents('.userLayerWrap').length < 1 && !$target.hasClass('user')) {
      $('header .user').attr('aria-pressed', 'false')
    }
  })
  /* // 헤더 */

  //로딩 화면 확인용
  $('.btn-loading')
    .unbind('click')
    .click(function () {
      showLoader()
    })

  $('.category-tab').each(function () {
    $(this)
      .find('.btn')
      .click(function () {
        if (!$(this).hasClass('active')) {
          $(this).siblings('.btn').removeClass('active')
          $(this).addClass('active')
        }
      })
  })

  /* 매물진단 결과보고서 */
  var leftMenu = $('.report-container nav li'),
    contents = $('.report-container .accor-div .list.has-menu'),
    progressbar = $('.report-container .progress-bar'),
    headerH = Math.round($('.safe-report-content .header').outerHeight())

  leftMenu.on('click', 'a', function (e) {
    var $target = $(this).parent(),
      idx = $target.index(),
      section = contents.eq(idx),
      offsetTop = section.offset().top
    $('html, body')
      .stop()
      .animate({ scrollTop: offsetTop - headerH }, 800)
    return false
  })

  $(window).scroll(function () {
    var scltop = $(window).scrollTop()

    $.each(contents, function (idx) {
      var target = contents.eq(idx),
        targetTop = target.offset().top

      var sectionHeight = target.outerHeight()

      var progress = 0
      if (targetTop <= scltop + headerH + 1 && scltop <= targetTop + sectionHeight) {
        leftMenu.attr('aria-pressed', 'false')
        leftMenu.eq(idx).attr('aria-pressed', 'true')

        progress = ((scltop - targetTop + headerH) / sectionHeight) * 100
        progress = Math.min(100, Math.max(0, progress))
      }
      if (scltop == 0) {
        leftMenu.attr('aria-pressed', 'false')
      }

      leftMenu
        .eq(idx)
        .find(progressbar)
        .css('width', progress + '%')
    })

    leftMenu.each(function (idx) {
      if ($(this).attr('aria-pressed') === 'false') {
        $(this).find(progressbar).css('width', '0%')
      }
    })
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      leftMenu.attr('aria-pressed', 'false')
      /*
            var lastIdx = contents.length - 1;
            leftMenu.eq(lastIdx).find(progressbar).css("width", "100%");
            */
    }
  })
  $('.open-memo').click(function () {
    if ($(this).hasClass('on')) {
      $(this).removeClass('on')
    } else {
      $(this).addClass('on')
    }
  })

  $('.memo-tooltip .close').click(function () {
    var memoBtn = $(this).parents('.memo-tooltip').prev('.open-memo')
    if (memoBtn.hasClass('on')) {
      memoBtn.removeClass('on')
    }
  })

  $('.toastPopup .close').click(function () {
    $(this).parents('.toastPopup').attr('aria-hidden', 'true')
  })

  $('.promotion-popup .close').click(function () {
    $(this).parents('.promotion-popup').attr('aria-hidden', 'true')
  })
})
