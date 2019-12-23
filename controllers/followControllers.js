const models = require('../models')
const follow = models.follow

exports.index = (req, res) => {
    follow.findAll().then(data => res.send(data)).catch(err => res.send(err))
}

exports.create = (req, res) => {
    follow.create(req.body).then(data => res.send(data)).catch(err => { res.send(err) })
}

exports.delete = (req, res) => {
    const userId = req.body.user_id
    const followingUserId = req.body.following_user_id
    follow.destroy({
        where: {
            user_id: userId,
            following_user_id: followingUserId
        }
    }).then(() => {
        console.log("Menghapus Data berhasil")
        res.send("Menghapus Data Berhasil")
    }).catch(err => {
        res.send(err)
    })
}
