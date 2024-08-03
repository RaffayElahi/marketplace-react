const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user.roles) return res.sendStatus(401);
        const rolesArray = req.user.roles;
        const result = allowedRoles === rolesArray ;
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles