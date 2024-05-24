// 그리드 클레스
function TableGrid(selector, widthArr) {
    this.$scrollGroup = null;
    this.$header = null;
    this.$body = null;

    this.$gridScrolled = null;
    this.$gridRow = null;
    this.$gridItem = null;

    this.$headerItem = null;
    this.$headerFixedItem = null;

    this.$bodyItem = null;
    this.$scrolledItem = null;

    this.itemLength = null;

    this.rowLeft = 0;
    this.fixedItemLeft = 0;
    this.rowWidth = 0;
    this.$fixedWidth = 0;
    this.fullLeft = 0;

    this._init(selector);
    this._initEvent(widthArr);
}
TableGrid.prototype._init = function (selector) {
    this.$scrollGroup = $(selector);
    this.$header = this.$scrollGroup.children('.grid_header');
    this.$body = this.$scrollGroup.children('.grid_body');

    this.$gridScrolled = this.$scrollGroup.find('.scrolled');
    this.$gridRow =  this.$gridScrolled.find('.grid_row');

    this.$headerItem =  this.$header.find('.grid_cell');
    this.$headerFixedItem =  this.$header.find('.fixed');

    this.$bodyItem =  this.$body.find('.grid_cell');
    this.$scrolledItem =  this.$body.find('.scrolled');

    this.itemLength = this.$gridRow.length;

    this.rowLeft = 0;
    this.fixedItemLeft = 0;
    this.rowWidth = 0;
    this.$fixedWidth = 0;
}
TableGrid.prototype._titleStick = function (){
    this.$bodyItem.each(function(){
        $(this).attr('title', $(this).text());
    });
}
TableGrid.prototype._fixedCreat = function () {
    var objThis = this;

    this.$scrollGroup.children().prepend('<div class="fixed_group"></div>');

    this.$header.find('.fixed_group').append('<div class="grid_row"></div>')

    for (var i = 0 ;  i < objThis.$scrolledItem.find('.grid_row').length ; i++) {
        objThis.$body.find('.fixed_group').append('<div class="grid_row"></div>')
    }
}
TableGrid.prototype._cellSetWidth = function (arr, rowWidth) {
    for (var i = 0 ; i < this.itemLength ; i++) {
        this.$gridItem = this.$gridRow.eq(i).find('.grid_cell');

        for (var j = 0 ; j < this.itemLength ; j++) {
            this.$gridItem.eq(j).css('width', arr[j]);
        }

        this.rowWidth += arr[i];
    }
    rowWidth();
}
TableGrid.prototype._rowSetWidth = function () {
    this.$headerFixedItem = this.$header.find('.fixed');

    for (var i = 0 ; i < this.$headerFixedItem.length ; i++) {
        if( this.$headerFixedItem.eq(i).css('display') != 'none' ){
            this.$fixedWidth += this.$headerFixedItem.eq(i).outerWidth();
        }
    }

    // this.$gridRow.css('width',this.rowWidth - this.$fixedWidth); // 그리드row 너비 계산
    this.$gridScrolled.css('width',this.$header.outerWidth() - this.$fixedWidth);
}
TableGrid.prototype._fixedSend = function(){
    var fixedBreak = this.itemLength  - 1;

    for (var i = 0 ; i < this.$gridRow.length ; i++) {
        this.$headerFixedItem =  this.$gridRow.eq(i).find('.fixed');

        for (var j = 0 ; j < this.$headerFixedItem.length ; j++) {
            this.$fixedWidth = this.$headerFixedItem.eq(j).outerWidth();

            this.$headerFixedItem.eq(j).appendTo($('.fixed_group').children('.grid_row').eq(i));

            if(this.fullLeft === fixedBreak){
                this.fullLeft = -this.rowLeft;
            } else{
                this.fullLeft += this.$fixedWidth;
            }
        }
    }
}
TableGrid.prototype._fixedRowSet = function (fixedCell) {
    var objThis = this;

    this.$headerFixedItem.each(function(i){
        if( objThis.$headerFixedItem.eq(i).css('display') != 'none' ){
            objThis.$fixedWidth = objThis.$headerFixedItem.eq(i).outerWidth();
            objThis.rowLeft += objThis.$fixedWidth;
        }

        objThis.$gridScrolled.css('left', objThis.rowLeft);
    });

    fixedCell();
}
TableGrid.prototype._fixedCellSet = function () {
    this.fullLeft = -this.rowLeft;
    var fixedBreak = this.$headerFixedItem.last().outerWidth() * -1;

    for (var i = 0 ; i < this.$gridRow.length ; i++) {
        this.$headerFixedItem = this.$gridRow.eq(i).find('.fixed');

        for (var j = 0 ; j < this.$headerFixedItem.length ; j++) {
            this.$fixedWidth = this.$headerFixedItem.eq(j).outerWidth();

            if(this.fullLeft === fixedBreak){
                this.fullLeft = -this.rowLeft;
            } else{
                this.fullLeft += this.$fixedWidth;
            }
        }
    }
}
TableGrid.prototype._verticalScroll = function () {
    var objThis = this;

    this.$scrolledItem.scroll(function () {
        $('.grid_body .fixed_group').css('top',- $(this).scrollTop());
    });
}
TableGrid.prototype._horizonScroll = function () {
    var objThis = this;

    this.$scrolledItem.scroll(function () {
        $('.grid_header .scrolled .grid_row').css('left',- $(this).scrollLeft());
    });
}
TableGrid.prototype._initEvent = function (widthArr) {
    var objThis = this;

    this._titleStick();
    this._fixedCreat();
    this._cellSetWidth(widthArr, function(){
        objThis._rowSetWidth();
    });
    this._fixedSend();
    this._fixedRowSet(function(){
        objThis._fixedCellSet();
    });
    this._verticalScroll();
    this._horizonScroll();
}
