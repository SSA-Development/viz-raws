const express = require('express');
const router = express.Router();
const db = require('../database/db')

router.get('/series/:series',(req,res)=>{
    var series = req.params.series;
    
    var rows = db.prepare(`SELECT name, date, author, genre, status FROM series WHERE f_name = '${series}';`).get();
    var chapters = db.prepare(`SELECT DISTINCT chapter, name FROM ${req.query.type} WHERE s_name = '${series}';`).all()

    console.log(chapters);

    console.log(`SELECT * FROM series WHERE f_name = '${series}';`)

    console.log(rows);

    res.status(200).render('series', {
        series: series,
        name: rows.name,
        date: rows.date,
        author: rows.author,
        genre: rows.genre,  
        status: rows.status,
        type: req.query.type,
        chapters: chapters
    });
});


module.exports = router;