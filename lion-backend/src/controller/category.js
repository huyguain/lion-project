import {
    createCategory, listCategories,
    editCategory, getCategoriesId,
    getCategoriesTitle
} from '../models/category'


export const create = async (req, res) => {
    req.body.urlImage = await req.files[0].filename;
    createCategory(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                massage: "error upload image"
            })
        } else {
            res.status(200).json({
                success: true,
                massage: "upload image success"
            })
        }
    })
}
export const list = (req, res) => {
    const { limit } = req.body;
    listCategories(limit, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false,
                err
            })
        } else {
            res.status(200).json({
                success: true,
                data
            })
        }
    })
}
export const getByTitle = (req, res) => {
    const { title } = req.params;
    getCategoriesTitle(title.toLowerCase(), (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({
                data
            })
        }
    })
}
export const getById = (req, res) => {
    const { id } = req.params;
    getCategoriesId(id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({
                data
            })
        }
    })
}
export const edit = (req, res) => {
    const { id } = req.params;
    req.body.urlImage = req.files[0] ? req.files[0].filename : undefined;
    const data = req.body;
    editCategory(id, data, (err, categoryEdit) => {
        if (err) {
            res.status(500).json({
                success: false
            })
        } else {
            res.status(200).json({
                success: true,
            })
        }
    })
}

