import { getQuestionByCouse } from '../models/question'
import { checkCode } from '../models/entryCode'

export const checkCreateCode = async (req, res, next) => {
    let { numberEasy, numberHard, numberMedium, TemplateId, UserId, language, type } = req.body
    let easy = 0, medium = 0, hard = 0;
    try {
        await getQuestionByCouse(language, type, (err, data) => {
            let arr = data.map(v => v.level)
            for (let i of arr) {
                if (i === 1) {
                    easy++;
                } if (i === 2) {
                    medium++
                } if (i === 3) {
                    hard++
                }
            }
            console.log(easy, medium, hard)
            if (0 <= numberEasy && numberEasy <= easy && 0 <= numberMedium && numberHard <= medium && 0 <= numberHard && numberHard <= hard) {
                next()
                // checkCode(TemplateId, UserId, (err, _data) => {
                //     if (!_data || data === []) {
                //         next()
                //     } else {
                //         return res.status(201).json({
                //             success: false,
                //             message: 'You can not update! '
                //         })
                //     }
                // })
            } else {
                res.status(201).json({
                    success: false,
                    message: 'Not enough quantity!!'
                })
            }

        })
    } catch (err) {
        res.status(500).send('Error')
    }
}