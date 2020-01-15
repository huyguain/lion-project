import mongoose, { Mongoose, Schema } from 'mongoose';

const LearningPathCustomise = new Schema({
    language: String,
    learningPath: String,
    title: String,
    content: String,
    courseIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
})
const LearningPathCustomiseTable = mongoose.model('LearningCustomise', LearningPathCustomise);

export const _createLearningPathCus = (data, dataCoures) => {
    let courseIds = [];
    for (const id of dataCoures) {
        courseIds.push(id)
    }
    let _LearningPathCustomiseTable = new LearningPathCustomiseTable({
        language: data.language,
        learningPath: data.learningPath,
        title: data.title,
        content: data.content,
        courseIds: courseIds
    })
    return _LearningPathCustomiseTable.save((err, dataLearning) => {
        if (err) {
            return ('Create Learning Error !')
        } else {
            return dataLearning
        }
    })
}
//getAllLearningCus
export const _getAllLearningCus = () => {
    return LearningPathCustomiseTable.find({})
        .populate({
            path: "courseIds",
            select: ["courseName"]
        }).exec((err, data) => {
            if (err) {
                throw ('Get Learning Error !')
            } else {
                return data
            }
        })
}
//deleteLearningCus
export const _deleteLearningCus = (_id) => {
    return LearningPathCustomiseTable.remove({ _id }).exec(err => {
        if (err) {
            return ('Delete Learning Error !')
        } else {
            return 1;
        }
    })
}
//getLearningCusById
export const _getLearningCusById = (_id) => {
    return LearningPathCustomiseTable.findOne({ _id }).exec((err, data) => {
        if (err) {
            return ('Get Learning Error!')
        } else {
            return data
        }
    })
}
//_editLearningCusById
export const _editLearningCusById = (_id, dataLearning, dataCoures) => {
    let courseIds = [];
    for (const id of dataCoures) {
        courseIds.push(id)
    }
    return LearningPathCustomiseTable.findOneAndUpdate({ _id }, {
        language: dataLearning.language,
        learningPath: dataLearning.learningPath,
        title: dataLearning.title,
        content: dataLearning.content,
        courseIds: courseIds
    }).exec((err, data) => {
        if (err) {
            return ('Update Data Error !')
        } else {
            return data
        }
    })
}
//getLearningForClass
export const _getLearningForClass = () => {
    return LearningPathCustomiseTable.find({})
        .select({ learningPath: 1 })
        .exec((err, data) => {
            if (err) {
                return ('Get Learning Error!')
            } else {
                return data
            }
        })
}