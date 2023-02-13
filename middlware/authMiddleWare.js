const customError = require('../errors/customError')
const jwt = require('jsonwebtoken')

const authenticateToken = async (req, res, next)=>{
 const reqHeaders = req.headers.authorization
  if (!reqHeaders){
      throw new customError('token unavailable', 401)
  }
  if (reqHeaders.startsWith("Bearer ")){
  const token = reqHeaders.split(' ')[1]
  //  verify token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  if(decodedToken){
    const {userID, username} = decodedToken
    req.user = {userID, username} // on getting all comments, send this to the front end to customize the page for the user and also for diff requests
   return next()
  }
  }
  throw new customError('token invalid', 401)
}

module.exports = authenticateToken