const Article = require('../models/article');


//>---------------------- create method get articles

const getArticles = async (req, res) => {

    try {

        let article = await Article.find({});

        res.json(article);

    } catch (err) {

        res.send(err);
    }
}

//>---------------------- create method post articles

const postArticle = async (req, res) => {

    try {

        let article = await Article(req.body);
        article = await article.save();
        res.json({ message: "Article successfully added!", article });


    } catch (err) {

        res.send(err);
    }
}

//>---------------------- create method get article

const getArticle = async (req, res) => {

    try {

        let article = await Article.findById(req.params.id);

        res.json(article);

    } catch (err) {

        res.send(err);
    }
}

//>---------------------- create method update article

const updateArticle = async (req, res) => {

    try {

        let article = await Article.findById(req.params.id);

        article.set(req.body);

        let result = await article.save();

        res.json({ message: "Article successfully Updated (:", result });

    } catch (err) {

        res.send(err);
    }
}

//>---------------------- create method delete article

const deleteArticle = async (req, res) => {

    try {

        const result = await Article.deleteOne({ _id: req.params.id });
        res.json({ message: "Article successfully deleted!", result });

    } catch (err) {

        res.send(err);
    }
}

//>--------------------- export methods

module.exports = {

    getArticles,
    postArticle,
    getArticle,
    updateArticle,
    deleteArticle,
}