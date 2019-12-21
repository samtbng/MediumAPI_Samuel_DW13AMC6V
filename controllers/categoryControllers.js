const models = require('../models')
const cat = models.category
const articles = models.articles
const users = models.users

exports.index = (req, res) => {
    cat.findAll({ attributes: ['id', 'name_category'] })
        .then(data => {
            res.send(data)
        }).catch(err => res.send(err))
}

exports.perCategory = (req, res) => {
    cat.findOne({
        where: { id: req.params.id },
        include: [{ model: articles, as: 'articles', include: [{ model: users, as: 'users' }], limit: 5 }]
    }).then(data => res.send(data)).catch(err => res.send(err))
}


exports.create = (req, res) => {
    cat.create({ name_category: req.body.name }).then(data => { res.send(data) }).catch(err => { res.send(err) })
}


// const key = Object.keys(data).filter(item => {
//     if(item !== 'createdAt' || item !== 'updatedAt'){
//         return item
//     }
// })

// const result = key.map(prop => {
//     return data[prop]
// })