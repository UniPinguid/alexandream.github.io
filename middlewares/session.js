const session = require('express-session');

module.exports = app => {
    app.use(session({
        secret:"mysecret",
        cookie: {
          maxAge: 1000*60*5
        }
    }));
}