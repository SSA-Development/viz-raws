const express = require('express');
const router = express.Router();
const db = require('../database/db')

router.get('/search',(req,res)=>{
    var query = req.query.query;
    query = query.split(' ')
    
    var found = true;
    var raws;
    var chapter;
    var spoilers;
    const rows = db.prepare(`SELECT DISTINCT f_name FROM series ORDER BY RANDOM() LIMIT 3;`).all();

    try{
        for(var i = 0; i < query.length; i++){
            raws = db.prepare(`SELECT DISTINCT d_name, s_name FROM raws where s_name like '%${query[i]}%' or d_name like '%${query[i]}%'`).all()
            chapter = db.prepare(`SELECT DISTINCT d_name, s_name FROM chapters where s_name like '%${query[i]}%' or d_name like '%${query[i]}%'`).all()
            spoilers =  db.prepare(`SELECT DISTINCT d_name, s_name FROM spoilers where s_name like '%${query[i]}%' or d_name like '%${query[i]}%'`).all()

            console.log(spoilers)
        }
    }

    catch(err){
        console.log(err);
        console.log("in here");
        found = false;
    }


    res.status(200).render('search',{query: query,found: found,raws: raws, chapters: chapter, spoilers: spoilers, name1: rows[0].f_name.replace(" ", ""),
    name2: rows[1].f_name.replace(" ", ""),
    name3: rows[2].f_name.replace(" ", ""),});
});

module.exports = router;