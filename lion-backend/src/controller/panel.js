import { createPanel, listPanel, deletePanel, editPanel, getPanelById, deleteMultiplePanel } from '../models/panel';
import fs from 'fs';

export const create = (req, res) => {
    req.body.urlImage = req.file.filename;
    createPanel(req.body, (err, data) => {
        if(err) {
            res.json({
                success: false,
                massage: "error upload image"
            })
        } else {
            res.json({
                success: true,
                massage: "upload image success"
            })
        }
    })
}
export const list = (req, res) => {
    const limit = "";
    listPanel(limit, (err, data) => {
        if(err) {
            res.json({
                success: false
            })
        } else {
            res.json({
                success: true,
                data
            })
        }
    })
}
export const remove = (req, res) => {
    const { id } = req.params;
    deletePanel(id, (err, data) => {  
        if(err) {
            res.status(500).json({
                success: false
            })
        } else {
            try{
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
    const data = req.body;
    // console.log("req.file", req.file);
    console.log("req.file", req.file);
    console.log("data", data);
    //check new file upload
    if(req.file) {
        data.urlImage = req.file.filename;
    }
    editPanel(id, data, (err, panelEdit) => {
        if(err) {
            res.json({
                success: false
            })
        } else {
           console.log("panelEdit", panelEdit);
           console.log("req.file", req.file);
            res.json({
                success: true
            })
        }
    })
}
export const getById = (req, res) => {
    const { id } = req.params;
    getPanelById(id, (err, data) => {
        if(err) {
            res.status(500).send();
        } else {
            res.status(200).json({
                data
            })
        }
    })
}
export const getLimitPanel = (req, res) => {
    const limit = 3;
    listPanel(limit, (err, data) => {
        if(err) {
            res.json({
                success: false
            })
        } else {
            res.json({
                success: true,
                data
            })
        }
    })
}

export const removeMultiple = (req, res) => {
    const { ids } = req.params;
    const arrId = ids.split(',')
    console.log("dsd", arrId)
    console.log(typeof(arrId))
    deleteMultiplePanel(arrId, (err, data) => {
        if(err) {
            console.log(err)
            res.json({
                success: false
            })
        } else {
            res.json({
                success: true,
            })
        }
    })
}