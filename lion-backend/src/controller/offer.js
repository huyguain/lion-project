import { createOffer, listOffer, getOneOffer, editOffer, removeOffer } from '../models/offer'

export const create = (req, res) => {
    createOffer(req.body, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: 'success'
            })
        }
    })
}

export const list = (req, res) => {
    listOffer((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: 'success',
                data
            })
        }
    })
}

export const getOne = (req, res) => {
    const { id } = req.params
    getOneOffer(id, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: 'success',
                data
            })
        }
    })
}

export const edit = (req, res) => {
    const { id } = req.params
    editOffer(id, req.body, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: 'success',
                data
            })
        }
    })
}

export const remove = (req, res) => {
    const { id } = req.params
    removeOffer(id, err => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                message: 'success'
            })
        }
    })
}

