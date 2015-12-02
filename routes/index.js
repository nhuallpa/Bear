
/*
 * GET home page.
 */

var cache = require('memory-cache');

exports.index = function(req, res){
  res.render('index', { title: 'Inscribite Ya!' })
};

exports.subjectDetail = function (req, res) {
  var name = "";
  var code = req.params.code;
  subjectList = cache.get('subjectList');
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
  subjectList = cache.get('subjectList');
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

  var name = "";
  var subject = null;
  subjectList = cache.get('subjectList');
  subjectList.forEach(function (aSubject){
    if (codSubject == aSubject.get("code")) {
      aSubject.doRegistation(padron, firstName, lastName);
      name = aSubject.get("name");
    }
  });

  res.render('subject-detail', {name: name, code: codSubject});
}

exports.subjectAll = function (req, res) {

  //var quimica = new Subject({code:"66", name:"Probabilidad"});
  //cache.get('subjectList').push(quimica);
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(cache.get('subjectList')));

};