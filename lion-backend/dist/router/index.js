'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _question = require('../controller/question');

var questionController = _interopRequireWildcard(_question);

var _testTemplate = require('../controller/testTemplate');

var testTemplateController = _interopRequireWildcard(_testTemplate);

var _entryCode = require('../controller/entryCode');

var entryCodeController = _interopRequireWildcard(_entryCode);

var _learningPath = require('../controller/learningPath');

var learningPathController = _interopRequireWildcard(_learningPath);

var _admin = require('../controller/admin');

var adminController = _interopRequireWildcard(_admin);

var _candidate = require('../controller/candidate');

var candidateController = _interopRequireWildcard(_candidate);

var _jobs = require('../controller/jobs');

var jobController = _interopRequireWildcard(_jobs);

var _applier = require('../controller/applier');

var applierController = _interopRequireWildcard(_applier);

var _location = require('../controller/location');

var locationController = _interopRequireWildcard(_location);

var _offer = require('../controller/offer');

var offerController = _interopRequireWildcard(_offer);

var _university = require('../controller/university');

var universityController = _interopRequireWildcard(_university);

var _checkCode = require('../midleware/checkCode');

var _checkTemplate = require('../midleware/checkTemplate');

var _checkGenerateCode = require('../midleware/checkGenerateCode');

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _panel = require('../controller/panel');

var panelController = _interopRequireWildcard(_panel);

var _post = require('../controller/post');

var postControlller = _interopRequireWildcard(_post);

var _testimonial = require('../controller/testimonial');

var testimonialController = _interopRequireWildcard(_testimonial);

var _category = require('../controller/category');

var categoryController = _interopRequireWildcard(_category);

var _requireRole = require('../midleware/requireRole');

var _course = require('../controller/course');

var courseController = _interopRequireWildcard(_course);

var _uid = require('uid');

var _uid2 = _interopRequireDefault(_uid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* api user */

// import * as englishExamController from '../controller/'
router.get("/limit-list-panel", panelController.getLimitPanel);
router.post('/checkCode', entryCodeController.checkCode);

router.get('/showData', _checkCode.checkToken, entryCodeController.showData);
router.post('/startTest', _checkCode.checkToken, entryCodeController.startTest);
router.post('/listQuestion', _checkCode.checkToken, entryCodeController.listQuestion);
router.post('/end-test', _checkCode.checkToken, entryCodeController.endTest);
router.get('/finish-test', _checkCode.checkToken, entryCodeController.finishTest);

/* api admin */
/*----------generate code ------------*/
router.get('/getDataEntry', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), entryCodeController.getDataEntry);
router.post('/createEntryCode', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), entryCodeController.createEntryCode);
router.post('/autoCreateEntryCode', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), entryCodeController.autoCreateEntryCode);
router.get('/getAllEntryCode', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), entryCodeController.getAllEntryCode);
router.patch('/regenerate', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), entryCodeController.regenerate);
router.delete('/deleteEntryCode/:idEntryCode/:idCandidate', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), entryCodeController.deleteEntryCode);

/*-----------template language---------*/
router.get('/getAllTemplate', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), testTemplateController.getAllTemplate);
router.post('/createTemplate', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), _checkTemplate.checkTemplate, testTemplateController.createTemplate);
router.delete('/deleteTemplate/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), testTemplateController.deleteTemplate);

//report detail test
router.get('/report-detail-test/:code', entryCodeController.reportTestDetail);

/*-----------admin------------------- */
router.post('/createAdmin', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin"), adminController.createAdmin);
router.delete('/deleteAdmin/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin"), adminController.deleteAdmin);
router.patch('/editAdmin/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin"), adminController.editAdmin);
router.get('/getAllAdmin', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin"), adminController.getAllAdmin);
router.get('/getAdminById/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin"), adminController.getAdminById);

/*-----------Candidate------------------- */
router.post('/createCandidate', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), candidateController.createCanidate);
router.get('/getAllCandidate', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), candidateController.getAllCandidate);
router.get('/getCandidateById/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), candidateController.getCandidateById);
router.patch('/editCandidate/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), candidateController.editCandidate);
router.delete('/deleteCandidate/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), candidateController.deleteCandidate);
router.post('/importCandidateByExcel', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), candidateController.importCandidate, entryCodeController.autoCreateEntryCode);

/*----------question----------------*/
var uidEnglish = (0, _uid2.default)(10);
var storageQuestionEnglish = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './upload');
    },
    filename: function filename(req, file, cb) {
        req.body.uidEnglish = uidEnglish;
        cb(null, uidEnglish + '-' + req.body.testCode + '-' + file.originalname);
    }
});
var uploadQuestionEnglish = (0, _multer2.default)({ storage: storageQuestionEnglish });

var storageQuestion = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './upload');
    },
    filename: function filename(req, file, cb) {
        var fileNameStore = (0, _uid2.default)(10) + '-' + file.originalname;
        req.body.fileNameStore = fileNameStore;
        cb(null, fileNameStore);
    }
});
var uploadQuestion = (0, _multer2.default)({ storage: storageQuestion });
router.post('/uploadFileEnglish', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), uploadQuestionEnglish.any(), questionController.uploadEnglishExam);
router.post('/uploadFile', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), uploadQuestion.any(), questionController.uploadFile);
router.post('/addQuestion', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), questionController.addQuestion);
router.get('/getAllQuestion', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), questionController.exportQuestionFromDB);
router.get('/getQuestionById/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), questionController.getQuestionById);
router.post('/editQuestion/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), questionController.editQuestion);
router.delete('/deleteQuestion/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), questionController.deleteQuestion);

/*----------English------------*/
router.get('/getEnglishExam', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"));

/*----------common------------*/
//signIn Admin
router.post('/signIn', adminController.signIn);

/*-----------panel-------------*/

var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './upload');
    },
    filename: function filename(req, file, cb) {
        cb(null, (0, _uid2.default)(10) + "_" + file.originalname);
    }
});
var upload = (0, _multer2.default)({ storage: storage });

router.post('/createPanel', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), upload.single("file"), panelController.create);
router.get("/list-panel", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), panelController.list);
router.delete("/delete/:id", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), panelController.remove);
router.delete("/delete-multiple/:ids", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), panelController.removeMultiple);
router.put("/edit/:id", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), upload.single("file"), panelController.edit);
router.get("/panel/:id", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), panelController.getById);
/*--------------post------------*/
router.post('/search-post', postControlller.search);
router.post("/list-post-order", postControlller.listOrder);
router.post('/createPost', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), upload.any(), postControlller.create);
router.get("/list-post", postControlller.list);
router.delete("/delete-post/:id", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), postControlller.remove);
router.put("/edit-post/:id", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), upload.any(), postControlller.edit);
router.get("/post/:id", postControlller.getById);

//testimonialController
router.post('/createTestimonial', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), upload.any(), testimonialController.create);
router.get("/list-testimonial", testimonialController.list);
router.delete("/delete-testimonial/:id", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), testimonialController.remove);
router.post("/edit-testimonial/:id", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), upload.any(), testimonialController.edit);
router.get("/testimonial/:id", testimonialController.getById);

router.post('/createCategory', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), upload.any(), categoryController.create);
router.get("/list-category", categoryController.list);
router.post("/edit-category/:id", _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), upload.any(), categoryController.edit);
router.get("/Category/:id", categoryController.getById);
router.get("/getCategoryByTitle/:title", categoryController.getByTitle);

/*----------course---------*/
router.get('/youtube', courseController.youtube1);
router.post('/createCourse', upload.any(), courseController.create);
router.get('/course/:id', courseController.getById);
router.get('/getCourse/:id', courseController.getCourse);
router.get('/list-course', courseController.list);
router.get('/search-suggest-course/:value', courseController.search);
router.put('/edit-course/:id', upload.any(), courseController.edit);
router.delete('/delete-panel/:id', courseController.remove);
// // LearningPath
router.post('/create-learning-path', _checkCode.checkTokenRole, learningPathController.create);
router.get('/list-learning-path', learningPathController.list);
router.get('/get-learning-path/:id', _checkCode.checkTokenRole, learningPathController.getById);
router.post('/edit-learning-path/:id', _checkCode.checkTokenRole, learningPathController.edit);
router.post('/delete-learning-path/:id', _checkCode.checkTokenRole, learningPathController.remove);

//jobs
router.post('/create-job', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), jobController.create);
router.get('/list-jobs', jobController.list);
router.get('/get-job/:id', jobController.getOne);
router.post('/edit-job/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), jobController.edit);
router.post('/delete-job/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), jobController.remove);

router.get('/list-jobs/category/:category', jobController.listCategory);
router.get('/list-jobs/location/:location', jobController.listLocation);
router.get('/list-jobs/hashtag/:hashtag', jobController.listHashtag);
router.get('/list-jobs/:category/:location', jobController.listCategoryLocation);

//location
router.post('/create-location', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), locationController.create);
router.get('/list-location', locationController.list);
router.get('/get-location/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), locationController.getOne);
router.post('/edit-location/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), locationController.edit);
router.post('/delete-location/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), locationController.remove);

//offer
router.post('/create-offer', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), offerController.create);
router.get('/list-offer', _checkCode.checkTokenRole, offerController.list);
router.get('/get-offer/:id', _checkCode.checkTokenRole, offerController.getOne);
router.post('/edit-offer/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), offerController.edit);
router.post('/delete-offer/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), offerController.remove);

//applier
var storageApplier = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './upload');
    },
    filename: function filename(req, file, cb) {
        var fileNameStore = (0, _uid2.default)(10) + '_' + file.originalname;
        console.log('fileNameStore', fileNameStore);
        req.body.cv = fileNameStore;
        cb(null, fileNameStore);
    }
});
var uploadApplier = (0, _multer2.default)({ storage: storageApplier });
router.post('/create-applier', uploadApplier.any(), applierController.create);
router.get('/list-applier', _checkCode.checkTokenRole, applierController.list);
router.get('/get-applier/:id', _checkCode.checkTokenRole, applierController.getOne);
router.post('/edit-applier/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), applierController.edit);
router.post('/delete-applier/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), applierController.remove);

//university
// const uploadApplier = multer({ storage: storageApplier });
var storageUniversity = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './upload');
    },
    filename: function filename(req, file, cb) {
        var fileNameStore = (0, _uid2.default)(10) + '_' + file.originalname;
        console.log('fileNameStore', fileNameStore);
        req.body.fileUniversity = fileNameStore;
        cb(null, fileNameStore);
    }
});
var uploadUniversity = (0, _multer2.default)({ storage: storageUniversity });
router.post('/import-university', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), uploadUniversity.any(), universityController.importFile);
router.post('/create-university', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), universityController.create);
router.get('/list-university', universityController.list);
router.get('/get-university/:id', universityController.getOne);
router.post('/edit-university/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), universityController.edit);
router.post('/delete-university/:id', _checkCode.checkTokenRole, (0, _requireRole.requireRole)("Admin,Hr"), universityController.remove);

//course
router.get('/list-myCourse/:id', learningPathController.listMyCourse);
router.post('/updateResultVideo', courseController.updateResultVideo);

//quiz
router.get('/list-quiz/:idCourse/:idSection/:idLecture', questionController.getQuiz);

//calculator point learning path 
router.post('/end-english-test', _checkCode.checkToken, entryCodeController.endEnglishTest);
router.get('/list-entry-english-test', entryCodeController.getAllEnglishTest);

router.get('/count-english-not-point', entryCodeController.countEnglishNotPoint);
router.get('/get-question-essay-english-test/:id', entryCodeController.getQuestionEssayEnglishTest);
router.post('/save-point-mark-english', entryCodeController.savePointEssayToDb);

exports.default = router;
//# sourceMappingURL=index.js.map