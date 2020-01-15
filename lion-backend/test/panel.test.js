import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);
const assert = chai.assert;
const expect = chai.expect;

//list-panel
describe('Test api list-panel', () => {
    it('/list-panel', done => {
        chai.request(app)
            .get('/list-panel')
            .end((err, res) => {
                expect(res.body.success).to.equal(true)
                assert.isNotEmpty(res.body)
                done()
            })
    })
})
///delete/:id
const idDelete = '5a2de5b34902761b1c8a1209'
describe('Test api /delete/:id', () => {
    it('/delete/:id', done => {
        chai.request(app)
            .del(`/delete/${idDelete}`)
            .end((err, res) => {
                assert.isNotEmpty(res.body)
                done()
            })

    })
})


///panel/:id
const idGet = '5a2de5da4902761b1c8a120b'
describe('Test api /panel/:id', () => {
    it('/panel/:id', done => {
        chai.request(app)
            .get(`/panel/${idGet}`)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                assert.isNotEmpty(res.body)
                done()
            })
    })
})