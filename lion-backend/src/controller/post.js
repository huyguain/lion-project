import {
    createPost, listPost, deletePost,
    editPost, getPostById, getAllPostActive, searchSuggest
} from '../models/post';
import fs from "fs";
import slug from 'slug';

export const create = async (req, res) => {
    req.body.urlImage = await req.files[0].filename;
    req.body.urlImageSlider = req.files.filter(item => item.fieldname === 'slider')
        .map(item => item.filename);
    req.body.link_url = req.body.link_url ? req.body.link_url : slug(req.body.title.trim().toLowerCase());
    createPost(req.body, (err, data) => {
        if (err) {
            if (err.code = 11000) {
                req.body.link_url = slug(req.body.title.trim().toLowerCase())
                    + "-" + (err.index + Math.round(Math.random() * 100))
                create(req, res);
            }
            else {
                res.status(500).json({
                    success: false,
                    massage: "error upload image"
                })
            }
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
    listPost({}, limit, (err, data) => {
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
export const listOrder = (req, res) => {
    const { order, limit } = req.body;
    listPost(order, limit, (err, data) => {
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
export const search = (req, res) => {
    const { order, limit } = req.body;
    try {
        searchSuggest(order.value, (err, data) => {
            console.log(err)
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
    } catch (err) {
        res.json({
            success: false
        })
    }
}
export const remove = (req, res) => {
    const { id } = req.params;
    deletePost(id, (err, data) => {
        if (err) {
            res.status(500).json({
                success: false
            })
        } else {
            try {
                const link = `upload/${data.urlImage}`;
                console.log("link", link);
                fs.unlinkSync(link);

            } catch (err) {
                console.log(err)
            }
            res.status(200).json({
                success: true,
                id
            })
        }
    })
}
export const edit = (req, res) => {
    const { id } = req.params;
    const imageURL = req.files.filter(item => item.fieldname === 'image');
    req.body.urlImage = imageURL.length === 1 ? imageURL[0].filename : undefined;
    req.body.urlImageSlider = req.files.filter(item => item.fieldname === 'slider')
        .map(item => item.filename);
    const data = req.body;
    editPost(id, data, (err, postEdit) => {
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

export const getById = (req, res) => {
    const { id } = req.params;
    getPostById(id, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({
                data
            })
        }
    })
}
export const getPostActive = (req, res) => {
    getAllPostActive(4, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({
                data
            })
        }
    })
}