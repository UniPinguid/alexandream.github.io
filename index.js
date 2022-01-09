const express = require('express');
const app = express();
const port = 3000;
require('./middlewares/handlebars')(app);
require('./middlewares/session')(app);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());

require('./middlewares/passport')(app);

app.use('/pages',require('./controllers/accountController'));
app.use('/features',require('./controllers/featureController'));

app.get('/features',(req,res) => {
  res.render('feature',{
    title: "feature"
  });
});

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});