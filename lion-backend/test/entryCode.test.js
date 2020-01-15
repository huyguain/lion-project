import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/index'
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHTTP);

////////////Check Code
//Code is not exist
const obj1 = {
    "code": "2asdadadad",
    "timeNow": "2017-11-24T05:26:35.855Z"
}
const result1 = {
    "check": false,
    "messages": "Code is not exist!"
}
//Code next page
const obj2 = {
    "code": "22lh4uy",
    "timeNow": "2017-11-24T05:26:35.855Z"
}
const result2 = {
    check: true,
    messages: "next page",
    name: 'Nguyen Anh Tuan',
}
//code success
const obj3 = {
    "code": "nx7gbhh",
    "timeNow": "2017-11-24T05:26:35.855Z"
}
const result3 = {
    "check": true,
    "messages": "Success",
    "name": "huy nguyen",
    "mobile": "01676866283",
    "question": 0,
    "duration": 30,
    "passScore": 15,
    "language": "java"
}
//code time error
const obj4 = {
    "code": "22lh4uy",
    "timeNow": "2017-11-23T05:26:35.855Z"
}
const result4 = {
    "check": false,
    "messages": "Time code error"
}

describe('Test app', () => {
    it('Check code err', (done) => {
        chai.request(app)
            .post('/checkCode')
            .send(obj1)
            .end((err, res) => {
                expect(res.body.messages).to.equal(result1.messages)
                expect(res.body.check).to.equal(result1.check)
                done()
            })
    })
    it('Check code next page', (done) => {
        chai.request(app)
            .post('/checkCode')
            .send(obj2)
            .end((err, res) => {
                expect(res.body.messages).to.equal(result2.messages)
                expect(res.body.check).to.equal(result2.check)
                done()
            })
    })
    it('Check code success', (done) => {
        chai.request(app)
            .post('/checkCode')
            .send(obj3)
            .end((err, res) => {
                expect(res.body.messages).to.equal(result3.messages)
                expect(res.body.check).to.equal(result3.check)
                expect(res.body.language).to.equal(result3.language)
                done()
            })
    })
    it('Check code time error', (done) => {
        chai.request(app)
            .post('/checkCode')
            .send(obj4)
            .end((err, res) => {
                expect(res.body.messages).to.equal(result4.messages)
                expect(res.body.check).to.equal(result4.check)
                done()
            })
    })
})

const obj5 = {
    "code": "nx7gbhh",
    "time": "2017-11-27T06:28:31.321Z"
}
const obj6 = {
    "time": "2017-11-27T06:28:33.321Z"
}
// Start test
describe('Start test', () => {
    it('!time || !code', (done) => {
        chai.request(app)
            .post('/startTest')
            .send(obj6)
            .end((err, res) => {
                assert.isNumber(res.status)
                assert.isString(res.text)
                done()
            })
    })
    it('!endTime || !startTime || endTime.getTime() - startTime.getTime() < 1000', (done) => {
        chai.request(app)
            .post('/startTest')
            .send(obj5)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body).to.equal("2017-11-27T06:58:31.321Z")
                done();
            })
    })
})
const result5 = {
    "time": "2017-11-27T06:58:31.321Z",
    "listQuestions": []
}
//List question
describe('list question', () => {
    it('!time || !code', (done) => {
        chai.request(app)
            .post('/startTest')
            .send(obj6)
            .end((err, res) => {
                assert.isNumber(res.status)
                assert.isString(res.text)
                done()
            })
    });

    it('data', (done) => {
        chai.request(app)
            .post('/startTest')
            .send(obj5)
            .end((err, res) => {
                assert.isNumber(res.status)
                done()
            })
    })
});

//getEntryCode
describe('Test api getEntryCode', () => {
    it('!getAllEntryCode', (done) => {
        chai.request(app)
            .get('/getEntryCode')
            .end((err, res) => {
                expect(res.body).to.exist
                done()
            })
    });
});
//deleteEntryCode
const dataDelete = {
    idEntryCode: '5a2de9534902761b1c8a120d',
    idUser: '121324'
}
describe('Test api deleteEntryCode', () => {
    it('!deleteEntryCode', (done) => {
        chai.request(app)
            .post('/deleteEntryCode')
            .send(dataDelete)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                assert.isString(res.text, 'oki')
                done()
            })
    });
});

//generateTest
const dataGen = {
    language: 'JavaScript',
    testName: 'Entry Test',
    email: 'anhtuan@1234',
    deadline: '2017-12-11T06:59:37.156Z'
}
describe('Test generateTest', () => {
    it('! update', (done) => {
        chai.request(app)
            .post('/generateTest')
            .send(dataGen)
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.message).to.equal('Update success!!!')
                done()
            })
    })
})


//uploadQuestions
const fileName = 'src/files/question.xlsx'
describe('uploadQuestions', () => {
    it('!importDataToDB', (done) => {
        chai.request(app)
            .post('/uploadQuestions')
            .set('Content-Type', 'multipart/form-data')
            .attach('filename', fileName)
            .end((res) => {
                console.log(res.status)
                done();
            })
    })
})
///end-test
const dataEndTest = {
    duration: '586351',
    answers: [
        {
            id: "5a2deeaf5c0d32098caff68b",
            answer: ["a"]
        },
        {
            id: "5a1e1e9631d0bb122028f058",
            answer: ["b"]
        },
        {
            id: "5a1f78e62084840cb077ab80",
            answer: ["c"]
        }
    ]
}

//test api end-test
describe('Test api end-test', () => {
    it('/end-test', done => {
        chai.request(app)
            .post('/end-test')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiaHlveThtbSIsImlhdCI6MTUxMjk4MTAxM30.z9Lja9U89YEe8G6nQ-LbGzjDHo7omfC_xZb9FPkE_tg')
            .send(dataEndTest)
            .end((err, res) => {
                expect(res.body.success).to.equal(true)
                expect(res.status).to.equal(200)
                done();
            })
    })
})

///finish-test
describe('test api finish-test', () => {
    it('/finish-test', done => {
        chai.request(app)
            .get('/finish-test')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiaHlveThtbSIsImlhdCI6MTUxMjk4MTAxM30.z9Lja9U89YEe8G6nQ-LbGzjDHo7omfC_xZb9FPkE_tg')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true)
                done();
            })
    })
})

//showData
describe('test api showData', () => {
    it('/showData', done => {
        chai.request(app)
            .get('/showData')
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiaHlveThtbSIsImlhdCI6MTUxMjk4MTAxM30.z9Lja9U89YEe8G6nQ-LbGzjDHo7omfC_xZb9FPkE_tg')
            .end((err, res) => {
                expect(res.body).to.exist
                done()
            })
    })
})