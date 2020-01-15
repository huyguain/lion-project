import mongoose, { Schema } from 'mongoose';
import multer from "multer";
import fs from "fs";

const Testimonial = new Schema({
    fullName: String,
    gender: Number,
    position: String,
    content: String,
    urlImage: String
})

const testimonialModel = mongoose.model('testimonial', Testimonial);

export const createTestimonial = async (newTestimonial, callback) => {
    let Testimonial = new testimonialModel(newTestimonial);
    try {
        const data = await Testimonial.save();
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}

export const listTestimonial = async (limit, callback) => {
    try {
        let data = await testimonialModel.find();
        if (!limit) data = await testimonialModel.find().limit(limit);
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const getTestimonialById = async (id, callback) => {
    try {
        const doc = await testimonialModel.findById({ _id: id });
        callback(null, doc);
    } catch (err) {
        callback(err);
    }
}
export const editTestimonial = async (id, data, callback) => {
    try {
        let doc = await testimonialModel.findById({ _id: id });
        const { fullName, gender, position, content,
            urlImage } = data;
        doc.fullName = fullName;
        doc.gender = gender;
        doc.position = position;
        doc.content = content;
        if (urlImage) {
            deleteImage(doc.urlImage);
            doc.urlImage = urlImage;
        }
        const post = await doc.save();
        callback(null, doc);
    } catch (err) {
        callback(err);
    }
}

export const deleteTestimonial = async (id, callback) => {
    try {
        const data = await testimonialModel.remove({ _id: id });
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}

const deleteImage = urlImage => {
    if (urlImage) {
        try {
            const link = `upload/${urlImage}`;
            fs.unlinkSync(link);
        } catch (err) {
        }
    }
}