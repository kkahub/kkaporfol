// 그리드 클레스
function TableGridAlign(selector, initArr, arr, callback) {
    this.$scrollGroup = null;
    this.$header = null;
    this.$body = null;

    this.arr = [];
    this.arrIndex = [];
    this.arrColumn = [];
    this.arrChange = [];
    this.initArr = [];

    this.$headFixed = null;
    this.$headFixedRow = null;
    this.$headFixedItem = null;
    this.$headScrolled = null;
    this.$headScrolledRow = null;
    this.$headItem = null;

    this.$bodyFixed = null;
    this.$bodyScrolled = null;
    this.$bodyItem = null;

    this.$gridAlign = null;
    this.$gridColumn = null;
    this.$ghostColumn = null;
    this.$pin = null;
    this.$btnView = null;

    this.$dragHSelector = null;

    this.$fixedColumn = null;
    this.$selectColumn = null;
    this.$selectBtnView = null;

    this.$btnClose = null;
    this.$btnAlign = null;
    this.$btnAlignReset = null;

    this.dragI = null;
    this.j = null;
    this.targetI = null;

    this.min = 0;
    this.baseline = 0;
    this.max = 0;

    this.dragColumnLength = null;
    this.cellLength = null;
    this.fixedLength = null;
    this.itemLength = null;

    this.fixedWidth = 0;

    this.scrollTop = 0;
    this.scrollLeft = 0;
    this.x = 0;

    this._initEvent(selector, initArr, arr, callback);
}
TableGridAlign.prototype._init = function (selector, initArr, arr) {
    this.$scrollGroup = document.getElementById(selector);
    this.$header = this.$scrollGroup.querySelector('.grid_header');
    this.$body = this.$scrollGroup.querySelector('.grid_body');
    this.$row = this.$body.querySelectorAll('.grid_row');

    this.$headFixed = this.$header.querySelector('.fixed_group');
    this.$headFixedRow = this.$headFixed.querySelector('.grid_row');
    this.$headFixedItem = this.$header.querySelectorAll('.fixed');
    this.$headScrolled = this.$scrollGroup.querySelector('.scrolled');
    this.$headScrolledRow = this.$headScrolled.querySelector('.grid_row');
    this.$headItem = this.$header.querySelectorAll('.grid_cell');

    this.$bodyFixed = this.$body.querySelector('.fixed_group');
    this.$bodyScrolled = this.$body.querySelector('.scrolled');
    this.$bodyItem = this.$body.querySelectorAll('.grid_cell');

    this.arr = arr;
    this.initArr = initArr;

    this.$gridAlign = $('#gridAlign');
    this.$ghostColumn = $('.ghost');
    this.$gridColumn = this.$gridAlign.find('.grid_column');
    this.$pin = this.$gridAlign.find('.btn_pin');
    this.$btnView = this.$gridAlign.find('.btn_view');
    this.$btnClose = $('.custom_report .close');
    this.$btnAlign = $('.btn_column_align');
    this.$btnAlignReset = $('.btn_align_reset');

    this.dragColumnLength = this.$gridColumn.length;
    this.cellLength = this.$headItem.length;
    this.fixedLength = this.$headFixedItem.length;
    this.itemLength = this.$bodyItem.length;
};
TableGridAlign.prototype._repeatInit = function () {
    this.$gridAlign = $('#gridAlign');
    this.$ghostColumn = $('.ghost');
    this.$gridColumn = this.$gridAlign.find('.grid_column');
    this.$pin = this.$gridAlign.find('.btn_pin');
    this.$btnView = this.$gridAlign.find('.btn_view');
    this.$btnAlign = $('.btn_column_align');
    this.$btnAlignReset = $('.btn_align_reset');

    this.dragColumnLength = this.$gridColumn.length;
    this.cellLength = this.$headItem.length;
    this.fixedLength = this.$headFixedItem.length;
    this.itemLength = this.$bodyItem.length;
};
TableGridAlign.prototype._cellCreat = function (arr) {
    $(this.$headScrolledRow).children().remove();

    // 사용자지정에 맞춰 넣기 전에 비우기
    while (this.$headFixedRow.lastChild) {
        this.$headFixedRow.removeChild(this.$headFixedRow.lastChild);
    }
    while (this.$headScrolledRow.lastChild) {
        this.$headScrolledRow.removeChild(this.$headScrolledRow.lastChild);
    }

    // 저장한 고정, 노출 여부 설정으로 셀 만들기
    var i = 0;
    do {
        if (arr[i].Fixed === true) {// 고정이면 무조건 보여야함
            $(this.$headFixedRow).append('<div style="width:' + arr[i].Width + 'px" class="grid_cell fixed" name=' + arr[i].Name + ' data-count=' + arr[i].Index + ' >' + arr[i].Title + '</div>');
        } else {
            if (arr[i].View === false) {// 고정이 아니고 숨기기
                $(this.$headScrolledRow).append('<div  style="display:none; width:' + arr[i].width + 'px;" class="grid_cell" name=' + arr[i].name + ' data-count=' + arr[i].index + '>' + arr[i].title + '</div>');
            } else { // 보이기
                $(this.$headScrolledRow).append('<div  style="width:' + arr[i].Width + 'px" class="grid_cell" name=' + arr[i].Name + ' data-count=' + arr[i].Index + '>' + arr[i].Title + '</div>');
            }
        }

        i++;
    } while (i < this.cellLength);

    this.fixedWidth = this.$headFixed.offsetWidth; // fixed로 셀을 보낸 후 fixed_group의 너비 계산
};
TableGridAlign.prototype._sortCreat = function (arr) {
    var i = 0, j = 0, k = 0;
    this.fixedLength = 0; // 갯수 초기화
    this.$gridColumn.remove(); // 시작 전에 비우기

    while (i < this.cellLength) { // 고정 개수 구하기
        if (arr[i].Fixed === true) this.fixedLength += 1;
        i++
    };

    k = this.fixedLength;

    while (j < this.fixedLength) { // 정렬바 중에 고정 부분 만들기
        this.$gridAlign.append('\
            <li class="grid_column fixed_column" draggable="false" data-column-index="'+ j + '">\
                <button class="btn_view on" type="button"></button>\
                '+ arr[j].Title + '\
                <button class="btn_pin fixed" type="button"></button>\
            </li>\
        ');
        j++;
    };

    while (k < this.cellLength) { //  정렬바 중에 유동 부분 보기/숨기기 만들기
        if (arr[k].View === false) {// 숨겨진 상태 정렬바
            this.$gridAlign.append('\
                <li class="grid_column grid_hide" draggable="true" data-column-index="'+ k + '">\
                    <button class="btn_view" type="button"></button>\
                    '+ arr[k].Title + '\
                    <button class="btn_pin" type="button"></button>\
                </li>\
            ');
        } else { // 보기 상태 정렬바
            this.$gridAlign.append('\
                <li class="grid_column" draggable="true" data-column-index="'+ k + '">\
                    <button class="btn_view on" type="button"></button>\
                    '+ arr[k].Title + '\
                    <button class="btn_pin" type="button"></button>\
                </li>\
            ');
        }
        k++
    };
};
TableGridAlign.prototype._viewCloumns = function () {
    var objThis = this,
        index;

    this.$btnView.off();

    this.$btnView.on('click', function () {
        index = objThis.$gridColumn.index($(this).parent());
        objThis.$selectColumn = objThis.$gridAlign.find('.grid_column:eq(' + index + ')');
        objThis.$selectBtnView = $(this);

        if (!$(this).hasClass('on')) {
            objThis.$selectBtnView.addClass('on');
            objThis.$selectColumn.removeClass('grid_hide');
        } else {
            if (!objThis.$selectColumn.hasClass('fixed_column')) { // 고정 안되어있으면
                objThis.$selectBtnView.removeClass('on');
                objThis.$selectColumn.addClass('grid_hide');
            }
        }
    });
};
TableGridAlign.prototype._pinFixed = function () {
    var objThis = this,
        index;

    this.$pin.off();

    this.$pin.on('click', function () {
        index = objThis.$gridColumn.index($(this).parent());

        if (!$(this).hasClass('fixed')) { // 고정하기
            index++
            if (index < 6) {// 5개 이하 일 때 고정
                objThis.$fixedColumn = objThis.$gridAlign.find('.grid_column:lt(' + index + ')');
                objThis.$selectBtnView = objThis.$gridAlign.find('.btn_view:lt(' + index + ')');

                objThis.$fixedColumn.attr('draggable', 'false'); // 드레그 기능 OFF

                objThis.$fixedColumn.addClass('fixed_column').removeClass('grid_hide');
                objThis.$selectBtnView.addClass('on');
                objThis.$fixedColumn.children('.btn_pin').addClass('fixed');
            } else {
                alert('고정은 5개 까지만 가능합니다.')
            }
        } else { // 고정 없애기
            if (index === 0) { // 첫아이템 고정 지우면 고정 모두 없애기
                objThis.$fixedColumn = objThis.$gridAlign.find('.grid_column');
            } else {
                objThis.$fixedColumn = objThis.$gridAlign.find('.grid_column:gt(' + (index - 1) + ')');
            }

            objThis.$fixedColumn.attr('draggable', 'true'); // 드레그 기능 ON

            objThis.$fixedColumn.removeClass('fixed_column');
            objThis.$gridColumn.eq(index).removeClass('fixed_column');
            objThis.$fixedColumn.children('.btn_pin').removeClass('fixed');
            objThis.$gridColumn.eq(index).children('.btn_pin').removeClass('fixed');
        }
    });
};
TableGridAlign.prototype._rowSetWidth = function () {
    var width = this.$header.offsetWidth - this.fixedWidth + "px",
        left = this.fixedWidth + "px";

    this.$headScrolled.style.width = width;
    this.$bodyScrolled.style.width = width;
    this.$headScrolled.style.left = left;
    this.$bodyScrolled.style.left = left;
};
TableGridAlign.prototype._titleStick = function () {
    var i = 0;

    if (this.$bodyItem.length > 0) {
        do {
            this.$bodyItem[i].setAttribute('title', this.$bodyItem[i].textContent.trim());
            i++;
        } while (i < this.itemLength);
    }
}
TableGridAlign.prototype._scrollContent = function () {
    var objThis = this;

    this.$bodyScrolled.onscroll = function () {
        objThis.$bodyFixed.style.top = -this.scrollTop + "px";
        objThis.$headScrolledRow.style.left = -this.scrollLeft + "px";
    }
}
TableGridAlign.prototype._dragIndexFind = function (t) {
    var i = this.dragColumnLength;

    do {
        if (this.$gridColumn[i] === t) return i;
    } while (i--);
};
TableGridAlign.prototype._limitMinMax = function (j) {
    this.min = this.$gridColumn.eq(j).offset().left - $(window).scrollLeft();
    this.baseline = this.min + this.$gridColumn.outerWidth() / 2;
    this.max = this.min + this.$gridColumn.outerWidth();
};
TableGridAlign.prototype._dragStart = function (e) {
    this.dragI = this._dragIndexFind(e.target); // 선택한 아이템 index 드래그 이벤트 동안 고정값
    this.j = this.dragI; // 옮겨질 위치 아이템 인덱스 값 - 처음은 선택한 아이템 위치
    this._limitMinMax(this.j); // 드래그 경계 min,baseline, max 값 왼쪽/오른쪽 구분 위해서
    this.$dragHSelector = this.$gridColumn.eq(this.dragI); // 드래드 선택한 헤더 엘레먼트 지정
    this.$ghostColumn.insertAfter(this.$dragHSelector); // 고스트컬럼을 선택한 아이템 바로 뒤로 옮겨오기
}
TableGridAlign.prototype._atPrevSort = function (j) {
    this.$ghostColumn.insertBefore(j);
    this.$dragHSelector.insertBefore(j);
}
TableGridAlign.prototype._atNextSort = function (j) {
    this.$ghostColumn.insertAfter(j);
    this.$dragHSelector.insertAfter(j);
}
TableGridAlign.prototype._dragEnter = function (e, t) {
    e.preventDefault();

    this.targetI = this.$gridColumn.index(t);
    if (this.targetI !== -1) this._limitMinMax(this.targetI); // 타겟이 컬럼이면 인덱스를 받아 min, baseline, max 설정
}
TableGridAlign.prototype._dragOver = function (e) {
    e.preventDefault();
    this.x = e.clientX;

    if (this.targetI !== -1) { // 타겟이 컬럼이면
        this.$dragHSelector.css('display', 'none'); // 선택 셀 숨김
        var targetIsPrev = this.targetI < this.dragI,
            targetIsNext = this.targetI > this.dragI;

        if (Math.floor(this.targetI / 4) !== Math.floor(this.dragI / 4)) {// 상하 이동일 때
            if (targetIsPrev) {
                this.j = $(e.target).index();
                this._atPrevSort(this.$gridColumn.eq(this.j));
            } else if (targetIsNext) {
                this.j = $(e.target).index();
                this._atNextSort(this.$gridColumn.eq(this.j));
            }
        } else if (Math.floor(this.targetI / 4) === Math.floor(this.dragI / 4)) {// 좌우 이동일 때
            if (targetIsPrev) {
                if (this.x < this.baseline) {// 타켓이 컬럼의 중앙을 넘어가면
                    this.j = $(e.target).index();
                    this._atPrevSort(this.$gridColumn.eq(this.j));
                }
            } else if (targetIsNext) {
                if (this.x > this.baseline) {// 타켓이 컬럼의 중앙을 넘어가면
                    this.j = $(e.target).index();
                    this._atNextSort(this.$gridColumn.eq(this.j));

                    if (this.dragI === this.j) {// 원 위치로 되돌아갈 때
                        this.j = this.dragI + 1;
                        this._atPrevSort(this.$gridColumn.eq(this.j));
                    }
                }
            }
        }
        if (this.j === this.dragColumnLength) {// 보내려는 위치가 마지막 일 때
            this.$dragHSelector.appendTo(this.$gridAlign);
        }

        this.$ghostColumn.css('display', 'inline-block');
    }
};
TableGridAlign.prototype._dragEnd = function (e, callback) {
    this.$dragHSelector.css('display', 'inline-block');
    this.$ghostColumn.css('display', 'none');

    callback();
};
TableGridAlign.prototype._dragAndDrop = function () {
    var objThis = this;

    this.$gridAlign.on('dragstart', function (e) {// ul 이벤트 안되게
        e.stopPropagation();
        e.preventDefault();
    });

    this.$gridAlign.children() // 드래그 할 때 마우스 모양 때문에 차일드로 접근
        .on("dragstart", function (e) {
            e.stopPropagation();

            if (!$(e.target).hasClass('fixed_column')) { // 타겟이 고정이 아니면 드래그 이벤트
                objThis._dragStart(e);
            }
        })
        .on("dragenter", function (e) {
            e.stopPropagation();

            objThis._dragEnter(e, e.target);
        })
        .on("dragover", function (e) {
            e.stopPropagation();

            if (!$(e.target).hasClass('fixed_column')) { // 타겟이 고정이 아니면 드래그 이벤트
                objThis._dragOver(e);
            }
        })
        .on("dragend", function (e) {
            e.stopPropagation();

            objThis._dragEnd(e.target, function () {
                objThis.$gridColumn = objThis.$gridAlign.find('.grid_column'); // 재정렬된 아이템으로 불러오기
                objThis._viewCloumns();
                objThis._pinFixed();
            });
        });
}
TableGridAlign.prototype._arrCreat = function (arr) {
    this.arrIndex = [];
    this.arrColumn = [];
    this.arrChange = [];
    this.arrChange = $.extend(true, {}, arr); // this.arr 객체 깊은 복사
    var $column,
        i = 0;

    do {
        $column = this.$gridColumn.eq(i);

        // 사용자 지정 순번
        this.arrIndex[i] = $column.data('columnIndex');

        //  사용자 지정 순서로 arrColumn에 넣기
        this.arrColumn[i] = this.arrChange[this.arrIndex[i]];

        // 객체 재정렬 후에 사용자 지정 값으로 변경
        ($column.hasClass('fixed_column')) ? this.arrColumn[i].Fixed = true : this.arrColumn[i].Fixed = false;
        ($column.children('.btn_view').hasClass('on')) ? this.arrColumn[i].View = true : this.arrColumn[i].View = false;

        i++;
    } while (i < this.dragColumnLength);
};
TableGridAlign.prototype._sortAlignSave = function () {
    this._cellCreat(this.arrColumn);
    this._rowSetWidth();

    $('.custom_report').hide();
}
TableGridAlign.prototype._initEvent = function (selector, initArr, arr, callback) {
    var objThis = this,
        initArrAfter = false;

    this._init(selector, initArr, arr);
    this._cellCreat(arr);
    this._sortCreat(arr);
    this._repeatInit();// 셀과 정렬바 생성 후 다시 초기화
    this._viewCloumns();
    this._pinFixed();
    this._rowSetWidth();
    this._titleStick();
    this._scrollContent();
    this._dragAndDrop();

    if (callback) callback();

    //  정렬 팝업 열릴 때 배열 만들기(맨 처음에 초기화 버튼 누른 후 그냥 닫기 했을 때 대비용)
    $('.btn_custom_report').on('click', function () {
        objThis._arrCreat(arr);
    });

    // 라인 마우스 오버
    $(this.$row)
        .on('mouseenter', function () {
            var index = $(this).index();
            $(this).closest('.grid_body').find('.fixed_group').find('.grid_row').eq(index).find('.grid_cell').css('background', '#f8fafa');
            $(this).closest('.grid_body').find('.scrolled').find('.grid_row').eq(index).find('.grid_cell').css('background', '#f8fafa');
        })
        .on('mouseleave', function () {
            var index = $(this).index();
            $(this).closest('.grid_body').find('.fixed_group').find('.grid_row').eq(index).find('.grid_cell').css('background', '#fff');
            $(this).closest('.grid_body').find('.scrolled').find('.grid_row').eq(index).find('.grid_cell').css('background', '#fff');
        });

    // 확인 누르기
    this.$btnAlign.on('click', function () {
        if (!initArrAfter) {
            objThis._arrCreat(arr);
            objThis._sortAlignSave();
        } else {
            objThis._arrCreat(objThis.initArr);
            objThis._sortAlignSave();
            initArrAfter = false;
        }
        callback();
    });

    // 초기화 누르기
    this.$btnAlignReset.on('click', function () {
        initArrAfter = true;
        objThis._sortCreat(objThis.initArr);
        objThis._repeatInit();// 셀과 정렬바 생성 후 다시 초기화
        objThis._viewCloumns();
        objThis._pinFixed();
        objThis._scrollContent();
        objThis._dragAndDrop();
    });

    // 닫기 누르기
    this.$btnClose.on('click', function () {
        if (initArrAfter) {
            initArrAfter = false;
            objThis._sortCreat(objThis.arrColumn);
            objThis._repeatInit();// 셀과 정렬바 생성 후 다시 초기화
            objThis._viewCloumns();
            objThis._pinFixed();
            objThis._scrollContent();
            objThis._dragAndDrop();

            $('.custom_report').hide();
        }
    });
}
