import jwt from 'jsonwebtoken';
import config from '../config';
import  { verifyToken } from '../lib/util';
export const checkToken = async(req, res, next) => {
    const token = req.headers.token;
    if(token){
        await verifyToken(token, (err, decoded) => {
            if(err) {
                const { message } = err;
                return {
                    error: {
                        success: false,
                        message
                    }
                }   
            } else {
                const { code } = decoded;
                req.code = code;
                next();
            }
        })
    } else {
        res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }
}
export const checkTokenRole = (req, res, next) => {
    const userToken = req.headers.usertoken;
    if(userToken){
        return jwt.verify(userToken, config.secret, (err, decoded) => {
            if (err) {
                const { message } = err;
                return {
                    error: {
                        success: false,
                        message
                    }
                }   
            } else {
                let { role } = decoded;
                switch (role) {
                    case 1:
                        role = "Admin";
                        break;
                    case 2:
                        role = "Design";
                        break;
                    case 3:
                        role = "Hr";
                        break;
                    case 4:
                        role = "Fresher";
                    case 5: 
                        role = "Candidate";
                }
                req.role = role;
                next();
            }
        })  
    } else {
        res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }
};


