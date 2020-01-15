import jwt from 'jsonwebtoken';
import config from '../config';

export default () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        return jwt.verify(userToken, config.secret, (err, decoded) => {
            if (err) {
                return false;
            } else {
                const { username } = decoded;
                return username;
            }
        })
    } else {
        return false;
    }
}