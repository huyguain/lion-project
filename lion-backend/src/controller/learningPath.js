import {
    createLearningPath, listLearningPath, getLearningById,
    editLearningById, removeLearning, listLearning,
    _getLearningPathName, _getLearningPath
} from '../models/LearningPath';
import { _getAllCourse } from '../models/course'
import { listCourse } from '../models/courseUser';


export const create = async (req, res) => {
    let { language, learningPath, courseIds, title, content } = req.body
    createLearningPath(language, learningPath, courseIds, title, content, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "error"
            })
        } else {
            res.json({
                success: true,
                message: "success"
            })
        }
    })
}

export const listMyCourse = async (req, res) => {
    try {
        let { id } = req.params;
        let dataLearning = [];
        let dataCourse = [];
        let dataSet = new Set();
        let dataAll = await listCourse(id);
        if (dataAll === []) {
            throw ('No Data!')
        } else {
            for (let i of dataAll) {
                if (i.courseId) {
                    dataCourse.push(i.courseId)
                    let _data = await listLearning(i.courseId._id._id);
                    for (let j of _data) {
                        let obj = {
                            learningPath: j.learningPath,
                            idCourse: i.courseId._id._id
                        }
                        dataLearning.push(obj)
                    }
                }
            }
            dataLearning.map((v, i) => {
                dataSet.add(v.learningPath)
            })
            let dataLearningPath = []
            for (const i of dataSet) {
                let dataIdCourse = [];
                dataLearning.map(v => {
                    if (i === v.learningPath) {
                        dataIdCourse.push(v.idCourse);
                    }
                })
                let obj = {
                    name: i,
                    data: dataIdCourse
                }
                dataLearningPath.push(obj)
            }
            res.json({
                success: true,
                message: "success",
                dataCourse,
                dataLearningPath
            })
        };

    } catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
}

export const list = async (req, res) => {
    listLearningPath((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: "error"
            })
        } else {
            res.json({
                success: true,
                message: "success",
                data
            })
        }
    })
}

export const getById = (req, res) => {
    const { id } = req.params
    getLearningById(id, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: 'error'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'success',
                data
            })
        }
    })
}

export const edit = (req, res) => {
    const { id } = req.params
    const { language, learningPath, courseIds, title, content } = req.body
    editLearningById(id, language, learningPath, courseIds, title, content, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: 'error'
            })
        } else {
            res.json({
                success: true,
                message: 'success'
            })
        }
    })
}

export const remove = (req, res) => {
    const { id } = req.params
    removeLearning(id, err => {
        if (err) {
            res.json({
                success: false,
                message: 'error'
            })
        } else {
            res.json({
                success: true,
                message: 'success'
            })
        }
    })
}
//getLearningPathName
export const getLearningPathName = async (req, res) => {
    try {
        let dataLearning = await _getLearningPathName();
        if (dataLearning.length === 0) {
            throw ('Learning Path Does Not Existed !')
        } else {
            res.status(200).json({
                success: true,
                dataLearning,
            })
        }
    } catch (error) {
        res.status(203).json({
            success: false,
            message: error
        })
    }
}
//getLearningPath
export const getLearningPath = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw ('No Data')
        } else {
            let dataLearning = await _getLearningPath(id);
            if (!dataLearning) {
                throw (`Can't Not Get Learning !`)
            } else {
                let dataCourse = await _getAllCourse();
                res.status(200).json({
                    success: true,
                    dataLearning,
                    dataCourse
                })
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}