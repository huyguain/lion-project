import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/index';

chai.use(chaiHTTP);
const expect = chai.expect;
const assert = chai.assert

//createTemplate
const obj = {
    "language": "NodeJS",
    "testName": "react",
    "role": 4,
    "easy": 5,
    "medium": 15,
    "hard": 10,
    "passScore": 15,
    "duration": 30
}
describe('test testTemplate', () => {
    it('createTemplate', (done) => {
        chai.request(app)
            .post('/createTemplate')
            .send(obj)
            .end((err, res) => {
                expect(res.body).to.exist
                expect(res.status).to.equal(200)
            })
        done();
    })
})

//getAllTemplate
describe.only('getAllTemplate', () => {
    it('getAllTemplate', done => {
        chai.request(app)
            .get('/getAllTemplate')
            .end((err, res) => {
                expect(res.body).to.exist
                expect(res.status).to.equal(200)
                done()
            })
    })
})