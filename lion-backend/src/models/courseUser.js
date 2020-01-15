import mongoose, { Schema } from 'mongoose';

let courseUser = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    courseId: {
        _id: { type: Schema.Types.ObjectId, ref: 'Course' },
        sectionIds: [{
            _id: { type: Schema.Types.ObjectId, ref: 'Course.sections' },
            lectureIds: [{
                id: { type: Schema.Types.ObjectId, ref: 'Course.sections.lectures' },
                result: { type: Boolean, default: false }
            }]
        }]
    }
})
const couresUserTable = mongoose.model('CourseUser', courseUser)

export const courseUserModel = async (callback) => {
    try {
        await couresUserTable.findOne({ "_id": "5a7d1489602eb12260e8b733" }).
            populate('courseId._id').
            populate('userId').
            exec((err, data) => {
                return callback(null, data)
            })
    } catch (err) {
        console.log(err)
        return callback(err)
    }
}
export const importcourseUserModel = async (userId, dataCourse, idLecture) => {
    try {
        let data = {
            userId: userId,
            courseId: {
                _id: dataCourse._id,
                sectionIds: dataCourse.sections.map(v => {
                    return {
                        _id: v._id,
                        lectureIds: v.lectures.map(val => {
                            if (JSON.stringify(val._id) === JSON.stringify(idLecture)) {
                                return {
                                    _id: val._id,
                                    result: true,
                                }
                            } else {
                                return {
                                    _id: val._id,
                                }
                            }
                        })
                    }
                })
            }
        }
        let _couresUserTable = new couresUserTable(data)
        await _couresUserTable.save((err, _data) => {
            return _data
        })
    } catch (err) {
        return err
    }
}
export const listCourse = (userId) => {
    return couresUserTable.find({ userId }).
        populate('courseId._id').
        populate('userId').
        exec((err, data) => {
            if (err) return err;
            return data
        })
}
export const getCourseUserById = (Id) => {
    return couresUserTable.findOne({ "courseId._id": Id }).
        populate('courseId._id').
        populate('userId').
        exec((err, data) => {
            if (err) return err;
            return data
        })

}
export const getCourseUserByUserName = (userId, courseId) => {
    return couresUserTable.findOne({ userId, "courseId._id": courseId }).
        exec((err, data) => {
            if (err) return err;
            return data;
        })
}
export const updateCourseUser = async (dataCourse, userId, idCourse, idLecture, result) => {
    let data = {
        courseId: {
            _id: dataCourse.courseId._id,
            sectionIds: dataCourse.courseId.sectionIds.map(v => {
                return {
                    _id: v._id,
                    lectureIds: v.lectureIds.map(val => {
                        if (JSON.stringify(val._id) === JSON.stringify(idLecture)) {
                            return {
                                _id: val._id,
                                result: (typeof (result) == "boolean") ? result : true,
                            }
                        } else {
                            return {
                                _id: val._id,
                                result: val.result,
                            }
                        }
                    })
                }
            })
        }
    }
    try {
        await couresUserTable.update(
            { userId, "courseId._id": idCourse },
            data,
            { new: true },
            (err, data) => {
                return data
            }
        )
    } catch (err) {
        return err;
    }
}