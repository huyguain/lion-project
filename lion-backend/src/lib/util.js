import jwt, { decode } from 'jsonwebtoken';
import config from '../config.js';
import validator from 'validator';

//Generate token base on email, role and expiration time of token
export const generateToken = (code) => {
    return jwt.sign({ code }, config.secret)
}
//giaima 
export const verifyToken = (token, callback) => {
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            callback(err)
        }
        return callback(null, decoded)
    })
}

export const generateTokenUser = (username, role, userId) => {
    return jwt.sign({ username, role, userId }, config.secret, { expiresIn: '10h' });
}
//validate form login
export const validateUserInfo = (info) => {
    if(!info) {
        return 'No user information found'
    }
    const {userName, passWord } = info;
    if(!userName || !passWord) {
        if(!userName) {
            return 'UserName is a must';
        } 
        if(!passWord) {
            return "Password is a must";
        }
    } else {
        if(userName.length <6 || userName.length >30) {
            return "Username must be between 6 to 30 character";
        }
        if(passWord.length<6 || passWord.length>30) {
            return "Password must be between 6 to 30 character";
        }
    }
	return '';
}