const { getPassword } = require('../enviroment')
const jwt = require('jsonwebtoken');

const LoginID = process.env.ADMIN_LOGIN
const JwtSecret = process.env.JWT_SECRET

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