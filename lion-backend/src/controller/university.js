import { createUniversity, listUniversity, getOneUniversity, editUniversity, 
        removeUniversity, importUniversity } from '../models/university'
import csv from 'csvtojson';
import fs from 'fs'

export const create = (req, res) => {
    createUniversity(req.body, (err, data) => {
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

export const importFile = async (req, res) => {
    let university = []
    try {
        const fileName = `upload/${req.body.fileUniversity}`
        csv()
            .fromFile(fileName)
            .on('json', (jsonObj) => {
                university.push(jsonObj)
            })
            .on('done', (error) => {
                importUniversity(university, (err, result) => {
                    if (err) throw err
                })
                fs.unlink(fileName, err => { })
            })
        await res.end()
    } catch (err) {
        res.status(500).send('Upload Error!')
    }
}

export const list = (req, res) => {
    listUniversity((err, data) => {
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
    getOneUniversity(id, (err, data) => {
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
    editUniversity(id, req.body, (err, data) => {
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
    removeUniversity(id, err => {
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


