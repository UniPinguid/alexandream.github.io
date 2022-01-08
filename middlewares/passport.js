const Passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = app => {
    Passport.use(new localStrategy(
        async (username,password,done) => {
            let user;
            try {
                user = await userModel.get("IDUSER",username);
                if(!user){
                    return done(null,false,{message: 'Incorrect username'});
                }
                const challengeResult = await bcrypt.compare(password,user.PASSWORD);
                if(!challengeResult){
                    return done(null,false, {message: 'Incorrect password'});
                }
                return done(null,user);
            } catch (error) {
                return done(error);
            }
        }
      ));
      
      Passport.serializeUser((user,done) => {
        done(null,user);
      });
      
      Passport.deserializeUser(async (user,done) => {
          try {
            const usr = await userModel.get("IDUSER",user.IDUSER);
            done(null,usr);
          } catch (error) {
            done(new Error('error'),null);
          }
      });

    app.use(Passport.initialize());
    app.use(Passport.session()); 

}