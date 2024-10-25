var express = require('express');
var router = express.Router();
const db = require('../database/db')


/* GET home page. */
router.get('/', function(req, res, next) {
  // const chapters = db.prepare(`SELECT f_name FROM series ORDER BY RANDOM() LIMIT 3;`).all();
   var query = req.query.query;
  var found = true;
  var raws;
  var chapters;
  var spoilers;
  // const rows = db.prepare(`SELECT DISTINCT f_name FROM series ORDER BY RANDOM() LIMIT 3;`).all();

  try{
      //   const rows = db.prepare(`SELECT DISTINCT d_name, s_name FROM ${req.query.type};`).all();
    raws = db.prepare(`SELECT DISTINCT d_name, s_name FROM raws ORDER BY RANDOM() LIMIT 3;`).all()
    // console.log(`SELECT * FROM raws where s_name  '${query}'`);
    
    // // undefined
    chapters = db.prepare(`SELECT DISTINCT d_name, s_name FROM chapters ORDER BY RANDOM() LIMIT 3;`).all()
    spoilers =  db.prepare(`SELECT DISTINCT d_name, s_name FROM spoilers ORDER BY RANDOM() LIMIT 3;`).all()
    console.log(raws);
    console.log(chapters);
    console.log(spoilers);
  }

  catch(err){
      console.log(err);
      console.log("in here");
      found = false;
  }
  res.render('index', { chapters: chapters, spoilers: spoilers, raws: raws});
});



module.exports = router;
