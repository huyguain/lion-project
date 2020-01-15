import {
    importToDb,
    getAllQuestion,
    getQuestionBy_Id,
    add_question,
    edit_question,
    delete_question,
    getQuizModel
} from '../models/question';
import { getInfoQuestionQuiz } from '../models/course';
import { createEnglishTest } from '../models/englishExam'
import { importQues, readFileCsv } from '../lib/excelUtil';
import fs from 'fs';
import { create } from 'domain';
import csv from 'csvtojson';

export const exportQuestionFromDB = (req, res) => {
    getAllQuestion((err, data) => {
        if (err) res.status(400).send('Bad Request');
        else res.status(200).send(data)
    })
}
//upload data to server and save  to Database
export const uploadEnglishExam = async (req, res) => {
    let questions = []
    try {
        const fileName = `upload/${req.body.uidEnglish}-${req.body.testCode}-${req.body.data}`
        csv()
            .fromFile(fileName)
            .on('json', (jsonObj) => {
                questions.push(jsonObj)
            })
            .on('done', (error) => {
                let { testCode } = req.body
                let urlImage1 = `${req.files[0].filename}`
                let urlImage2 = `${req.files[1].filename}`
                createEnglishTest(testCode, urlImage1, urlImage2, questions, (err, result) => {
                    if (err) throw err
                })
                fs.unlink(fileName, err => { })
            })
        await res.end()
    } catch (err) {
        res.status(500).send('Upload Error!')
    }
}
export const uploadFile = async (req, res) => {
    try {
        console.log('den-roi', req.body.data, req.body.fileNameStore)
        let fileName = `upload/${req.body.fileNameStore}`
        console.log('fileName', fileName)
        await readFileCsv(fileName, async (err, data) => {
            if (err) throw err;
            try {
                await importToDb(data, async (_err, _data) => {
                    if (_err) throw _err
                })
                await fs.unlink(fileName, err => { })
                await res.end()
            } catch (err) {
                res.status(201).json({
                    success: false,
                    message: "Format File Error!"
                })
            }
        })
    } catch (err) {
        console.log('err', err)
        res.status(500).send('Upload Error!')
    }
}
export const getQuestionById = async (req, res) => {
    try {
        let { id } = req.params
        await getQuestionBy_Id(id, (err, data) => {
            res.status(200).send(data)
        })
    } catch (err) {
        res.status(500).send('Error!')
    }
}

export const addQuestion = async (req, res) => {
    try {
        await add_question(req.body, (err, data) => {
            res.status(200).send('Create question success')
        })
    } catch (err) {
        res.status(500).send('Create question error!')
    }
}
export const editQuestion = async (req, res) => {
    try {
        let { id } = req.params;
        await edit_question(id, req.body, (err, data) => {
            res.status(200).send('Edit success!')
        })
    } catch (err) {
        res.status(500).send('Edit Error!')
    }
}
export const deleteQuestion = async (req, res) => {
    try {
        let { id } = req.params
        await delete_question(id, (err, data) => {
            res.status(200).send('Delete success!')
        })
    } catch (err) {
        res.status(500).send('Delete Error!')
    }
}
export const getQuiz = async (req, res) => {

    const { idCourse, idSection, idLecture } = req.params;
    getInfoQuestionQuiz(idCourse, idSection, idLecture, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false
            })
        } else {
            const limit = data.infoQuiz.numberQuestion;
            getQuizModel(data.language, data.courseName, data.sectionName, limit ,  (err, questions) => {
                if (err) {
                    res.json({
                        success: false
                    })
                } else {
                    res.json({
                        success: true,
                        data: {
                            questions,
                            infoQuiz: data.infoQuiz,
                            sectionName: data.sectionName
                        }
                    })
                }
            })
        }
    })
}