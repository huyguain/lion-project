import mongoose, { Schema } from 'mongoose'
import { LocationTable } from './location'

let applierSchema = new Schema({
    fullName: String,
    email: String,
    jobApply: {
        type: Schema.Types.ObjectId,
        ref: 'Jobs'
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    graduationYear: Number,
    cpa: Number,
    phoneNumber: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    major: String,
    university: {
        type: Schema.Types.ObjectId,
        ref: 'University'
    },
    typeJob: Boolean, 
    wordExperience: String, 
    cv: String
})

export const Applier = mongoose.model('Applier', applierSchema);

export const createApplier = (body, callback) => {
    const { fullName, email, location, jobApply, graduationYear,
        cpa, phoneNumber, category, major, typeJob, wordExperience, cv, university } = body
    Applier.create({
        fullName,
        email,
        location,
        jobApply,
        graduationYear,
        cpa,
        phoneNumber,
        category,
        major,
        university,
        typeJob,
        wordExperience,
        cv
    }, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

export const listApplier = (callback) => {
    Applier.find({}).
        sort({ _id: -1 }).
        populate({
            path: 'jobApply',
            populate: { path: 'location' }
        }).
        populate("location").
        populate("category").
        populate("university").
        then(
            data => callback(null, data)
        ).catch(
            err => callback(err)
        )
}

export const getOneApplier = (_id, callback) => {
    console.log(_id)
    Applier.find({ _id }).
        populate({
            path: 'jobApply',
            populate: { path: 'location' }
        }).
        populate("location").
        populate("category").
        populate("university").
        then(
            data => callback(null, data)
        ).catch(
            err => callback(err)
        )
}

export const editApplier = (_id, body, callback) => {
    const { fullName, email, jobApply, location, graduationYear,
        cpa, phoneNumber, category, major, typeJob, wordExperience, cv } = body
    Applier.findByIdAndUpdate(
        _id,
        {
            fullName, email, jobApply, location, graduationYear,
            cpa, phoneNumber, category, major, typeJob, wordExperience, cv
        },
        { new: true },
        (err, data) => {
            if (err) return callback(err)
            return callback(null, data)
        }
    )
}

export const removeApplier = (_id, callback) => {
    Applier.remove({ _id }, err => {
        if (err) return callback(err)
        return callback(null)
    })
}