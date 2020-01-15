import {
    _createCampuslink,
    _getCampuslinkByUserName,
    _getAllFresher,
    _deleteFresherById,
    _getFresherById,
    _editFresherById
} from '../models/fresher'
export const createCampuslink = async (req, res) => {
    try {
        const { dataCampuslink } = req.body;
        if (!dataCampuslink) {
            throw ('No Data !')
        } else {
            let checkCampus = await _getCampuslinkByUserName(dataCampuslink.userName);
            if (!checkCampus) {
                let dataCampus = _createCampuslink(dataCampuslink);
                if (dataCampus) {
                    res.status(204).end()
                } else {
                    throw (`Can't Create Campuslink !`)
                }
            } else {
                throw ('Campuslink existed !')
            }
        }

    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//getAllFresher
export const getAllFresher = async (req, res) => {
    try {
        let dataFresher = await _getAllFresher();
        res.status(200).json({
            success: true,
            dataFresher
        })
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//deleteFresherById
export const deleteFresherById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw (`No Data !`)
        } else {
            let checkFresher = await _deleteFresherById(id);
            if (checkFresher) {
                res.status(204).end();
            } else {
                throw (`Can't Delete Fresher`)
            }
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//getFresherById
export const getFresherById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw ('No Data !')
        } else {
            let dataFresher = await _getFresherById(id);
            if (!dataFresher) {
                throw (`Can't Get Fresher !`)
            } else {
                res.status(200).json({
                    success: true,
                    dataFresher
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
//editFresherById
export const editFresherById = async (req, res) => {
    try {
        const { id } = req.params;
        let { dataCampuslink } = req.body
        if (!id || !dataCampuslink) {
            throw ('No Data !')
        } else {
            let dataFresher = await _editFresherById(id, dataCampuslink);
            if(!dataFresher){
                throw (`Can't Update Fresher !`)
            }else{
                res.status(204).end()
            }
        }
    } catch (err) {
        res.status(203).json({
            success: true,
            message: err
        })
    }
}