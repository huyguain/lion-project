import mongoose, { Schema } from 'mongoose';
import fs from 'fs';

const panel = new Schema({
    urlImage: String,
    title: String,
    description: String,
    linkto: String,    
    status: { type: Boolean, default: false },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
});
let panelModel = mongoose.model('Panel', panel);
export const createPanel = async (newPanel, callback) => {
    console.log(newPanel);
    let Panel = new panelModel(newPanel);
    try {
        const data = await Panel.save();
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const listPanel = async (limit = "", callback) => {
    try {
        const data = await panelModel.find().sort({ create_at: -1 }).limit(limit);
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const deletePanel = async (id, callback) => {
    try {
        const data = await panelModel.findOneAndRemove({ _id: id });
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}
export const editPanel = async (id, data, callback) => {
    try {
        const doc = await panelModel.findById({ _id: id });
        const { title, description, status, urlImage, linkto } = data;
        doc.title = title;
        doc.description = description;
        doc.status = status;
        doc.linkto = linkto;
        //check have choosed new image
        //=>true=> save new image , unlink old
        if (urlImage) {
            try {
                const link = `upload/${doc.urlImage}`;
                fs.unlinkSync(link);
            } catch (err) {
                console.log(err)
            }
            doc.urlImage = urlImage;
        }
        const panel = await doc.save();
        callback(null, panel);
    } catch (err) {
        callback(err);
    }
}

export const getPanelById = async (id, callback) => {
    try {
        const doc = await panelModel.findById({ _id: id });
        callback(null, doc);
    } catch (err) {
        callback(err);
    }
}

export const deleteMultiplePanel = async (ids, callback) => {
    try {
        await panelModel.remove({ _id: { $in: ids } })
        callback(null);
    } catch (err) {
        callback(err);
    }
}