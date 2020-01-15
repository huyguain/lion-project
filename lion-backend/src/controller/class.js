import { _getFresherForClass } from '../models/fresher';
import { _getLearningForClass } from '../models/learningPathCustomise';
import {
    _createClass,
    _getClassByClassName,
    _getAllClass,
    _deleteClass,
    _getClassById,
    _editClass
} from '../models/class'
export const getDataClass = async (req, res) => {
    try {
        let dataFresher = await _getFresherForClass();
        if (dataFresher.length === 0) {
            throw ('No Data Frehser !')
        } else {
            let dataLearning = await _getLearningForClass();
            if (dataLearning.length === 0) {
                throw (`No Data Learning !`)
            } else {
                res.status(200).json({
                    success: true,
                    dataFresher,
                    dataLearning
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
//createClass
export const createClass = async (req, res) => {
    try {
        let { dataClass } = req.body;
        if (!dataClass) {
            throw ('No Data')
        } else {
            let dataCheck = await _getClassByClassName(dataClass.className);
            if (!dataCheck) {
                let data = await _createClass(dataClass);
                if (data) {
                    res.status(204).end()
                } else {
                    throw (`Can't Create Class`)
                }
            } else {
                throw (`Class Existed !`)
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//getAllClass
export const getAllClass = async (req, res) => {
    try {
        let dataClass = await _getAllClass();
        res.status(200).json({
            success: true,
            dataClass
        })
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//deleteClass
export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw ('No Data !')
        } else {
            let checkClass = await _deleteClass(id);
            if (checkClass) {
                res.status(204).end()
            } else {
                throw (`Can't Delete Class!`)
            }
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//getClassById
export const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw ('No Data !')
        } else {
            let dataClass = await _getClassById(id);
            if (!dataClass) {
                throw (`Can't Get Class`)
            } else {
                res.status(200).json({
                    success: true,
                    dataClass
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
//editClass
export const editClass = async (req, res) => {
    try {
        const { id } = req.params;
        let { dataClass } = req.body
        if (!id || !dataClass) {
            throw ('No Data !')
        } else {
            let dataCheck = await _getClassByClassName(dataClass.className);
            if (!dataCheck) {
                let data = await _editClass(id, dataClass);
                if (!data) {
                    throw (`Can't Update Class !`)
                } else {
                    res.status(204).end()
                }
            } else {
                throw (`Class Existed !`)
            }

        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}