import { getTemplate } from '../models/testTemplate';

export const checkTemplate = async (req, res, next) => {
    let { language, testName } = req.body
    try {
        await getTemplate(language, testName, (err, data) => {
            if (!data || data === []) {
                next();
            } else {
                res.status(201).json({
                    success: false,
                    message: 'Template exsited!!'
                })
            }
        })
    } catch (err) {
        res.status(500).send('Error!')
    }
}