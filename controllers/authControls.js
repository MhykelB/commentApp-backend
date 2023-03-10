const  userSchema = require('../models/userSchema')
const customError = require('../errors/customError')
const jwt = require('jsonwebtoken')

const register = async (req, res,)=>{
   userSchema.createIndexes({"username": 1})// takes care of duplicate issues
  let newUser = await userSchema.create(req.body)
  if(!newUser){
    throw (error)
    // probably a duplicate error so check the error type and adjust the error msg
   }
 return res.status(201).json({success:true,msg:'account created'})
}
const login = async (req, res)=>{
  const {username, password} = req.body
  if(!username || !password)
  {throw new customError('Please provide email and password', 400)}
  const user = await userSchema.findOne({username:username})
  if (!user)
   {throw new customError('Unauthorized, invalid credentials', 400)}
  const isPassword = await user.comparePassword(password)
  if (!isPassword)
{throw new customError('Unauthorized, invalid credentials', 400)}
// generate token
// const token = jwt.sign({userID:user._id, username:user.username},process.env.JWT_SECRET,{expiresIn:'30d'})
const token = await user.createJWT()
  res.status(200).json({success:true, token})
}
module.exports = {register, login}
