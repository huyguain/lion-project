import {
    createLocaiton, listLocation, getOneLocation,
    editLocation, removeLocation
} from '../models/location'

export const create = (req, res) => {
    createLocaiton(req.body, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        }
        else {
            res.json({
                success: true,
                message: 'success'
            })
        }
    })
}

export const list = (req, res) => {
    listLocation((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        }
        else {
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
    console.log(id)
    getOneLocation(id, (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        }
        else {
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
    editLocation(id, req.body, (err, data) => {
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
    removeLocation(id, err => {
        if (err) {
            res.json({
                success: false,
                message: 'error'
            })
        } else {
            res.json({
                success: true,
                message: 'success'
            })
        }
    })
}

