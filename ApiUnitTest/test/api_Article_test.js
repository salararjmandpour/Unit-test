process.env.NODE_ENV = 'test';

const { util } = require('chai');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const mongoose = require('mongoose');
const Article = require('../app/models/article');

const server = require('../server');
chai.use(chaiHttp);


//>-------------------- create new test for routers

describe('Article Routes', () => {

    const dataArticle = {
        title: 'article one8',
        author: 'salar arjmand',
        body: 'this is article one',
        tags: 'article1,article1',
        viewCount: '200',
    }

    //>--------------------- create test for POST router

    describe('/POST article', () => {

        /**
         * It doesn't work with the async method, you have to use done
         */

        it("it should not post a article without title felid", done => {

            const article = {

                author: 'salar arjmand',
                body: 'this is article one',
                tags: 'article1,article1',
                viewCount: '20',

            }

            chai.request(server)
                .post('/api/article')
                .send(article)
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("errors");
                    res.body.errors.should.have.property("title");
                    res.body.errors.title.should.have.property("kind").eql('required');

                });

            done();
        });

        //>----------------------- test for post a article 

        it("it should POST a article", done => {

            chai.request(server)
                .post('/api/article')
                .send(dataArticle)
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.be.property('message').eql('Article successfully added!');
                    res.body.article.should.have.property('title');
                    res.body.article.should.have.property('author');
                    res.body.article.should.have.property('body');
                    res.body.article.should.have.property('tags');
                    res.body.article.should.have.property('viewCount');



                });

            done();

        });
    });

    //>----------------------- test for get router all article 

    describe('/Get article', () => {

        //>-------------------- test for get all article

        it("it should Get all the article", done => {

            chai.request(server)
                .get('/api/article')
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);

                });

            done();
        });

    });

    //>----------------------- test for get router by id article

    describe('/GET/:id article', () => {

        //>---------------------- test for get by id article

        it('it should GET a article by the given id', done => {

            let article = new Article(dataArticle);

            article.save((err, article) => {

                chai.request(server)
                    .get('/api/article/' + article.id)
                    .end((err, res) => {

                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('author');
                        res.body.should.have.property('body');
                        res.body.should.have.property('tags');
                        res.body.should.have.property('_id').eql(article.id);

                    });

                done();
            });
        });
    });

    //>----------------------- test for put router by id article

    describe('/PUT/:id article', () => {

        //>---------------------- test for put by id article

        it('it should UPDATE a article given the id', done => {

            const article = new Article(dataArticle);
            article.save((err, article) => {
                chai.request(server)
                    .put('/api/article/' + article.id)
                    .send({ title: 'article 4', author: 'jokar' })
                    .end((err, res) => {

                        res.should.have.status(200);
                        res.body.should.have.be.a('object');
                        res.body.should.have.property('message').eql('Article successfully Updated (:');
                        res.body.result.should.have.property('title').eql('article 4');

                    });

                done();

            });
        });
    });

    //>----------------------- test for delete router by id article

    describe('/DELETE/:id article', () => {

        it('it should DELETE a article given the id', done => {

            const article = new Article(dataArticle);
            
            article.save((err, article) => {
                chai.request(server)
                    .delete('/api/article/' + article.id)
                    .end((err, res) => {

                        res.should.have.status(200);
                        res.body.should.have.be.a('object');
                        res.body.should.have.property('message').eql('Article successfully deleted!');
                        res.body.result.acknowledged.should.be.true;
                        res.body.result.deletedCount.should.be.eql(1);
                        

                    });
                
                done();
            
            });
        });
    });



    after(async () => {
        await Article.deleteMany({});
    })

});