import jwt from 'jsonwebtoken';
import config from '../config';

export default () => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        return jwt.verify(userToken, config.secret, (err, decoded) => {
            if (err) {
                const { message } = err;
                console.log("error")
                return {
                    error: {
                        status: 401,
                        message
                    }
                }
            } else {
                const { username, role, exp } = decoded;
                switch (role) {
                    case 1:
                        return "Admin";
                    case 2:
                        return "Design";
                    case 3:
                        return "Hr";
                    case 4:
                        return "Fresher";
                    case 5: 
                        return "Candidate";
                    default:
                        return "Candidate"
                }
            }
        })
    } else {
        return {
            error: {
                status: 401,
                message: "No token provided"
            }
        };
    }
}