import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/index';

chai.use(chaiHTTP);
const expect = chai.expect;
const assert = chai.assert;
//test question
describe('test question', () => {
    it('import question', (done) => {
        chai.request(app)
            .post('/createQuestion')
            .end((err, res) => {
                expect(res.text).to.equal('Data has been saved')
                done();
            })
    })
    it('export question', (done) => {
        chai.request(app)
            .post('/exportData')
            .end((err, res) => {
                expect(res.text).toString
                done();
            })
    })
})

//getAllQuestion
describe('Test api test question', () => {
    it('test question', done => {
        chai.request(app)
            .get('/test question')
            .end((err, res) => {
                 assert.isNotEmpty(res.text)
                 done()
            })
    })
})