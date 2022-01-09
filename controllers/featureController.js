const router = require('express').Router();
const bookModel = require('../models/bookModel');

router.get('/add-books', (req, res) => {
    if(!req.user){
        res.redirect('/');
        return;
    }
    res.render('addBook', {
        title: "add book"
    });
});

router.get('/search-books', (req, res) => {
    if(!req.user){
        res.redirect('/');
        return;
    }
    res.render('searchBook', {
        title: "search book",
        layout: "searchBookLayout"
    });
});

router.get('/book', (req, res) => {
    if(!req.user){
        res.redirect('/');
        return;
    }
    res.render('book', {
        title: "book",
        layout: "searchBookLayout"
    });
});

router.get('/search', (req, res) => {
    if(!req.user){
        res.redirect('/');
        return;
    }
    res.render('searchEmployee', {
        title: "search Employee",
        layout: "searchBookLayout"
    });
});

router.get('/employee', (req, res) => {
    if(!req.user){
        res.redirect('/');
        return;
    }
    res.render('employee', {
        title: "Employee",
        layout: "searchBookLayout"
    });
});

router.post('/add-books', async (req, res) => {
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
    res.redirect('/features/add-books');
});

module.exports = router;