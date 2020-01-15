import { createApplier, listApplier, getOneApplier, editApplier, removeApplier } from '../models/applier'
var nodemailer = require('nodemailer');
import { sendApply } from '../lib/mailer'

export const create = (req, res) => {
    console.log('req.body', req.body)
    createApplier(req.body, async (err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            console.log('data-payload', data)
            // let payload = {
            //     TO: dataCandidate.email,
            //     code: dataEntryCode.code
            // }
            // console.log({payload})
            await getOneApplier(data._id, (err, applier) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err
                    })
                } else {
                    sendApply(applier[0], (err, dataMail) => { console.log(dataMail) })
                }
            })
            res.json({
                success: true,
                message: 'success'
            })
        }
    })
}

export const list = (req, res) => {
    listApplier((err, data) => {
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

export const getOne = (req, res) => {
    const { id } = req.params
    getOneApplier(id, (err, data) => {
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
    editApplier(id, req.body, (err, data) => {
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
    removeApplier(id, err => {
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



