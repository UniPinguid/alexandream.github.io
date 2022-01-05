const express = require('express');
const Passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const app = express();
const port = 3000;
require('./middlewares/handlebars')(app);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());

app.use(session({
  secret:"mysecret",
  cookie: {
    maxAge: 1000*60*5
  }
}));
app.use(Passport.initialize());
app.use(Passport.session()); 

app.use('/pages',require('./controllers/accountController'));

app.get('/', (req, res) => {
  res.render('home');
});

/*Passport.use(new localStrategy(
  (username,password,done) => {
    fs.readFile('./userDB.json',(err,data)=>{
      const db = JSON.parse(data);
      const userRecord = db.find(user => user.usr == username);
      if(userRecord && userRecord.pwd === password){
        return done(null,userRecord);
      }else{
        return(null,false);
      }
    });
  }
));

Passport.serializeUser((user,done) => {
  done(null,user.usr);
});

Passport.deserializeUser((name,done) => {
  fs.readFile('./userDB.json',(err,data)=>{
    const db = JSON.parse(data);
    const userRecord = db.find(user => user.usr === name);
    if(userRecord){
      return done(null,userRecord);
    }else{
      return(null,false);
    }
  });
});*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});