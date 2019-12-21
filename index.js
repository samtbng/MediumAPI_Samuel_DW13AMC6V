//instatiate express module
const express = require('express')
//instatiate body-parser
const bodyParser = require('body-parser')
//instatiate express group
require('express-group-routes')
//import controller
const categoryControllers = require('./controllers/categoryControllers')
const articlesControllers = require('./controllers/articlesControllers')
const { authenticated } = require('./middleware')
const AuthController = require('./controllers/authController')
const commentControllers = require('./controllers/commentController')
const usersController = require('./controllers/usersController')
//use express in app variable
const app = express()
//define the server port
const port = 8000
//allow this app to receive incoming json request
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.group("/api/v1", (router) => {
    //task 1
    router.get('/categories', categoryControllers.index) //show all categories
    router.post('/category', categoryControllers.create) //create new category to database

    //task 2
    router.get('/articles', articlesControllers.index) // show all articles
    router.get('/article/latest', articlesControllers.latest) //show articles from the latest

    //task3 
    router.get('/category/:id/article', categoryControllers.perCategory) // show article with same category

    //task 4
    router.post('/article', authenticated, articlesControllers.create) //create new article and using authorized
    router.patch('/article/:id', authenticated, articlesControllers.update) //edit article and using authorized
    router.delete('/article/:id', authenticated, articlesControllers.delete) //delete article and using authorized

    //login
    router.post('/login', AuthController.login) //create new token by entering email and password

    //task 5
    router.get('/article/:id', articlesControllers.show) //show detail article

    router.get('/comments', commentControllers.index) // show all comment in all articles
    router.post('/article/:id/comment', authenticated, commentControllers.create) //show comment in one article
    router.put('/article/:id/comment', authenticated, commentControllers.update) //edit comment in one article
    router.delete('/article/:id/comment', authenticated, commentControllers.delete) //delete comment in one article

    router.get('/users', usersController.index) //show all users
    router.get('/user/:id', usersController.showOne) //show login user

    router.post('/registrasi', usersController.registrasi) //create new user


})

//create the homepage route
app.get('/', (req, res) => {
    //res means respone, and it send string to the API
    res.send('Hello Express')
})

app.listen(port, () => console.log(`listening on port ${port}!`))