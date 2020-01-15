import mongoose, { Schema } from 'mongoose';
import md5 from 'md5'

const Fresher = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    mobile: Number,
    language: String,
    program: String,
    note: String,
    startDate: Date,
    finalIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Final'
    }],
    university: {
        type: Schema.Types.ObjectId,
        ref: 'University'
    },
    token: String
})
const fresherTable = mongoose.model('Fresher', Fresher);
//
export const _SignInFresher = (userName, passWord) => {
    return fresherTable.findOne({ userName, passWord: md5(passWord) })
        .exec((err, fresher) => {
            if (err) {
                return ("Username or password is not exitst");
            } else if (fresher) {
                let token = generateTokenUser(userName, fresher.program, fresher._id);
                fresher.token = token;
                fresher.save();
                return fresher
            } else {
                return ("System error in Authentication")
            }
        })
}
//createCampuslink
export const _createCampuslink = (dataCampuslink) => {
    let _fresherTable = new fresherTable({
        firstName: dataCampuslink.firstName,
        lastName: dataCampuslink.lastName,
        email: dataCampuslink.email,
        mobile: dataCampuslink.mobile,
        language: dataCampuslink.language,
        program: 'Campuslink',
        note: dataCampuslink.note,
        startDate: dataCampuslink.startDate,
        university: dataCampuslink.university,
    })
    return _fresherTable.save((err, data) => {
        if (err) {
            return ('Create Campuslink Error !')
        } else {
            return data;
        }
    })
}
//getCampuslinkByUserName
export const _getCampuslinkByUserName = (userName) => {
    return fresherTable.findOne({ userName })
        .exec((err, data) => {
            if (err) {
                return ('Get Campus Error !')
            } else {
                return data
            }
        })
}
//getAllFresher
export const _getAllFresher = () => {
    return fresherTable.find({})
        .select({
            firstName: 1, lastName: 1, email: 1, mobile: 1, language: 1,
            program: 1, note: 1, startDate: 1, university: 1
        })
        .exec((err, data) => {
            if (err) {
                return ('Get Fresher Error !')
            } else {
                return data
            }
        })
}
//deleteFresherById
export const _deleteFresherById = (_id) => {
    return fresherTable.remove({ _id }, err => {
        if (err) {
            return (`Delete Frehser Error !`)
        } else {
            return 1
        }
    })
}
//getFresherById
export const _getFresherById = (_id) => {
    return fresherTable.findOne({ _id })
        .select({
            firstName: 1, lastName: 1, email: 1, mobile: 1, language: 1,
            program: 1, note: 1, startDate: 1, university: 1
        })
        .exec((err, data) => {
            if (err) {
                return (`Get Fresher Error!`)
            } else {
                return data
            }
        })
}
//editFresherById
export const _editFresherById = (_id, dataFresher) => {
    return fresherTable.findOneAndUpdate({ _id }, {
        firstName: dataFresher.firstName,
        lastName: dataFresher.lastName,
        mobile: dataFresher.mobile,
        language: dataFresher.language,
        note: dataFresher.note,
        startDate: dataFresher.startDate,
        university: dataFresher.university,
    }, { new: true }).exec((err, data) => {
        if (err) {
            return ('Update Frehser Error !')
        } else {
            return data
        }
    })
}
//getFresherForClass 
export const _getFresherForClass = () => {
    return fresherTable.find({})
        .select({ email: 1 })
        .exec((err, data) => {
            if (err) {
                return ('Get Data Fresher Error !')
            } else {
                return data
            }
        })
}