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
      if (typeof this.registeredStudent === 'undefined') {
          this.registeredStudent = new Array();
      }
      if (!this.existSubscriberByPadron(padron)) {
          this.registeredStudent.push(aSubscriber);
          this.set({quota: this.get("quota") - 1});
      } else {
          throw new Error('El suscriptor ya existe');
      }
    },

    deleteSubscriber: function (padron) {
        var indexFound = -1;
        if (typeof this.registeredStudent !== 'undefined') {
            this.registeredStudent.forEach(function(aSubscriber, index) {
                if (aSubscriber.get("padron") == padron) {
                    indexFound = index;
                }
            });
            if (indexFound > -1) {
                this.registeredStudent.splice(indexFound, 1);
                this.set({quota: this.get("quota") + 1});
            } else {
                throw new Error('El suscriptor no existe');
            }
        }
    },
    existSubscriberByPadron: function (padron) {
        var indexFound = -1;
        if (typeof this.registeredStudent !== 'undefined') {
            this.registeredStudent.forEach(function(aSubscriber, index) {
                if (aSubscriber.get("padron") == padron) {
                    indexFound = index;
                }
            });
            if (indexFound > -1) {
                return true;
            } else {
                return false;
            }
        }
    }
});

module.exports = Subject;
