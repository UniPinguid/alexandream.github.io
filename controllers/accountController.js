const router = require('express').Router();
const userModel = require('../models/userModel');

router.get('/register',(req,res) => {
    res.render('register',{
        layout: "registerLayout"
    });
});

router.get('/login',(req,res) => {
    res.render('login',{
        layout: "signinLayout"
    });
})

module.exports = router;