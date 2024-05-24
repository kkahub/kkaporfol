'use strict';

var config = {
    events: '',
    locale: 'ko'
};

Vue.use(VeeValidate, config);

// 네이버 계정 추가
var naverAddValidation = new Vue({
    el: '.naver_account_add',
    data: function data() {
        return {
            user: '',
            pw: '',
            customer: '',
            medium: '',
            product: '',
            access: '',
            secret: ''
        };
    },

    methods: {
        naverAddSubmit: function naverAddSubmit() {
            var self = this;

            this.$validator.validateAll().then(function (result) {
                if (result) {
                    successAddAction(self);
                }
            });
        }
    },
    mounted: function mounted() {
        var self = this;
        $('.pop_wrap .close, .pop_wrap .btn_cancel').on('click', function () {
            clearHide(self);
        });
    }
});

// 11번가 계정 추가
var st11AddValidation = new Vue({
    el: '.st11_account_add',
    data: function data() {
        return {
            medium: '',
            product: '',
            user: '',
            pw: ''
        };
    },

    methods: {
        st11AddSubmit: function st11AddSubmit() {
            var self = this;

            this.$validator.validateAll().then(function (result) {
                if (result) {
                    successAddAction(self);
                }
            });
        }
    },
    mounted: function mounted() {
        var self = this;
        $('.pop_wrap .close, .pop_wrap .btn_cancel').on('click', function () {
            clearHide(self);
        });
    }
});

// 네이버 계정 상세
var naverDetailValidation = new Vue({
    el: '.naver_account_detail',
    data: function data() {
        return {
            pw: '',
            access: '',
            secret: ''
        };
    },

    methods: {
        naverDetailSubmit: function naverDetailSubmit() {
            var self = this;

            this.$validator.validateAll().then(function (result) {
                if (result) {
                    successModifyAction(self);
                }
            });
        }
    },
    mounted: function mounted() {
        var self = this;
        $('.pop_wrap .close, .pop_wrap .btn_cancel').on('click', function () {
            clearHide(self);
        });
    }
});

// 11번가 계정 상세
var st11DetailValidation = new Vue({
    el: '.st11_account_detail',
    data: function data() {
        return {
            pw: ''
        };
    },

    methods: {
        st11DetailSubmit: function st11DetailSubmit() {
            var self = this;

            this.$validator.validateAll().then(function (result) {
                if (result) {
                    successModifyAction(self);
                }
            });
        }
    },
    mounted: function mounted() {
        var self = this;
        $('.pop_wrap .close, .pop_wrap .btn_cancel').on('click', function () {
            clearHide(self);
        });
    }
});

function successAddAction(self) {
    var $popAccountFin = $('.account_succ');

    $popAccountFin.show();

    $('.account_succ .btn.basic').on('click', function () {
        clearHide(self);
    });
}
function successModifyAction(self) {
    var $popAccountFin = $('.account_modify_succ');

    $popAccountFin.show();

    $('.account_modify_succ .btn.basic').on('click', function () {
        clearHide(self);
    });
}
function clearHide(self) {
    $('.pop_wrap').find('select').each(function () {
        var firstOption = $(this).find('option:first').val();
        var labelText = $(this).find('option:first').text();

        $(this).val(firstOption);
        $(this).siblings('label').text(labelText);
    });

    $('.pop_wrap').find('input').val('');
    $('.pop_wrap').hide();
    self.errors.clear();
}