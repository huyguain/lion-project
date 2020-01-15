import mongoose, { Schema } from 'mongoose';
import fs from 'fs';

let Lecture = new Schema({
    type: String,
    urlVideo: String,
    title: String,
    duration: Number,
    numberQuestion: Number,
    passScore: Number,
    result: String
})
let Section = new Schema({
    section: String,
    lectures: [Lecture]
})
let Course = new Schema({
    language: String,
    courseName: String,
    urlIcon: String,
    urlImage: String,
    totalTime: Number,
    start_at: Date,
    deadline: Date,
    title: String,
    content: String,
    sections: [Section]
})

const CourseModel = mongoose.model('Course', Course);

export const createCourse = async (newCourse, callback) => {
    let course = new CourseModel(newCourse);
    try {
        const data = await course.save();
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}

export const editCourse = async (id, editCourse, callback) => {
    try {
        const doc = await CourseModel.findById({ _id: id });
        const { language, courseName, title, content, urlVideo, urlIcon, urlImage, sections } = editCourse;
        doc.urlVideo = urlVideo;
        doc.language = language;
        doc.courseName = courseName;
        doc.title = title;
        doc.content = content;
        doc.sections = sections;
        if (urlImage || urlIcon) {
            if (urlImage) {
                try {
                    const link = `upload/${doc.urlImage}`;
                    fs.unlinkSync(link);
                } catch (err) {
                    console.log(err)
                }
                doc.urlImage = urlImage;
            }
            if (urlIcon) {
                try {
                    const link = `upload/${doc.urlIcon}`;
                    fs.unlinkSync(link);
                } catch (err) {
                    console.log(err)
                }
                doc.urlIcon = urlIcon;
            }
        }
        const course = await doc.save();
        callback(null, course);
    } catch (err) {
        callback(err);
    }
}
export const getCourseById = async (id, callback) => {
    try {
        const doc = await CourseModel.findById({ _id: id });
        callback(null, doc);
    } catch (err) {
        callback(err);
    }
}
export const listCourse = async (limit = "", callback) => {
    try {
        const data = await CourseModel.find({})
            .sort({ start_at: -1 })
            .select({})
            .limit(limit);
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}

//get all course
export const _getAllCourse = () => {
    return CourseModel.find({}).select({ courseName: 1 }).exec((err, data) => {
        if (err) {
            throw ('Get Course Error !')
        } else {
            return data;
        }
    })

}
export const searchSuggest = async (valueSearch, callback) => {
    try {
        const data = await CourseModel
            .find({ courseName: { '$regex': valueSearch } })
            .limit(10);
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const deleteCourse = async (id, callback) => {
    try {
        const data = await CourseModel.findOneAndRemove({ _id: id });
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const getInfoQuestionQuiz = async (idCourse, idSection, idLecture, callback) => {
    try {
        const dataCourse = await CourseModel.findById({ _id: idCourse }).select({ language: 1, courseName: 1, sections: 1 });
        const section = await dataCourse.sections.id(idSection);
        const lecture = await section.lectures.id(idLecture);
        const data = {
            language: dataCourse.language,
            courseName: dataCourse.courseName,
            sectionName: section.section,
            infoQuiz: lecture
        }
        callback(null, data);
    } catch (err) {
        console.log('err', err)
        callback(err);
    }
}
