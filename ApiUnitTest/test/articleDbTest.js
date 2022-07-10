const mongoose = require('mongoose');
const Article = require('./../app/models/article');
const should = require('chai').should();

//>-----------------------  set config test

process.env.NODE_ENV = 'test';
const config = require('config');

//>----------------------- set database config

mongoose.connect(config.DBHost, { useNewUrlParser: true });

//>----------------------- create test for database

describe('database test', () => {

    const dataArticle = {
        title: 'article one',
        author: 'salar arjmand',
        body: 'this is article one',
        tags: 'article1,article1',
        viewCount: '20',
    }

    //>--------------------- test connection database

    it('check connection', async () => {

        mongoose.connection.once('open', () => console.log(resp)).on('error', (err) => {
            console.log(err);
        })

    });

    //>--------------------- test sava database

    it('save a article', async () => {

        let article = new Article(dataArticle);

        article = await article.save();

        //.................. test database

        article.should.be.a('object');
        article.should.have.property('title');
        article.should.have.property('author');
        article.should.have.property('body');
        article.should.have.property('tags');
        article.should.have.property('viewCount');

    })

    //>--------------------- test find all database

    it('find all articles', async () => {

        let articles = await Article.find({});

        //.................. test database

        articles.should.be.a('array');
        articles.length.should.be.deep.eql(1);

    });

    //>--------------------- test find one database

    it('find a article', async () => {

        let article = await Article.findOne({ title: dataArticle.title });

        article.title.should.be.eql(dataArticle.title);
        article.author.should.be.eql(dataArticle.author);
        article.body.should.be.eql(dataArticle.body);
        article.tags.should.be.eql(dataArticle.tags);
        article.viewCount.should.be.eql(dataArticle.viewCount);

    });

    //>--------------------- test update one database

    it('update a article', async () => {

        let article = await Article.findOne({ title: dataArticle.title });

        article.set({
            'title': 'article tow',
        });

        let result = await article.save();

        result.should.be.a('object');
        result.should.have.property('title');
        result.title.should.be.eql('article tow');
    });

    //>--------------------- test remove all database

    it('remove all article', async () => {
        
        let result = await Article.deleteMany({});

        result.should.be.a('object');
        result.acknowledged.should.be.true;
        result.deletedCount.should.be.eql(1);

    });

    //>--------------------- after disconnect database

    after('close db connection', () => {
        mongoose.connection.close();
    });

});