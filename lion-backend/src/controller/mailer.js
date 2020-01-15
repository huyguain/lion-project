import sendMail from '../lib/mailer';

export default (req, res) => {
    const payload = req.body;
    sendMail(payload, (err, data) => {
        if(err) {
            console.log(err)
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