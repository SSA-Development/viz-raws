const express = require('express');
const router = express.Router();
const db = require('../database/db')

router.get('/categories',(req,res)=>{
    const rows = db.prepare(`SELECT f_name FROM series ORDER BY RANDOM() LIMIT 3;`).all();
    console.log(rows);

    res.status(200)
        .render(
            'categories',
            {
                name1: rows[0].f_name.replace(" ", ""),
                name2: rows[1].f_name.replace(" ", ""),
                name3: rows[2].f_name.replace(" ", ""),
                
            }
        );
});

router.get('/category',(req,res)=>{
    const rows = db.prepare(`SELECT DISTINCT d_name, s_name FROM ${req.query.type};`).all();

    const random = db.prepare(`SELECT DISTINCT d_name, s_name FROM ${req.query.type} ORDER BY RANDOM() LIMIT 3;`).all()
    console.log(random);
    res.status(200)
        .render(
            'category',
            {
                type: req.query.type,
                series: rows,
                random: random,
            }
        );
});




module.exports = router;