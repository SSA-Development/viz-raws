var express = require('express');
var router = express.Router();

router.get('/spoilers', function(req, res, next) {
  res.render('spoilers', { title: 'Express' });
});

module.exports = router;