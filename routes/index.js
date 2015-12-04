
/*
 * GET home page.
 */

var cache = require('memory-cache');
var Subscriber = require('../subscriber');

exports.index = function(req, res){
  res.render('index', { title: 'Inscribite Ya!' })
};



exports.subjectSubscriberAll = function (req, res) {

  var code = req.params.code;
  var subscribers = null;
  var subjectList = cache.get('subjectList');
  subjectList.forEach(function (aSubject){
    if (code == aSubject.get("code")) {
      subscribers = aSubject.registeredStudent;
    }
  });

  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(subscribers));

}

exports.subjectDetail = function (req, res) {
  var name = "";
  var code = req.params.code;
  var subjectList = cache.get('subjectList');
  subjectList.forEach(function (subject){
    if (code == subject.get("code")) {
      name = subject.get("name");
    }
  });

  res.render('subject-detail', { title: "Listado de Inscriptos", name: name, code: code});
};

exports.subscriber = function (req, res) {

  var name = "";
  var code = req.query.code
  var subjectList = cache.get('subjectList');
  subjectList.forEach(function (subject){
    if (code == subject.get("code")) {
      name = subject.get("name");
    }
  });
  res.render('student-register', { code: req.query.code, name: name });
};

exports.addSubscriber = function (req, res) {

  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var padron = req.body.padron;
  var codSubject = req.body.codeSubject;

  var subjectList = cache.get('subjectList');
  var name = "";

  var mensaje = "";

  subjectList.forEach(function (subject){
    if (code == subject.get("code")) {
      name = subject.get("name");
    }
  });


  subjectList.forEach(function (aSubject){
    if (codSubject == aSubject.get("code")) {
      try {
        aSubject.doRegistation(padron, firstName, lastName);
        name = aSubject.get("name");
      } catch (ex) {
        console.log(ex);
        mensaje = ex.message;
      }
    }
  });
  if (mensaje != "") {
    res.render('student-register', {name: name, code: codSubject, msgErr: mensaje});
  } else {
    res.render('subject-detail', {name: name, code: codSubject});
  }

}

exports.deleteSubscriber = function (req, res) {
  var padron = req.params.padron;
  var codeSubject = req.params.code;

  var subjectList = cache.get('subjectList');

  subjectList.forEach(function (aSubject){
    if (codeSubject == aSubject.get("code")) {
      try {
        aSubject.deleteSubscriber(padron);
        name = aSubject.get("name");
      } catch (ex) {
        console.log(ex);
      }

    }
  });

  res.render('subject-detail', {name: name, code: codeSubject});
}

exports.subjectAll = function (req, res) {

  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(cache.get('subjectList')));

};