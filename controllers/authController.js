const User = require('../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')


module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      const pass = bcrypt.compareSync(password, existUser.password)
      if (!pass) return res.status(401).json('invalid credentials');



      const token = jwt.sign({
        id: existUser._id,
        isAdmin: existUser.isAdmin
      }, 'webtoken')


      return res.status(200).json({
        token,
        id:existUser._id,
        isAdmin: existUser.isAdmin,
        message: 'succesfully login',
        email: existUser.email,
        fullname: existUser.fullname,
        shippingAddress: existUser.shippingAddress
      })

    } else {
      return res.status(401).json('user not found')

    }
  } catch (err) {
    return res.status(400).json(`${err}`)
  }
}

module.exports.userSignUp = async (req, res) => {
  const { fullname, email, password,  } = req.body;
  console.log("req body",req.body)
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(401).json('user already exist')

    } else {
      const hashPassword = bcrypt.hashSync(password, 10);
      await User.create({
        fullname,
        email,
        password: hashPassword
        
      });
      return res.status(201).json('succesfully registered')
    }
  } catch (err) {
    return res.status(400).json(`${err}`)
  }
}