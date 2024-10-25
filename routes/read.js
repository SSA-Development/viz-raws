const express = require('express');
const router = express.Router();
const db = require('../database/db')


router.get('/read/:series/:chapter/:type',(req,res)=>{
    console.log(`SELECT pages FROM ${req.params.type} WHERE s_name = '${req.params.series}' AND chapter = '${req.params.chapter}'`)
    const rows = db.prepare(`SELECT d_name, pages FROM ${req.params.type} WHERE s_name = '${req.params.series}' AND chapter = '${req.params.chapter}'`).get();
    
    
    console.log(rows)
    res
        .status(200)
        .render("read", {
            series: req.params.series,
            chapter: req.params.chapter,
            type: req.params.type,
            pages: rows.pages,
            name: rows.d_name
        });
});

module.exports = router;