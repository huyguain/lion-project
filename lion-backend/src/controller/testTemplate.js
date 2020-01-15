import {
    createTestTemplate,
    updateTestTemplate,
    _getAllTemplate,
    _deleteTemplateById,
} from '../models/testTemplate';
import { getGenByTemplateId, _updateGenByTemplateId, _deleteEntryByTemplate, _getAllEntryByTemplate } from '../models/entryCode';

//create Template and save to database
export const createTemplate = async (req, res) => {
    try {
        const { dataTemplate } = req.body;
        if (!dataTemplate) {
            throw ('No Data')
        } else {
            let dataTem = await createTestTemplate(dataTemplate);
            if (dataTem) {
                res.status(204).end()
            } else {
                throw (`Can't Create Template!`)
            }
        }
    } catch (err) {
        res.status(203).json({
            success: false,
            message: err
        })
    }
}
//get all template and send data to front-end
export const getAllTemplate = async (req, res) => {
    try {
        let dataTemplate = await _getAllTemplate();
        if (dataTemplate) {
            res.status(200).json({
                success: true,
                dataTemplate
            })
        } else {
            throw (`Can't Get Template!`)
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: err
        })
    }
}
//delete a template by id
/* export const deleteTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        if (!templateId) {
            throw ('No Data !')
        } else {
            let dataEntryCode = await _getAllEntryByTemplate(templateId);
            if (dataEntryCode.length === 0) {
                let checkTemplate = await _deleteTemplateById(templateId);
                if (checkTemplate) {
                    res.status(204).end()
                } else {
                    throw ('Delete Template Error !')
                }
            } else {
                let checkEntry = await _deleteEntryByTemplate(templateId);
                if (!checkEntry) {
                    throw ('Delete Entry Do Not Used Error !')
                } else {
                    await _updateGenByTemplateId(templateId);
                    let checkTemplate = await _deleteTemplateById(templateId);
                    if (checkTemplate) {
                        return res.status(204).end()
                    } else {
                        throw ('Delete Template Error !')
                    }
                    // }
                }
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(403).json({
            success: false,
            message: err
        })
    }
}
*/
//DELETE 
export const deleteTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        if (!templateId) {
            throw ('No Data !')
        } else {
            const dataUpdate = await updateTestTemplate({ _id: templateId }, { deleteVisible: true });
            if (dataUpdate.length !== 0) {
                res.status(204).end()
            }else throw ('Delete Template Error !')
        }
    } catch (err) {
        console.log(err)
        return res.status(403).json({
            success: false,
            message: err
        })
    }
}