import mongoose, { Schema } from 'mongoose'
// import { LocationTable } from './location'

const universitySchema = new Schema({
    name: String,
    location: String
})

export const University = mongoose.model('University', universitySchema);

export const createUniversity = (body, callback) => {
    console.log('body', body)
    const { name, location } = body
    University.create({
        name,
        location
    }, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

export const importUniversity = async (university, callback) => {
    try {
        await University.remove()
        University.create(university, (err, data) => {
            if (err) return callback(err)
            return callback(null, data)
        }) 
    } catch (err) {
        return callback(err)
    }
}

export const listUniversity = (callback) => {
    University.find({}).sort({ _id: -1 }).
        then(
            data => callback(null, data)
        ).catch(
            err => callback(err)
        )
}

export const getOneUniversity = (_id, callback) => {
    console.log(_id)
    University.find({ _id }).
        then(
            data => callback(null, data)
        ).catch(
            err => callback(err)
        )
}

export const editUniversity = (_id, body, callback) => {
    const { name, location } = body
    University.findByIdAndUpdate(
        _id,
        {
            name, location
        },
        { new: true },
        (err, data) => {
            if (err) return callback(err)
            return callback(null, data)
        }
    )
}

export const removeUniversity = (_id, callback) => {
    University.remove({ _id }, err => {
        if (err) return callback(err)
        return callback(null)
    })
}