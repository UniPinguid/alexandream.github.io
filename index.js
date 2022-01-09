const express = require('express');
const app = express();
const port = 3000;
require('./middlewares/handlebars')(app);
require('./middlewares/session')(app);
const bookModel = require('./models/bookModel');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());

require('./middlewares/passport')(app);

app.use('/pages',require('./controllers/accountController'));

app.get('/features',(req,res) => {
  res.render('feature',{
    title: "feature"
  });
});

app.get('/add-books',(req,res) => {
  res.render('addBook',{
    title: "add book"
  });
});

app.post('/add-books',async (req,res) => {
  let date = new Date().toDateString();
  let idBook = await bookModel.all();
  let id = idBook.length + 1;
  let book = {
    IDSACH: id,
    TENSACH: req.body.bookname,
    THELOAI: req.body.genre,
    TACGIA: req.body.author,
    NAMXUATBAN: req.body.yearproduce,
    NHAXUATBAN: "",
    NGAYNHAP: date,
    TRIGIA: req.body.price,
    NGUOINHAN: "",
    MUONSACH: ""
  }
  bookModel.add(book);
  res.redirect('/add-books');
});

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});