import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index'

chai.use(chaiHttp);
const assert = chai.assert;
const expect = chai.expect;

///list-post
describe('Test api list-post', () => {
    it('/list-post', done => {
        chai.request(app)
            .get('/list-post')
            .end((err, res) => {
                console.log(err)
                done()
            })
    })
})

///delete-post/:id
const idDele = 'dasdaasdsa'
describe('test api /delete-post/:id', () => {
    it('/delete-post/:id', done => {
        chai.request(app)
            .del(`/delete-post/${idDele}`)
            .end((err, res) => {
                assert.isNotEmpty(res.body)
                done()
            })
    })
})


///panel/:id
const idGet = 'dasdadadddadddsad'
describe('Test api /post/:id', () => {
    it('/post/:id', done => {
        chai.request(app)
            .get(`/post/${idGet}`)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                assert.isNotEmpty(res.body)
                done()
            })
    })
})