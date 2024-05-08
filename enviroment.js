const fs = require('fs');
const path = require('path');

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

module.exports = { getPassword };
