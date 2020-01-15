import jwt from 'jsonwebtoken';
import config from '../config';

export default () => {
    const codeToken = localStorage.getItem('token');
    if (codeToken) {
        return jwt.verify(codeToken, config.secret, (err, decoded) => {
            if (err) {
                return false;
            } else {
                const { code } = decoded;
                return code ? true : false;       
            }
        })
    } else {
        return false;
    }
}