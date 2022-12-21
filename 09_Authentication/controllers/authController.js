const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data;
    }
}

const bcrypt = require('bcrypt');

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

    //TODO: Create JWT
    if(authorizedUser)
        return res.status(200)
            .json({'message': `User ${user} is Logged in Successfully.`});
    else
        return res.status(401)
            .json({'message':'Invalid Password'});   
}

module.exports = { handleLogin };