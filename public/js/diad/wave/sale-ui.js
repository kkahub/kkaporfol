// 사용자지정보기 버튼 모두 선택
function CustomAllBtnSelect(parent, middle) {
    this.$chkAll = null;
    this.$selectedChk = null;
    this.$targetChk = null;
    this.$sibilinsChk = null;

    this._init(parent, middle);
    this._initEvent(parent, middle);
}
CustomAllBtnSelect.prototype._init = function (parent, middle) {
    this.$chkAll = $('.full_chk .chk_all');
    this.$selectedChk = this.$chkAll.closest(parent).find(middle);
};
CustomAllBtnSelect.prototype._pieceSelect = function (selector, parent, middle) {
    this.$targetChk = $(selector);
    this.$chkAll = this.$targetChk.closest(parent).find('.chk_all');
    var chkLength = this.$targetChk.closest(parent).find(middle).find('.on').length,
        siblingsChkLength = this.$targetChk.closest(parent).find(middle).find('.btn_view').length;

    if (chkLength === siblingsChkLength) {
        this.$chkAll.prop('checked', true);
    } else {
        this.$chkAll.prop('checked', false);
    }
};
CustomAllBtnSelect.prototype._allSelect = function (selector, parent, middle) {
    this.$targetChk = $(selector).closest(parent).find(middle).find('.grid_column');

    if ($(selector).prop('checked') === true) {
        this.$targetChk.find('.btn_view').addClass('on');
        this.$targetChk.removeClass('grid_hide');
    } else {
        this.$targetChk.not('.fixed_column').find('.btn_view').removeClass('on');
        this.$targetChk.not('.fixed_column').addClass('grid_hide');
    }
};
CustomAllBtnSelect.prototype._initEvent = function (parent, middle) {
    var objThis = this;

    $('.btn_custom_report').on('click', function () {
        objThis._pieceSelect('.custom_report .btn_view', parent, middle);
    });
    this.$selectedChk.on('click', '.btn_view', function () {
        objThis._pieceSelect(this, parent, middle);
    });
    $(middle).on('click', '.btn_pin', function () {
        objThis._pieceSelect('.custom_report .btn_view', parent, middle);
    });
    this.$chkAll.on('click', function () {
        objThis._allSelect(this, parent, middle);
    });
};
