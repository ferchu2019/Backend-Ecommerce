function isAdmin(req, res, next){
    if(req.user.role !== "admin"){
        return res.status(403).send({message: "usuario no autorizado"})
    }
    next();
}

module.exports = isAdmin