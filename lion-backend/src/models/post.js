import mongoose, { Schema } from 'mongoose';
import multer from "multer";
import fs from "fs";

const Post = new Schema({
    urlImage: String,
    title: String,
    content: String,
    description: String,
    category: String,
    status: { type: Boolean, default: false },
    link_url: { type: String, unique: true, require: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    urlImageSlider: [{
        type: String
    }],
    hashTag: [{
        type: String
    }],
})

let postModel = mongoose.model('post', Post);

export const createPost = async (newPost, callback) => {
    let Post = new postModel(newPost);
    try {
        const data = await Post.save();
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const listPost = async (order, limit, callback) => {
    try {
        let data = await postModel.find(order).sort({ 'update_at': -1 });
        if (!limit) data = await postModel.find(order).sort({ 'update_at': -1 }).limit(limit);
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}

export const deletePost = async (id, callback) => {
    try {
        const data = await postModel.remove({ _id: id });
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const searchSuggest = async (valueSearch, callback) => {
    try {
        const data = await postModel
            .find(
            {
                $or: [
                    { title: { '$regex': new RegExp(valueSearch, 'i') } },
                    { description: { '$regex': new RegExp(valueSearch, 'i') } },
                    { category: { '$regex': new RegExp(valueSearch, 'i') } }
                ]
                , category: { $ne: 'Page' }
            });
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const editPost = async (id, data, callback) => {
    try {
        let doc = await postModel.findById({ _id: id });
        const { title, description, status, urlImageSlider,
            urlImage, content, hashTag, category, listDelete } = data;
        doc.title = title;
        doc.description = description;
        doc.status = status;
        doc.update_at = new Date();
        doc.content = content;
        doc.category = category;
        const listHashTag = hashTag.split(',');
        doc.hashTag = listHashTag[0] !== '' ? listHashTag : [];
        if (urlImage) {
            deleteImage(doc.urlImage);
            doc.urlImage = urlImage;
        }
        let listImageSlider = [...doc.urlImageSlider, ...urlImageSlider];
        for (let i of listDelete.split(',')) {
            deleteImage(i);
            listImageSlider = listImageSlider.filter(item => item !== i);
        }
        doc.urlImageSlider = listImageSlider;
        const post = await doc.save();
        callback(null, post);
    } catch (err) {
        callback(err);
    }
}
const deleteImage = urlImage => {
    if (urlImage) {
        try {
            const link = `upload/${urlImage}`;
            console.log('xoa anh', urlImage)
            fs.unlinkSync(link);
        } catch (err) {
        }
    }
}
export const getPostById = async (id, callback) => {
    try {
        const doc = await postModel.findById({ _id: id });
        callback(null, doc);
    } catch (err) {
        callback(err);
    }
}
export const getAllPostActive = async (limit, callback) => {
    try {
        let data = await postModel.find({ status: true }).sort({ 'update_at': -1 }).limit(limit);;
        callback(null, data);
    } catch (err) {
        callback(err)
    }
}