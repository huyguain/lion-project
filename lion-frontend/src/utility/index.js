import checkRole from './checkAuth';
import verifyUser from './checkUser';
import verifyCode from './checkCode';
import validate from './validateFileExcel';
export const role = checkRole;
export const checkUser = verifyUser;
export const checkCode = verifyCode;
export const validateFileExcel = validate;