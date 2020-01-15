import express from 'express';
import * as questionController from '../controller/question';
import * as testTemplateController from '../controller/testTemplate';
import * as entryCodeController from '../controller/entryCode';
import * as learningPathController from '../controller/learningPath';
import * as adminController from '../controller/admin'
import * as candidateController from '../controller/candidate'
import * as jobController from '../controller/jobs'
import * as applierController from '../controller/applier'
import * as locationController from '../controller/location'
import * as offerController from '../controller/offer'
import * as universityController from '../controller/university'
// import * as englishExamController from '../controller/'
import { checkTokenRole, checkToken } from '../midleware/checkCode';
import { checkTemplate } from '../midleware/checkTemplate'
import { checkGen, checkCreateCode } from '../midleware/checkGenerateCode'
import multer from 'multer';
import * as panelController from '../controller/panel';
import * as postControlller from '../controller/post';
import * as testimonialController from '../controller/testimonial';
import * as categoryController from '../controller/category';
import { requireRole } from '../midleware/requireRole';
import * as courseController from '../controller/course';

import uid from "uid";

const router = express.Router();


/* api user */
router.get("/limit-list-panel", panelController.getLimitPanel)
router.post('/checkCode', entryCodeController.checkCode);

router.get('/showData', checkToken, entryCodeController.showData);
router.post('/startTest', checkToken, entryCodeController.startTest);
router.post('/listQuestion', checkToken, entryCodeController.listQuestion);
router.post('/end-test', checkToken, entryCodeController.endTest);
router.get('/finish-test', checkToken, entryCodeController.finishTest);


/* api admin */
/*----------generate code ------------*/
router.get('/getDataEntry', checkTokenRole, requireRole("Admin,Hr"), entryCodeController.getDataEntry)
router.post('/createEntryCode', checkTokenRole, requireRole("Admin,Hr"), entryCodeController.createEntryCode);
router.post('/autoCreateEntryCode', checkTokenRole, requireRole("Admin,Hr"), entryCodeController.autoCreateEntryCode);
router.get('/getAllEntryCode', checkTokenRole, requireRole("Admin,Hr"), entryCodeController.getAllEntryCode)
router.patch('/regenerate', checkTokenRole, requireRole("Admin,Hr"), entryCodeController.regenerate);
router.delete('/deleteEntryCode/:idEntryCode/:idCandidate', checkTokenRole, requireRole("Admin,Hr"), entryCodeController.deleteEntryCode)


/*-----------template language---------*/
router.get('/getAllTemplate', checkTokenRole, requireRole("Admin,Hr"), testTemplateController.getAllTemplate)
router.post('/createTemplate', checkTokenRole, requireRole("Admin,Hr"), checkTemplate, testTemplateController.createTemplate);
router.delete('/deleteTemplate/:id', checkTokenRole, requireRole("Admin,Hr"), testTemplateController.deleteTemplate)


//report detail test
router.get('/report-detail-test/:code', entryCodeController.reportTestDetail);


/*-----------admin------------------- */
router.post('/createAdmin', checkTokenRole, requireRole("Admin"), adminController.createAdmin);
router.delete('/deleteAdmin/:id', checkTokenRole, requireRole("Admin"), adminController.deleteAdmin);
router.patch('/editAdmin/:id', checkTokenRole, requireRole("Admin"), adminController.editAdmin);
router.get('/getAllAdmin', checkTokenRole, requireRole("Admin"), adminController.getAllAdmin);
router.get('/getAdminById/:id', checkTokenRole, requireRole("Admin"), adminController.getAdminById);

/*-----------Candidate------------------- */
router.post('/createCandidate', checkTokenRole, requireRole("Admin,Hr"), candidateController.createCanidate);
router.get('/getAllCandidate', checkTokenRole, requireRole("Admin,Hr"), candidateController.getAllCandidate);
router.get('/getCandidateById/:id', checkTokenRole, requireRole("Admin,Hr"), candidateController.getCandidateById)
router.patch('/editCandidate/:id', checkTokenRole, requireRole("Admin,Hr"), candidateController.editCandidate)
router.delete('/deleteCandidate/:id', checkTokenRole, requireRole("Admin,Hr"), candidateController.deleteCandidate)
router.post(`/importCandidateByExcel`, checkTokenRole, requireRole("Admin,Hr"), candidateController.importCandidate, entryCodeController.autoCreateEntryCode)


/*----------question----------------*/
const uidEnglish = uid(10)
const storageQuestionEnglish = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        req.body.uidEnglish = uidEnglish
        cb(null, `${uidEnglish}-${req.body.testCode}-${file.originalname}`)
    }
})
const uploadQuestionEnglish = multer({ storage: storageQuestionEnglish });

const storageQuestion = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        const fileNameStore = `${uid(10)}-${file.originalname}`
        req.body.fileNameStore = fileNameStore
        cb(null, fileNameStore)
    }
})
const uploadQuestion = multer({ storage: storageQuestion });
router.post('/uploadFileEnglish', checkTokenRole, requireRole("Admin,Hr"), uploadQuestionEnglish.any(), questionController.uploadEnglishExam)
router.post('/uploadFile', checkTokenRole, requireRole("Admin,Hr"), uploadQuestion.any(), questionController.uploadFile)
router.post('/addQuestion', checkTokenRole, requireRole("Admin,Hr"), questionController.addQuestion)
router.get('/getAllQuestion', checkTokenRole, requireRole("Admin,Hr"), questionController.exportQuestionFromDB);
router.get('/getQuestionById/:id', checkTokenRole, requireRole("Admin,Hr"), questionController.getQuestionById)
router.post('/editQuestion/:id', checkTokenRole, requireRole("Admin,Hr"), questionController.editQuestion);
router.delete('/deleteQuestion/:id', checkTokenRole, requireRole("Admin,Hr"), questionController.deleteQuestion);


/*----------English------------*/
router.get('/getEnglishExam', checkTokenRole, requireRole("Admin,Hr"))


/*----------common------------*/
//signIn Admin
router.post('/signIn', adminController.signIn);

/*-----------panel-------------*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, uid(10) + "_" + file.originalname)
    }
})
const upload = multer({ storage: storage });


router.post('/createPanel', checkTokenRole, requireRole("Admin,Hr"), upload.single("file"), panelController.create);
router.get("/list-panel", checkTokenRole, requireRole("Admin,Hr"), panelController.list)
router.delete("/delete/:id", checkTokenRole, requireRole("Admin,Hr"), panelController.remove);
router.delete("/delete-multiple/:ids", checkTokenRole, requireRole("Admin,Hr"), panelController.removeMultiple);
router.put("/edit/:id", checkTokenRole, requireRole("Admin,Hr"), upload.single("file"), panelController.edit);
router.get("/panel/:id", checkTokenRole, requireRole("Admin,Hr"), panelController.getById);
/*--------------post------------*/
router.post('/search-post', postControlller.search)
router.post("/list-post-order", postControlller.listOrder)
router.post('/createPost', checkTokenRole, requireRole("Admin,Hr"), upload.any(), postControlller.create);
router.get("/list-post", postControlller.list)
router.delete("/delete-post/:id", checkTokenRole, requireRole("Admin,Hr"), postControlller.remove);
router.put("/edit-post/:id", checkTokenRole, requireRole("Admin,Hr"), upload.any(), postControlller.edit);
router.get("/post/:id", postControlller.getById);

//testimonialController
router.post('/createTestimonial', checkTokenRole, requireRole("Admin,Hr"), upload.any(), testimonialController.create);
router.get("/list-testimonial", testimonialController.list)
router.delete("/delete-testimonial/:id", checkTokenRole, requireRole("Admin,Hr"), testimonialController.remove);
router.post("/edit-testimonial/:id", checkTokenRole, requireRole("Admin,Hr"), upload.any(), testimonialController.edit);
router.get("/testimonial/:id", testimonialController.getById);

router.post('/createCategory', checkTokenRole, requireRole("Admin,Hr"), upload.any(), categoryController.create);
router.get("/list-category", categoryController.list)
router.post("/edit-category/:id", checkTokenRole, requireRole("Admin,Hr"), upload.any(), categoryController.edit);
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
router.post('/create-learning-path', checkTokenRole, learningPathController.create);
router.get('/list-learning-path', learningPathController.list);
router.get('/get-learning-path/:id', checkTokenRole, learningPathController.getById);
router.post('/edit-learning-path/:id', checkTokenRole, learningPathController.edit)
router.post('/delete-learning-path/:id', checkTokenRole, learningPathController.remove)

//jobs
router.post('/create-job', checkTokenRole, requireRole("Admin,Hr"), jobController.create)
router.get('/list-jobs', jobController.list)
router.get('/get-job/:id', jobController.getOne)
router.post('/edit-job/:id', checkTokenRole, requireRole("Admin,Hr"), jobController.edit)
router.post('/delete-job/:id', checkTokenRole, requireRole("Admin,Hr"), jobController.remove)

router.get('/list-jobs/category/:category', jobController.listCategory)
router.get('/list-jobs/location/:location', jobController.listLocation)
router.get('/list-jobs/hashtag/:hashtag', jobController.listHashtag)
router.get('/list-jobs/:category/:location', jobController.listCategoryLocation)

//location
router.post('/create-location', checkTokenRole, requireRole("Admin,Hr"), locationController.create)
router.get('/list-location', locationController.list)
router.get('/get-location/:id', checkTokenRole, requireRole("Admin,Hr"), locationController.getOne)
router.post('/edit-location/:id', checkTokenRole, requireRole("Admin,Hr"), locationController.edit)
router.post('/delete-location/:id', checkTokenRole, requireRole("Admin,Hr"), locationController.remove)

//offer
router.post('/create-offer', checkTokenRole, requireRole("Admin,Hr"), offerController.create)
router.get('/list-offer', checkTokenRole, offerController.list)
router.get('/get-offer/:id', checkTokenRole, offerController.getOne)
router.post('/edit-offer/:id', checkTokenRole, requireRole("Admin,Hr"), offerController.edit)
router.post('/delete-offer/:id', checkTokenRole, requireRole("Admin,Hr"), offerController.remove)

//applier
const storageApplier = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        const fileNameStore = `${uid(10)}_${file.originalname}`
        console.log('fileNameStore', fileNameStore)
        req.body.cv = fileNameStore
        cb(null, fileNameStore)
    }
})
const uploadApplier = multer({ storage: storageApplier });
router.post('/create-applier', uploadApplier.any(), applierController.create)
router.get('/list-applier', checkTokenRole, applierController.list)
router.get('/get-applier/:id', checkTokenRole, applierController.getOne)
router.post('/edit-applier/:id', checkTokenRole, requireRole("Admin,Hr"), applierController.edit)
router.post('/delete-applier/:id', checkTokenRole, requireRole("Admin,Hr"), applierController.remove)

//university
// const uploadApplier = multer({ storage: storageApplier });
const storageUniversity = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        const fileNameStore = `${uid(10)}_${file.originalname}`
        console.log('fileNameStore', fileNameStore)
        req.body.fileUniversity = fileNameStore
        cb(null, fileNameStore)
    }
})
const uploadUniversity = multer({ storage: storageUniversity });
router.post('/import-university', checkTokenRole, requireRole("Admin,Hr"), uploadUniversity.any(), universityController.importFile)
router.post('/create-university', checkTokenRole, requireRole("Admin,Hr"), universityController.create)
router.get('/list-university', universityController.list)
router.get('/get-university/:id', universityController.getOne)
router.post('/edit-university/:id', checkTokenRole, requireRole("Admin,Hr"), universityController.edit)
router.post('/delete-university/:id', checkTokenRole, requireRole("Admin,Hr"), universityController.remove)

//course
router.get('/list-myCourse/:id', learningPathController.listMyCourse)
router.post('/updateResultVideo', courseController.updateResultVideo)

//quiz
router.get('/list-quiz/:idCourse/:idSection/:idLecture', questionController.getQuiz);

//calculator point learning path 
router.post('/end-english-test', checkToken, entryCodeController.endEnglishTest)
router.get('/list-entry-english-test', entryCodeController.getAllEnglishTest)

router.get('/count-english-not-point', entryCodeController.countEnglishNotPoint)
router.get('/get-question-essay-english-test/:id', entryCodeController.getQuestionEssayEnglishTest)
router.post('/save-point-mark-english', entryCodeController.savePointEssayToDb);

export default router;
