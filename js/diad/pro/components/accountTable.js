'use strict';

var accountInfos = [{
    id: 0,
    medium: '네이버',
    product: '쇼핑검색광고',
    user: 'esellers',
    date: '2018-10-08 오후 5:29:52',
    update: '2018-10-10 오후 5:29:52'
}, {
    id: 1,
    medium: '11번가',
    product: '포커스클릭',
    user: 'esellers',
    date: '2018-10-08 오후 5:29:52',
    update: '2018-10-12 오후 5:29:52'
}, {
    id: 2,
    medium: '11번가',
    product: '포커스클릭',
    user: 'diad',
    date: '2018-10-18 오후 5:29:52',
    update: '2018-10-12 오후 5:29:52'
}, {
    id: 3,
    medium: '네이버',
    product: '키워드검색',
    user: 'diad',
    date: '2018-10-18 오후 5:29:52',
    update: '2018-10-12 오후 5:29:52'
}, {
    id: 4,
    medium: '네이버',
    product: '파워컨텐츠',
    user: 'esellers',
    date: '2018-10-18 오후 5:29:52',
    update: '2018-10-10 오후 5:29:52'
}];

Vue.component('account-table', {
    template: '\
        <tr>\
            <td>{{infos.id + 1}}</td>\
            <td>{{infos.medium}}</td>\
            <td>{{infos.product}}</td>\
            <td>{{infos.user}}</td>\
            <td>{{infos.date}}</td>\
            <td>{{infos.update}}</td>\
        </tr>\
    ',
    props: {
        infos: Object
    }
});

var accountList = new Vue({
    el: '.account_manage .account_list',
    components: {
        Pagination: Pagination
    },
    data: function data() {
        return {
            accountInfos: accountInfos,
            page: 1,
            perPage: 10
        };
    },
    props: {
        chunksNavigation: 'fixed'
    },
    methods: {
        setPage: function setPage(page) {
            this.page = page;
        }
    },
    computed: {
        total: function total() {
            return accountInfos.length * 10;
        },
        offset: function offset() {
            return (this.page - 1) * this.perPage;
        },
        limit: function limit() {
            return this.offset + this.perPage;
        },
        numOfPages: function numOfPages() {
            return Math.ceil(accountInfos.length / this.perPage);
        },
        computedList: function computedList() {
            if (this.offset > accountInfos.length) {
                this.page = this.numOfPages;
            }
            return accountInfos.slice(this.offset, this.limit);
        }
    }
});
