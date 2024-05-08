const { LoginID, JwtSecret, getPassword } = require('../enviroment')
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    
    let LoginKey = getPassword()
    
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JwtSecret);

        if (LoginID === data.LoginID && LoginKey === data.LoginKey) {
            next();
        } else {
            return res.send(400).json({ status: 'Invalid credential' })
        }
    } catch (error) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
}

module.exports = authenticate;