import {
    createTestimonial,
    listTestimonial,
    getTestimonialById,
    editTestimonial,
    deleteTestimonial
} from '../models/testimonial';
import fs from "fs";

export const create = async (req, res) => {
    req.body.urlImage = await req.files[0].filename;
    createTestimonial(req.body, (err, data) => {
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
    listTestimonial(limit, (err, data) => {
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

export const getById = (req, res) => {
    const { id } = req.params;
    getTestimonialById(id, (err, data) => {
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
    editTestimonial(id, data, (err, postEdit) => {
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

export const remove = (req, res) => {
    const { id } = req.params;
    deleteTestimonial(id, (err, data) => {
        console.log(err);
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

