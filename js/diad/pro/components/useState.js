'use strict';

var useState = [{
    id: 0,
    medium: '네이버',
    type: 'A',
    keyword: '30개',
    tenderKey: '13개',
    grade: 'K',
    term: '2018-10-08',
    remain: '30일'
}, {
    id: 1,
    medium: '11번가',
    type: 'B',
    keyword: '130개',
    tenderKey: '53개',
    grade: 'P',
    term: '2018-10-18',
    remain: '60일'
}];

Vue.component('state-table', {
    template: '#state-tb',
    props: {
        state: Object
    }
});

var accountList = new Vue({
    el: '.use_situation',
    data: {
        useState: useState
    }
});