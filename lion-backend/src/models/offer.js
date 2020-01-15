import mongoose, { Schema } from 'mongoose'

let offerSchema = new Schema({
    icon: String,
    content: String
})

const Offer = mongoose.model('Offer', offerSchema)

export const createOffer = (body, callback) => {
    const { icon, content } = body
    Offer.create({
        icon,
        content
    }, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

export const listOffer = (callback) => {
    Offer.find({}).
        sort({ _id: -1 }).
        then(
            data => callback(null, data)
        ).catch(
            err => callback(err)
        )
}

export const getOneOffer = (_id, callback) => {
    console.log(_id)
    Offer.find({_id}, (err, data) => {
        if (err) return callback(err)
        return callback(null, data)
    })
}

export const editOffer = (_id, body, callback) => {
    const { icon, content } = body
    Offer.findByIdAndUpdate(
        _id,
        { icon, content },
        { new: true },
        (err, data) => {
            if (err) return callback(err)
            return callback(null, data)
        }
    )
}

export const removeOffer = (_id, callback) => {
    Offer.remove({_id}, err => {
        if (err) return callback(err)
        return callback(null)
    })
}