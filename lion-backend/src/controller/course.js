import {
    createCourse,
    listCourse,
    editCourse,
    getCourseById,
    deleteCourse,
    searchSuggest,
} from '../models/course';
import {
    listLearning
} from '../models/LearningPath';
import youtube from 'youtube-feeds'
import fs from 'fs';
import {
    getCourseUserById,
    importcourseUserModel,
    getCourseUserByUserName,
    updateCourseUser
} from '../models/courseUser'
export const youtube1 = async (req, res) => {
    console.log('huy')
    await youtube.feeds.videos({ q: 'EWLF_1M5LYM' }, (err, data) => {
        if (err) console.log(err)
        console.log('data', data)
    })
    console.log('thom')
    res.status(200).end('ok')
}
export const list = (req, res) => {
    const limit = "";
    listCourse(limit, (err, data) => {
        if (err) {
            res.json({
                success: false
            })
        } else {
            res.json({
                success: true,
                data
            })
        }
    })
}
export const create = async (req, res) => {
    try {
        const sections = JSON.parse(req.body.sections);
        req.body.sections = sections;
        req.body.urlIcon = await req.files[0].filename;
        req.body.urlImage = await req.files[1].filename;
        createCourse(req.body, (err, data) => {
            if (err) {
                console.log("err", err)
                res.json({
                    success: false,
                    massage: "error"
                })
            } else {
                res.json({
                    success: true,
                    massage: "success"
                })
            }
        })
    } catch (err) {
        res.json({
            success: true,
            massage: "fail"
        })
    }
}
export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        let _data = await getCourseUserById(id)
        if (_data) {
            res.status(200).json({
                data: _data
            })
        } else {
            await getCourseById(id, (err, data) => {
                if (err) {
                    throw err
                } else {
                    res.status(200).json({
                        data
                    })
                };

            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
export const getCourse = (req, res) => {
    let { id } = req.params;
    getCourseById(id, (err, data) => {
        if (err) {
            res.status(500).send();
        } else {
            res.status(200).json({
                data
            })
        }
    })
}
export const edit = async (req, res) => {
    const { id } = req.params;
    try {
        const sections = JSON.parse(req.body.sections);
        console.log(sections)
        req.body.sections = sections;
        if (req.files.length !== 0) {
            if (req.files[0] && req.files[1]) {
                req.body.urlIcon = await req.files[0].filename;
                req.body.urlImage = await req.files[1].filename;
            } else {
                if (req.files[0].fieldname === 'imagePreview') {
                    req.body.urlImage = await req.files[0].filename;
                } else {
                    req.body.urlIcon = await req.files[0].filename;
                }
            }
        }
        const data = req.body;
        editCourse(id, data, (err, editCourse) => {
            if (err) {
                console.log(err)
                res.json({
                    success: false
                })
            } else {
                res.json({
                    success: true
                })
            }
        })
    } catch (err) {
        res.json({
            success: false,
            massage: "fail"
        })
    }
}
export const remove = (req, res) => {
    const { id } = req.params;
    deleteCourse(id, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false
            })
        } else {
            try {
                const link = `upload/${data.urlImage}`;
                fs.unlinkSync(link);
            } catch (err) {
                console.log(err)
            }
            res.status(200).json({
                success: true,
                id
            })
        }
    })
}
export const search = async (req, res) => {
    const { value } = req.params;
    let dataCourse = [], dataLearning = [];
    try {
        await searchSuggest(value, async (err, data) => {
            dataCourse = data;
        })
        for (let item of dataCourse) {
            await listLearning(item._id, (err, data) => {
                if (!err && data.length != 0) {
                    let index = 0;
                    while (index < data.length && data[index].learningPath === undefined) index++;
                    if (index < data.length)
                        dataLearning.push({
                            learningPath: data[index].learningPath,
                            courseName: item.courseName,
                            _id: item._id
                        })
                }
            })
        }
        res.json({
            success: true,
            data: dataLearning
        })
    } catch (err) {
        res.json({
            success: false
        })
    }

}

export const updateResultVideo = async (req, res) => {
    let { userId, idLecture, idCourse, result } = req.body.data;
    try {
        let data_CourseUser = await getCourseUserByUserName(userId, idCourse);
        if (data_CourseUser) {
            await updateCourseUser(data_CourseUser, userId, idCourse, idLecture, result)
        } else {
            let data_out;
            let _dataCourse;
            await getCourseById(idCourse, (err, dataCourse) => {
                _dataCourse = dataCourse
            })
            await importcourseUserModel(userId, _dataCourse, idLecture)
        }
        res.status(200).json({
            success: true,
            message: 'Upload data success!'
        })
    } catch (err) {
        res.status(500).send('Upload data Error!')
    }
}
