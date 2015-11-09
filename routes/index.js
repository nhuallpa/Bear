
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Inscribite Ya!' })
};

exports.subjectDetail = function (req, res) {

  res.render('subject-detail', { title: 'Materia' });
};