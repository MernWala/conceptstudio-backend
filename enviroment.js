const fs = require('fs');
const path = require('path');

const URI = "mongodb+srv://srconceptstudio:HG1i0hbd3lbGWAaW@cluster0.z9zfcz3.mongodb.net/?retryWrites=true&w=majority";
const JwtSecret = "hulkIsGreat@2003$2073";
const LoginID = "admin@conceptstudio.com";

const getPassword = () => {
  try {
    const filePath = path.join(__dirname, 'routes', 'key.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    if (jsonData && jsonData.password) {
      return jsonData.password;
    } else {
      throw new Error('Server Error');
    }
  } catch (err) {
    throw err;
  }
};

module.exports = { URI, JwtSecret, LoginID, getPassword };
