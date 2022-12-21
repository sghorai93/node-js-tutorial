const jwt = require('jsonwebtoken');
require('dotenv').config();
const { logError } = require('./errorHandler'); 

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if(!authHeader)
        return res.status(401)
            .json({"message": "Unauthorized User"});

    console.log(authHeader);
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) {
                logError(err);
                return res.status(403)
                    .json({"message": "Invalid / Expired Token"});
            }
            req.user = decoded.username;
            next();
        }
    );
};

module.exports = verifyJWT ;