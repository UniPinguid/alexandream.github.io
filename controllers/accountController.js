const router = require('express').Router();
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const saltRounds = 10;

router.get('/register',(req,res) => {
    if(req.user){
        return res.redirect('/');
    }
    res.render('register',{
        layout: "registerLayout",
        title: "register page"
    });
});

router.get('/login',(req,res) => {
    if(req.user){
        return res.redirect('/');
    }
    res.render('login',{
        layout: 'signinLayout',
        title: 'Login page'
    });
});
 
router.get('/logout',(req,res) => {
    if(req.user){
        req.logOut();
    }
    res.redirect('/');
});

router.post('/register',async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const vaitro = req.body.vaitro;
    let user = await userModel.get("IDUSER",username);
    if(user){
        console.log("tên tài khoản đã tồn tại");
        res.redirect('/pages/register');
        return;
    }
    if(password.length == 0 || vaitro.length == 0){
        res.redirect('/pages/register');
        return;
    }
    const pwdHashed = await bcrypt.hash(password,saltRounds);
    user = {
        IDUSER: username,
        PASSWORD: pwdHashed,
        VAITRO: vaitro
    };
    userModel.add(user);
    res.redirect('/pages/login');
});

router.post('/login',async (req,res,next) => {
    passport.authenticate('local', (err,user,info) => {
        if(err){
            return res.render('login',{
                title: 'login page',
                msg: err
            });
        }
        if(!user){
            return res.render('login',{
                msg: 'incorrect username',
                title: 'login page'
            });
        }
        req.logIn(user, function(err){
            if(err){
                return res.render('login',{
                    title: 'login page',
                    msg: err
                });
            }
            return res.redirect('/');
        });
    })(req,res,next);
});

module.exports = router;