import mongoose, { Schema } from 'mongoose'
import slug from 'slug'

let jobsSchema = new Schema({
    title: String,
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    deadlineSubmit: Date,                   //Han nop
    joinDate: Date,                         //ngay khai giang, bat dau lam viec
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },                       //fresher, thuc tap, junior
    salary: Number,
    offer: [{
        type: Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    hashTag: [],
    content: String
})

const Jobs = mongoose.model('Jobs', jobsSchema);

export const createJob = (body, callback) => {
    const { title, location, deadlineSubmit, joinDate,
        category, salary, offer, hashTag, content } = body
    Jobs.create({
        title,
        location,
        deadlineSubmit,
        joinDate,
        category,
        salary,
        offer,
        hashTag,
        content
    }, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

export const listJob = (callback) => {
    Jobs.find({ deadlineSubmit: { $gt: Date.now() } }).
        limit(25).
        sort({ _id: 1 }).
        populate("location").
        populate("offer").
        populate('category').
        then(
            data => callback(null, data)
        ).catch(
            err => callback(err)
        )
}

export const listJobCategory = (category, callback) => {
    console.log('date-now', Date.now())
    Jobs.find({ deadlineSubmit: { $gt: Date.now() } }).
        limit(25).
        sort({ deadlineSubmit: -1 }).
        populate("location").
        populate("offer").
        populate('category').
        then(
        data => {
            data = data.filter(item => item.category.title.toLowerCase() === category);
            callback(null, data)
        }).catch(
        err => callback(err)
        )
}

export const listJobLocation = (location, callback) => {
    console.log('date-now', location)
    Jobs.find({ deadlineSubmit: { $gt: Date.now() } }).
        limit(25).
        sort({ deadlineSubmit: -1 }).
        populate("location").
        populate("offer").
        populate('category').
        then(
        data => {
            console.log('data-back', data[0].location.zone, location)
            data = data.filter(item => slug(item.location.zone.toLowerCase().trim()) === location);
            console.log('data', data)
            callback(null, data)
        }).catch(
        err => callback(err)
        )
}

export const listJobHashtag = (hashTag, callback) => {
    console.log('date-now', hashTag)
    Jobs.find({ deadlineSubmit: { $gt: Date.now() }, hashTag }).
        limit(25).
        sort({ deadlineSubmit: -1 }).
        populate("location").
        populate("offer").
        populate('category').
        then(
        data => {
            // data = data.filter(item => item.category.title.toLowerCase() === category);
            callback(null, data)
        }).catch(
        err => callback(err)
        )
}

export const listJobCategoryLocation = (category, location, callback) => {
    Jobs.find({ location }).
        populate("location").
        populate("offer").
        populate('category').
        then(
            data => {
                data = data.filter(item => item.category.title.toLowerCase() === category);
                callback(null, data)
            }
        ).catch(
            err => callback(err)
        )
}

export const getOneJob = (_id, callback) => {
    Jobs.find({ _id }).
        populate("location").
        populate("offer").
        populate('category').
        then(
        data => callback(null, data)
        ).catch(
        err => callback(err)
        )
}

export const editJob = (_id, body, callback) => {
    const { title, location, deadlineSubmit, joinDate,
        category, salary, offer, hashTag, content } = body
    Jobs.findByIdAndUpdate(
        _id,
        {
            title, location, deadlineSubmit, joinDate,
            category, salary, offer, hashTag, content
        },
        { new: true },
        (err, data) => {
            if (err) return callback(err)
            return callback(null, data)
        }
    )
}

export const removeJob = (_id, callback) => {
    Jobs.remove({ _id }, err => {
        if (err) return callback(err)
        return callback(null)
    })
}