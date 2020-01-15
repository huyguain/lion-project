import {
    _SignInAdmin,
    _createAdmin,
    _getAdminByUser,
    _getAllAdmin,
    _deleteAdmin,
    _getAdminById,
    _editAdmin,
} from '../models/admin'
import { _SignInFresher } from '../models/fresher'

export const signIn = async (req, res) => {
    try {
        let { userName, passWord, type } = req.body;
        if (!userName || !passWord || !type) {
            throw ('No Data!')
        } else {
            if (type === 'Admin') {
                let admin = await _SignInAdmin(userName, passWord);
                res.status(200).json({
                    success: true,
                    token: admin.token,
                })
            } else {
                let user = await _SignInFresher(userName, passWord);
                if (!user) throw ('Fresher does not exist !');
                res.status(200).json({
                    success: true,
                    token: user.token,
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
//create Admin
export const createAdmin = async (req, res) => {
    try {
        const { dataAdmin } = req.body;
        if (!dataAdmin) {
            throw ('No Data!');
        } else {
            let _dataAdmin = await _getAdminByUser(dataAdmin.userName);
            if (_dataAdmin) {
                throw ('Admin existed!')
            } else {
                let data = await _createAdmin(dataAdmin);
                if (data) {
                    res.status(204).end()
                } else {
                    throw (`Can't Not Create Admin`)
                }
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//getAllAdmin
export const getAllAdmin = async (req, res) => {
    try {
        let dataAdmin = await _getAllAdmin();
        res.status(200).json({
            success: true,
            dataAdmin
        })
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//delete Admin
export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw ('No Data')
        } else {
            let check = await _deleteAdmin(id);
            if (check) {
                res.status(204).end()
            } else {
                throw ('Delete Admin Error!')
            }
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//getAdminById
export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw ('No Data!')
        } else {
            let dataAdmin = await _getAdminById(id);
            if (dataAdmin) {
                res.status(200).json({
                    success: true,
                    dataAdmin
                })
            } else {
                throw (`Can't not get Admin!`)
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//editAdmin
export const editAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        let { dataAdmin } = req.body;
        if (!id || !dataAdmin) {
            throw ('No Data!')
        } else {
            let data = await _editAdmin(id, dataAdmin);
            if (data) {
                res.status(204).end()
            } else {
                throw (`Can't Not Updata Admin!`)
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}