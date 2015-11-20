/**
 * Created by root on 20/11/15.
 */
var Backbone = require('backbone');

Subscriber = Backbone.Model.extend({
    default: {
        padron: '0000',
        firstname: '',
        lastname: ''
    },

});

module.exports = Subscriber;