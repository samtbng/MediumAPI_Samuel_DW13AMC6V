const models = require('../models')
const comment = models.comment
const users = models.users

exports.index = (req, res) => {
    comment.findAll().then(data => res.send(data)).catch(err => res.send(err))
}

exports.create = (req, res) => {
    comment.create({
        article_id: req.params.id,
        user_id: req.body.user_id,
        comment: req.body.comment,
    }).then(data => res.send(data)).catch(err => { res.send(err) })
}

exports.update = (req, res) => {
    const userId = req.body.user_id
    const articleId = req.params.id
    comment.update(
        { comment: req.body.comment },
        {
            where: {
                user_id: userId,
                article_id: articleId
            }
        })
        .then(data => res.send(data)).catch(err => { res.send(err) })
}

exports.delete = (req, res) => {
    const userId = req.body.user_id
    const articleId = req.params.id
    comment.destroy({
        where: {
            user_id: userId,
            article_id: articleId
        }
    }).then(() => {
        console.log("Menghapus Data berhasil")
        res.send("Menghapus Data Berhasil")
    }).catch(err => {
        res.send(err)
    })
}
