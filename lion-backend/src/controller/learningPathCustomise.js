import {
    _createLearningPathCus,
    _getAllLearningCus,
    _deleteLearningCus,
    _getLearningCusById,
    _editLearningCusById
} from '../models/learningPathCustomise';
import { _getAllCourse } from '../models/course'
export const createLearningPathCus = async (req, res) => {
    try {
        const { dataLearningPathCus } = req.body;
        if (!dataLearningPathCus) {
            throw ('No Data !')
        } else {
            let dataCoures = new Set();
            for (const id of dataLearningPathCus.courseIds) {
                dataCoures.add(id)
            }
            let dataCus = _createLearningPathCus(dataLearningPathCus, dataCoures)
            if (!dataCus) {
                throw (`Can't Create Learning Path`)
            } else {
                res.status(204).end()
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//getAllLearningCus
export const getAllLearningCus = async (req, res) => {
    try {
        let dataLearning = await _getAllLearningCus();
        res.status(200).json({
            success: true,
            dataLearning
        })
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//deleteLearningCus
export const deleteLearningCus = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw ('No Data !')
        } else {
            let checkLearning = await _deleteLearningCus(id);
            if (checkLearning) {
                res.status(204).end()
            } else {
                throw (`Can't Delete Learning !`)
            }
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//getLearningCusById
export const getLearningCusById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            throw ('No Data !')
        } else {
            let dataLearning = await _getLearningCusById(id);
            if (!dataLearning) {
                throw (`Can't Get Learning !`)
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
//editLearningCusById
export const editLearningCusById = async (req, res) => {
    try {
        const { id } = req.params;
        let { dataLearningPathCus } = req.body
        if (!id || !dataLearningPathCus) {
            throw ('No Data !')
        } else {
            let dataCoures = new Set();
            for (const id of dataLearningPathCus.courseIds) {
                dataCoures.add(id)
            }
            let dataLearning = await _editLearningCusById(id, dataLearningPathCus, dataCoures);
            if (!dataLearning) {
                throw (`Can't Update Learning !`)
            } else {
                res.status(204).end()
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}