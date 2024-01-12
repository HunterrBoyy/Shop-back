const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes')
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');
const fileUpload = require('express-fileupload')


mongoose.connect('mongodb+srv://hunterboy:ayush1998@cluster0.fxwwuen.mongodb.net/').then((result) => {

  app.listen(port, () => {
    console.log('listening');
  });
}).catch((err) => {
  console.log(err);
})

app.use('/uploads',express.static('uploads'))
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
  limits:{filesize:5 * 1024 * 1024},
  abortOnLimit: true,
}))

app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes);




// app.get('/', (req, res) => {
//   return res.status(200).json({
//     id: 1,
//     title: 'lio'
//   });
// })



app.use((req, res) => {
  return res.status(404).json('not found');
});