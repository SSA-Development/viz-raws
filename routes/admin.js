const express = require('express')
const router = express.Router()


router.get('/upload',(req,res)=>{
    if(req.session.loggedIn == true){
        res.render('admin/upload')
    }
    else{
        res.status(401);
        res.redirect('/admin/login')
    }
})

router.get('/create',(req,res)=>{
    if(req.session.loggedIn == true){
        res.render('admin/create')
    }
    else{
        res.status(401);
        res.redirect('/admin/login')
    }
})

router.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(username == "jabya" && password == 'intelicore27' && !(req.session.loggedIn)){
        req.session.loggedIn = true;
        console.log(req.session)
        res.send("Success")
    }
    else if(req.session.loggedIn){
        console.log("heree")
        res.redirect('/admin/upload')
    }
    else{
        res.status(401);
        res.send("Unauthorized");
    }
})

router.get('/login',(req,res)=>{
    res.render('admin/login')
})

module.exports = router;