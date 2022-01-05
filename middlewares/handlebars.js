//template engine
const handlebars = require('express-handlebars');

module.exports = app => {
    const hbs = handlebars.create({
        defaultLayout: 'homeLayout',
        extname: 'hbs',
    });
    app.engine('hbs',hbs.engine);
    app.set('view engine','hbs');
    app.set('views','./views');
}