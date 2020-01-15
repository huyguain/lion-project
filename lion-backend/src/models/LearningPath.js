import mongoose, { Schema } from 'mongoose';

let LearningPath = new Schema({
    language: String,
    learningPath: String,
    title: String,
    content: String,
    courseIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
})
const LearningPathTable = mongoose.model('Learning', LearningPath)
export const createLearningPath = (language, learningPath, courseIds, title, content, callback) => {
    LearningPathTable.create({
        language,
        learningPath,
        courseIds,
        title,
        content
    }, (err, data) => {
        if (err) return callback(err)
        callback(null, data)
    })
}

export const listLearningPath = (callback) => {
    LearningPathTable.find({}).
        populate({
            path: "courseIds",
            select: ["_id", "language", "courseName", "urlIcon", "urlImage", "__v"]
        }).
        then(data => callback(null, data)).
        catch(err => callback(err))
}

export const getLearningById = (_id, callback) => {
    LearningPathTable.findOne({ _id }).populate({
        path: "courseIds",
        select: ["_id", "language", "courseName", "urlIcon", "urlImage", "__v"]
    }).then(
        data => {
            callback(null, data)
        }
        ).catch(
        err => callback(err)
        )
}
//getLearningPath
export const _getLearningPath = (_id) => {
    return LearningPathTable.findOne({ _id })
        .exec((err, data) => {
            if (err) {
                return ('Get Learning Error !')
            } else {
                return data
            }
        })

}
export const editLearningById = (id, language, learningPath, courseIds, title, content, callback) => {
    LearningPathTable.findByIdAndUpdate(id,
        { language, learningPath, courseIds, title, content },
        { new: true },
        (err, data) => {
            if (err) return callback(err)
            return callback(null, data)
        }
    )
}

export const removeLearning = (_id, callback) => {
    LearningPathTable.remove({ _id }, err => {
        if (err) return callback(err)
        else return callback(null)
    })
}


export const listLearning = (courseIds) => {
    return LearningPathTable.find({ courseIds }).
        exec((err, data) => {
            if (err) return err;
            return data
        })
}
//getLearningPathName
export const _getLearningPathName = () => {
    return LearningPathTable.find({}).select({ learningPath: 1 }).exec((err, data) => {
        if (err) {
            throw ('Get Data Error !')
        } else {
            return data
        }
    })
}