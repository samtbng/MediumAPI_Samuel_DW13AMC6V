const models = require('../models')
const Article = models.articles
const category = models.category
const users = models.users
const comment = models.comment

exports.index = (req, res) => {
    Article.findAll({
        include: [
            {
                model: category,
                as: "category",
                attributes: ['id', 'name_category']
            },
            {
                model: users,
                as: "users",
                attributes: ['id', 'username', 'fullname']
            }
        ]
    }).then(article => {
        const randomData = shuffleArray(article)
        res.send(randomData)
    }).catch(err => res.send(err))
}

exports.create = (req, res) => {
    Article.create({
        id: req.param.id,
        title: req.body.title,
        category_id: req.body.category_id,
        content: req.body.content,
        img: req.body.img,
        author_id: req.body.author_id
    }).then(article => res.send(article)).catch(err => { res.send(err) })
}

exports.latest = (req, res) => {
    Article.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: category,
                as: "category",
                attributes: ['id', 'name_category']
            },
            {
                model: users,
                as: "users",
                attributes: ['id', 'username', 'fullname']
            }
        ],
        limit: 10
    }).then(article => res.send(article)).catch(err => res.send(err))
}

exports.perCategory = (req, res) => {
    Article.findAll({
        where: { category_id: req.params.id },
        include: [
            {
                model: category,
                as: "category",
                attributes: ['id', 'name_category']
            },
            {
                model: users,
                as: "users",
                attributes: ['id', 'username', 'fullname']
            }
        ]
    }).then(data => res.send(data)).catch(err => res.send(err))
}

exports.update = (req, res) => {
    Article.update({
        title: req.body.title,
        category_id: req.body.category_id,
        content: req.body.content,
        img: req.body.img,
        author_id: req.body.author_id
    }, { where: { id: req.params.id } }).then(data => res.send(data)).catch(err => { res.send(err) })
}

exports.delete = (req, res) => {
    Article.destroy({ where: { id: req.params.id } }).then(() => {
        console.log("Menghapus Data berhasil")
        res.send("Menghapus Data Berhasil")
    }).catch(err => {
        res.send(err)
    })
}

exports.show = (req, res) => {
    Article.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: category,
                as: "category",
                attributes: ['id', 'name_category']
            },
            {
                model: users,
                as: "users",
                attributes: ['id', 'username', 'fullname', 'avatar']
            },
            {
                model: comment,
                as: "comments",
            }
        ]
    }).then(data => res.send(data)).catch(err => res.send(err))


}


function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
