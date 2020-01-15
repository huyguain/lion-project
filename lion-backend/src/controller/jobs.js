import {
    createJob, listJob, getOneJob, editJob, removeJob,
    listJobCategory, listJobCategoryLocation, listJobLocation, listJobHashtag
} from '../models/jobs'

export const create = (req, res) => {
    createJob(req.body, (err, data) => {
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
    console.log('ok baby')
    listJob((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            console.log('data', data)
            res.json({
                success: true,
                message: 'success',
                data
            })
        }
    })
}

export const listCategory = (req, res) => {
    let { category } = req.params
    listJobCategory(category, (err, data) => {
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

export const listLocation = (req, res) => {
    let { location } = req.params
    console.log('location', location)
    listJobLocation(location, (err, data) => {
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

export const listHashtag = (req, res) => {
    const { hashtag } = req.params
    listJobHashtag(hashtag, (err, data) => {
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

export const listCategoryLocation = (req, res) => {
    const { category, location } = req.params
    listJobCategoryLocation(category, location, (err, data) => {
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
    getOneJob(id, (err, data) => {
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
    editJob(id, req.body, (err, data) => {
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
    removeJob(id, err => {
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


