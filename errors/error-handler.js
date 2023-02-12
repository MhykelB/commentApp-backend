const customError = require('./customError')
const errorHandler = (err,req,res,next)=>{

  const myCustomError = {
    msg: err.message || 'something went wrong',
    statusCode: err.statusCode || 500
  }
  if (err.code === 11000){
myCustomError.msg = `The username ${err.keyValue.username} is already in use`,
myCustomError.statusCode = 400
  }
  if (err.name === "ValidationError"){
myCustomError.msg = Object.values(err.errors).map((fields)=>fields.message).join(','),
myCustomError.statusCode = 400
  }
  // return res.status(myCustomError.statusCode).json()
  return res.status(myCustomError.statusCode).json(myCustomError.msg)
}
module.exports = errorHandler