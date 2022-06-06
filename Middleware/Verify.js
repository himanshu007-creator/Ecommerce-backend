const jwt = require("jsonwebtoken")


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_TKN, (err, user) => {
            if (err) res.status(404).json("invalid token");
            else {
                req.user = user;
            }
            next();
        })
    } else {
        return res.status(404).json("UnAuthenticated");
    }
}
module.exports = verifyToken;