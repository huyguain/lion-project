
export const requireRole = (role) =>  {
    return function (req, res, next) {
        if (req.role && role.indexOf(req.role) !== -1) {
            next();
        } else {
            res.send(403);
        }
    }
}
