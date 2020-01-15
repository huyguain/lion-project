import mongoose, { Schema } from 'mongoose'

let locationSchema = new Schema({
    zone: String
})

export const LocationTable = mongoose.model('Location', locationSchema)

export const createLocaiton = (body, callback) => {
    const { zone } = body
    LocationTable.create({
        zone
    }, (err, data) => {
        if(err) return callback(err)
        return callback(null, data)
    })
}

export const listLocation = (callback) => {
    LocationTable.find({}, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

export const getOneLocation = (_id, callback) => {
    console.log('clgt')
    LocationTable.find({_id}, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

export const editLocation = (_id, body, callback) => {
    const { zone } = body
    console.log('body', zone)
    LocationTable.findByIdAndUpdate(
        _id, 
        { zone },
        {new: true},
        (err, data) => {
            if (err) return callback(err)
            return callback(null, data)
        }
    )
}

export const removeLocation = (_id, callback) => {
    LocationTable.remove({ _id }, err => {
        if (err) return callback(err)
        else return callback(null)
    })
}