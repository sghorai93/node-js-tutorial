const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data;
    }
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if(!user || !pwd) {
        return res.status(400)
            .json({'message':'Username & Password are Required.'});
    }

    const foundUser = usersDB.users.find(person => person.username === user);

    if(!foundUser)
        return res.status(401)
            .json({'message':'Unauthorized User.'});

    const authorizedUser = await bcrypt.compare(pwd, foundUser.password);

    if(authorizedUser) {
        const accessToken = jwt.sign(
            { "username" : foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn : '30s' }
        );

        const refreshToken = jwt.sign(
            { "username" : foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn : '1d' }
        );
        
        /**
         * Saving REFRESH_TOKEN with Current User.
         */

        const otherUsers = usersDB.users
            .filter(person => person.username !== foundUser.username);

        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        return res.status(200)
            .json({ accessToken });
    }
    else
        return res.status(401)
            .json({'message':'Invalid Password'});   
}

module.exports = { handleLogin };