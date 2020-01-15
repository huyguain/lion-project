import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;
const categoriesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    urlImage: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
})

const categoryModel = mongoose.model('category', categoriesSchema);
export const createCategory = async (newCategory, callback) => {
    let Category = new categoryModel(newCategory);
    try {
        const data = await Category.save();
        callback(null, data);
    } catch (err) {
        console.log(err);
        callback(err);
    }
}

export const listCategories = async (limit, callback) => {
    try {
        let data = await categoryModel.find();
        if (!limit) data = await categoryModel.find().limit(limit);
        callback(null, data);
    } catch (err) {
        callback(err);
    }
}

export const getCategoriesId = async (id, callback) => {
    try {
        const doc = await categoryModel.findById({ _id: id });
        callback(null, doc);
    } catch (err) {
        callback(err);
    }
}

export const getCategoriesTitle = async (title, callback) => {
    try {
        const doc = await categoryModel.find({ title });
        callback(null, doc);
    } catch (err) {
        callback(err);
    }
}

export const editCategory = async (id, data, callback) => {
    try {
        let doc = await categoryModel.findById({ _id: id });
        const { title, description, urlImage } = data;
        doc.title = title;
        doc.description = description;
        if (urlImage) {
            deleteImage(doc.urlImage);
            doc.urlImage = urlImage;
        }
        const category = await doc.save();
        callback(null, doc);
    } catch (err) {
        callback(err);
    }
}

export const deleteCategory = async (id, callback) => {
    try {
        const data = await categoryModel.remove({ _id: id });
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