'use strict';

Vue.component('newest-item', {
    template: '\
        <li>\
            <a v-bind:href="newest.link" target="_blank">{{ newest.title }}</a>\
            <span v-if="" class="date">{{newest.date}}</span>\
        </li>\
    ',
    props: {
        newest: Object
    }
});