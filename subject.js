/**
 * Created by root on 08/11/15.
 */
var Backbone = require('backbone');
var Subscriber = require('./subscriber');

Subject = Backbone.Model.extend({
    default: {
        code: '00',
        name: '',
        description: 'description',
        quota: 0,
        registeredStudent: []
    },
    doRegistation: function (padron, firstName, lastName) {
      var aSubscriber = new Subscriber({padron: padron, firstName: firstName, lastName: lastName});
      this.registeredStudent.push(aSubscriber);
      console.log(this.registeredStudent);
    }
});

module.exports = Subject;
