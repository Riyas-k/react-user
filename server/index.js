const express = require('express');
const {db} = require('./models/connection.js')
const bodyParser = require('body-parser');
const cors = require('cors');   
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); 
app.use(cookieParser());

const userRouter = require('./routes/user.js');
const adminRouter = require('./routes/admin.js');

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});