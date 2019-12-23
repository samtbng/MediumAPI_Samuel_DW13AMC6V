const models = require('../models')
const jwt = require('jsonwebtoken')
const users = models.users
const articles = models.articles
const category = models.category


exports.index = (req, res) => {
    users.findAll({ attributes: { exclude: ['password'] } })
        .then(user => res.send(user)).catch(err => res.send(err))
}

exports.registrasi = (req, res) => {
    users.create({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email,
        avatar: req.body.fullname
    }).then(user => {
        const email = user.email
        const token = jwt.sign({ userId: user.id }, 'dumbways')
        res.send({ email, token })
    }).catch(err => res.send(err))
}

exports.showOne = (req, res) => {
    users.findOne({
        attributes: ['username', 'email', 'fullname', 'avatar'],
        where: { id: req.params.id }
    })
        .then(user => res.send(user)).catch(err => res.send(err))
}

exports.usersArticle = (req, res) => {
    users.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'username', 'fullname'],
        include: [
            {
                model: articles,
                as: "articles",
                attributes: ['id', 'category_id', 'title', 'content', 'img', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: category,
                        as: 'category',
                        attributes: ['id', 'name_category']
                    }
                ]
            },
        ]
    }).then(data => {
        res.send(data)
    }).catch(err => res.send(err))
}