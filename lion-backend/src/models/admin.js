import mongoose, { Mongoose, Schema } from 'mongoose';
import { generateToken, generateTokenUser } from '../lib/util';
import md5 from 'md5';

let Admin = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    passWord: String,
    role: { type: Number, min: 1, max: 3 }, //1: SuperAdmin, 2: Design, 3: Hr;
    mobile: Number,
    token: String,
})
const adminTable = mongoose.model('Admin', Admin);
//signIn
export const _SignInAdmin = (userName, passWord) => {
    return adminTable.findOne({ userName, passWord: md5(passWord) })
        .exec((err, user) => {
            if (err) {
                return ("Username or password is not exitst");
            } else if (user) {
                let token = generateTokenUser(userName, user.role, user._id);
                user.token = token;
                user.save();
                return user
            } else {
                return ("System error in Authentication")
            }
        })
}
//create admin
export const _createAdmin = (dataAdmin) => {
    const _adminTable = new adminTable({
        firstName: dataAdmin.firstName,
        lastName: dataAdmin.lastName,
        userName: dataAdmin.userName,
        passWord: md5(dataAdmin.passWord),
        role: dataAdmin.role, //1: SuperAdmin, 2: Design, 3: Hr;
        mobile: dataAdmin.mobile,
    });
    return _adminTable.save((err, data) => {
        if (err) {
            return ('Admin Create Error!');
        } else {
            return data;
        }
    })
}
//get admin by User
export const _getAdminByUser = (userName) => {
    return adminTable.findOne({ userName })
        .exec((err, data) => {
            if (err) {
                return ('Get data admin error!')
            } else {
                return data;
            }
        })
}
//getAllAdmin
export const _getAllAdmin = () => {
    return adminTable.find()
        .exec((err, data) => {
            if (err) {
                return ('Get Data Admin Error!')
            } else {
                return data
            }
        })
}
//delete admin 
export const _deleteAdmin = (_id) => {
    return adminTable.remove({ _id }, (err => {
        if (err) {
            return err;
        } else {
            return 1;
        }
    }))
}
//getAdminById
export const _getAdminById = (_id) => {
    return adminTable.findOne({ _id })
        .exec((err, data) => {
            if (err) {
                return ('Get Admin Error!')
            } else {
                return data;
            }
        })
}
export const _editAdmin = (_id, dataAdmin) => {
    return adminTable.findOneAndUpdate({ _id }, {
        firstName: dataAdmin.firstName,
        lastName: dataAdmin.lastName,
        role: dataAdmin.role,
        mobile: dataAdmin.mobile,
    }, { new: true }).exec((err, data) => {
        if (err) {
            return ('Update Admin Error!')
        } else {
            return data;
        }
    })
}