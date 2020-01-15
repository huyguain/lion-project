var nodemailer = require('nodemailer');
import config from '../config';
// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: "mail.fsoft.com.vn", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers:'SSLv3' 
    },
    auth: {
        user: 'HuyNT16@fsoft.com.vn',
        pass: 'Repay$4bank3'
    }
}); 
/**
 * Send reset password link
 */
export const send = (payload, callback) => {
    // setup e-mail data, even with unicode symbols
    var mailOptions = {
        from: 'HuyNT16@fsoft.com.vn', // sender address (who sends)vl day ne
        to: payload.TO, // list of receivers (who receives)
        subject: 'Send code entry test', // Subject line        
        html: `<div>Your code is: ${payload.code}</div>
            <div>
                Thank you apply Fpt Software<br/> Best Regards, <br/>Nodejs Team 
            </div>
        ` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, callback);
}

export const sendApply = (payload, callback) => {
    // setup e-mail data, even with unicode symbols
    var mailOptions = {
        from: 'HuyNT16@fsoft.com.vn', // sender address (who sends)vl day ne
        to: 'AnhNT101@fsoft.com.vn', // list of receivers (who receives)
        subject: 'Send code entry test', // Subject line
        html: `<div>Chào quản trị viên:</div>
            <div>
                Bạn nhận được một CV Ứng viên tự do mới từ chiến dịch Marketing: “1500 Freshers”<br/> 
                Họ và tên ứng viên: ${payload.fullName}<br/> 
                Email : ${payload.email}<br/> 
                Điện thoại: ${payload.phoneNumber}<br/> 
                Kỹ năng : ${payload.jobApply.title}<br/> 
                Địa điểm: ${payload.location.zone}<br/> 
                Năm tốt nghiệp: ${payload.graduationYear}<br/> 
                Kinh nghiệm làm việc:${payload.wordExperience}<br/> 
                Điểm trung bình : ${payload.cpa}<br/> 
                Tên trường: ${payload.university.name}<br/> 
                Tên khoa: ${payload.major}<br/> 
                Ứng tuyển từ mục : ${payload.category.title}<br/> 
                Source : direct<br/> 
                CV đính kèm : ${payload.cv}<br/> 
            </div>
        ` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, callback);
}
/**
 * Send welcome email to new users
 */
const sendWelcomeLink = () => {
    // TODO
}
// export default send;