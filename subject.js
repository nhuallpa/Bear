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
        registeredStudent: new Array()
    },
    doRegistation: function (padron, firstName, lastName) {
      var aSubscriber = new Subscriber({padron: padron, firstName: firstName, lastName: lastName});
      if (typeof this.registeredStudent == "undefined") {
          this.registeredStudent = new Array();
      }
      this.registeredStudent.push(aSubscriber);
      this.quota = this.quota - 1
      console.log(this.registeredStudent);
    }
});

module.exports = Subject;
