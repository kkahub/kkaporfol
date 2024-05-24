// 그리드 클레스
function TableGrid(selector) {
    this.$scrollGroup = null;
    this.$header = null;
    this.$body = null;

    this.$headFixed = null;
    this.$headScrolled = null;
    this.$headScrolledRow = null;

    this.$bodyFixed = null;
    this.$bodyFixedItem = null;
    this.$bodyScrolled = null;
    this.$bodyScrolledRow = null;
    this.$bodyItem = null;

    this.rowLength = null;
    this.itemLength = null;
    this.fixedLength = null;

    this.$fixedWidth = 0;

    this.scrollTop = 0;
    this.scrollLeft = 0;

    this._init(selector);
    this._initEvent();
}
TableGrid.prototype._init = function (selector) {
    this.$scrollGroup = document.getElementById(selector);
    this.$header = this.$scrollGroup.querySelector('.grid_header');
    this.$body = this.$scrollGroup.querySelector('.grid_body');

    this.$bodyItem = this.$body.querySelectorAll('.grid_cell');

    this.$headFixed = this.$header.querySelector('.fixed_group');
    this.$headScrolled = this.$scrollGroup.querySelector('.scrolled');
    this.$headScrolledRow = this.$headScrolled.querySelector('.grid_row');

    this.$bodyFixed = this.$body.querySelector('.fixed_group');
    this.$bodyFixedItem = this.$body.querySelectorAll('.fixed');
    this.$bodyScrolled = this.$body.querySelector('.scrolled');
    this.$bodyScrolledRow = this.$bodyScrolled.querySelectorAll('.grid_row');

    this.rowLength = this.$bodyScrolledRow.length;
    this.fixedLength = this.$bodyFixedItem.length;
    this.itemLength = this.$bodyItem.length;

    this.$fixedWidth = this.$headFixed.offsetWidth;
}
TableGrid.prototype._titleStick = function () {
    for (var i = 0; i < this.itemLength ; i++) {
        this.$bodyItem[i].setAttribute('title', this.$bodyItem[i].textContent.trim());
    }
}
TableGrid.prototype._rowSetWidth = function () {
    var width = this.$header.offsetWidth - this.$fixedWidth + "px",
        left = this.$fixedWidth + "px";

    this.$headScrolled.style.width = width;
    this.$bodyScrolled.style.width = width;
    this.$headScrolled.style.left = left;
    this.$bodyScrolled.style.left = left;
}
TableGrid.prototype._scrollContent = function () {
    var objThis = this;

    this.$bodyScrolled.onscroll = function () {
        objThis.$bodyFixed.style.top = -this.scrollTop + "px";
        objThis.$headScrolledRow.style.left = -this.scrollLeft + "px";
    }
}
TableGrid.prototype._initEvent = function () {
    this._titleStick();
    this._rowSetWidth();
    this._scrollContent();
}
