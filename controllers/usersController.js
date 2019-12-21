const models = require('../models')
const jwt = require('jsonwebtoken')
const users = models.users


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
        const token = jwt.sign({ userId: user.id }, 'dumbways')
        res.send({ user, token })
    }).catch(err => res.send(err))
}

exports.showOne = (req, res) => {
    users.findOne({
        attributes: ['username', 'email', 'fullname', 'avatar'],
        where: { id: req.params.id }
    })
        .then(user => res.send(user)).catch(err => res.send(err))
}