const jwt = require('jsonwebtoken')
const models = require("../models")
const User = models.users
exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ where: { email, password } }).then(user => {
        if (user) {
            const id = user.id
            const username = user.username
            const token = jwt.sign({ usernameJwt: username }, 'dumbways')
            res.send({ id, username, email, token })
        } else {
            res.send({ error: true, message: "Wrong email or password!" })
        }
    }).catch(err => res.send(err))
}