require('dotenv').config({ path: '.env.local' });
const express = require('express')
const app = express();
const cors = require('cors')
const port = 5001;
const connecToMongoose = require('./db')

app.use(cors())
connecToMongoose();

// 1.> ROUTE -> (a) Starter page backend
app.use('/', require('./routes/default'))

// .> ROUTE -> (a) Send contact data
app.use('/contact/', require('./routes/contact'))

// 3.> ROUTE -> (a) Send testimonial, (b) Activate testimonial data
app.use('/testimonial/', require('./routes/testimonial'))

// 4.> ROUTE -> (a) Login Credential
app.use('/auth/', require('./routes/auth'))

// 5.> export contact data in csv formate
app.use('/export', require('./routes/exportData'))

// 6.> Change Password
app.use('/pass', require('./routes/changepass'))

// 7.> Project section starts here
app.use('/project', require('./routes/project'))

// 8.> Blogs sections starts here
app.use('/blogs', require('./routes/blogs'))

app.listen(port, '0.0.0.0', () => {
    console.log(`The server on at ${port}`);
});