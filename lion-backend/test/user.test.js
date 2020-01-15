import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index'

chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;

//signIn
const dataSignIn = {
    username: 'tuanna85',
    password: '12345'
}

describe('Test api signIn', () => {
    it('!signIn', done => {
        chai.request(app)
            .post('/signIn')
            .send(dataSignIn)
            .end((err, res) => {
                expect(res.body.success).to.equal(true)
                assert.toString(res.body.userToken)
                done()
            })
    })
})

//create Admin
const dataAdmin = {
    identityCard: 2131564,
    userName: 'anhtuannguyen',
    passWord: '54321'
}
describe('test api create admin', () => {
    it('! create admin', done => {
        chai.request(app)
            .post('/createAdmin')
            .send(dataAdmin)
            .end((err, res) => {
                expect(res.body).is.exist
                done();
            })
    })
})

//createUser
const dataUser = {
    firstName: 'anh',
    lastName: 'tung',
    email: 'anhtuan@',
    university: 'hust',
    mobile: '2313',
    identityCard: '31233131321'
}
describe('Test api createUser', () => {
    it('createUser', done => {
        chai.request(app)
            .post('/createUser')
            .send(dataUser)
            .end((err, res) => {
                expect(res.body.success).to.equal(true)
                assert.toString(res.body.message)
                done()
            })
    })
})

//getAllUser
describe('test api getAllUser', () => {
    it('/getAllUser ', done => {
        chai.request(app)
            .get('/getAllUser')
            .end((err, res) => {
                assert(res.body).to.exist
                done();
            })
    })
})