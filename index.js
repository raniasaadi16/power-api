const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Message = require('./model');


// INIT
const app = express();
app.use(express.json());
dotenv.config({ path: './.env' });


// DB
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));




app.use(express.json({ limit : '10kb' }));

app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', 'https://www.raniadev.com');
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'X-HTTP-Method-Override', 'X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });



// ROUTES
app.get('/messages', async (req, res) => {
    try{
        const messages = await Message.find()

        return res.status(200).json({
            status: 'succes',
            data: messages
        })
    }catch(err){
        return res.status(400).json({
            status: 'error',
            err
        })
    }
})

app.post('/message', async (req,res) => {
    const {homeStatus, adress, electricBill, electricCompany, creditScore, name, phone, email} = req.body
  try{
      const message = await Message.create({homeStatus, adress, electricBill, electricCompany, creditScore, name, phone, email})
      return res.status(201).json({
          status: 'success',
          data : message
      })
  }catch(err){
      return res.status(400).json({
          status: 'error',
          err
      })
  }
})

app.post('/send-email', async (req, res) => {
    const {homeStatus, adress, electricBill, electricCompany, creditScore, name, phone, email} = req.body
    try{
        await sendEmail({homeStatus, adress, electricBill, electricCompany, creditScore, name, phone, email})
        return res.status(201).json({
            status: 'success',
            message: 'message sent succussfully!'
        })
    }catch(err){
        return res.status(400).json({
            status: 'error',
            err
        })
    }
})


// RUN THE SERVER
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server running on ${port}.....`))

process.on('SIGTERM', () => {
  console.log('SIGTERM recieved');
  server.close(() => {
    console.log('Process terminated')
  })
})

module.exports = app;