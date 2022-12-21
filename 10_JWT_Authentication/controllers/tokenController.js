const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (req, res) => {
    const accessToken = jwt.sign(
        { "username" : "SYSTEM" },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : '300d' }
    );
    
    return res.status(200)
        .json({ accessToken });
}

module.exports = { generateToken };