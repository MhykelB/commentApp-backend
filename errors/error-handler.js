// const customError = require('./customError')
const errorHandler = (err,req,res,next)=>{
  const myCustomError = {
    msg: err.message || 'something went wrong',
    statusCode: err.statusCode || 500
  }
  //duplicate error
  if (err.code === 11000){
myCustomError.msg = `The username ${err.keyValue.username} is already in use`,
myCustomError.statusCode = 400
  }
  // validation error
  if (err.name === "ValidationError"){
myCustomError.msg = Object.values(err.errors).map((fields)=>fields.message).join(','),
myCustomError.statusCode = 400
  }
  // cast error (due to wrong mongoose syntax)
  if (err.name === "CastError"){
    myCustomError.msg = `No item found with _id ${err.value}`,
    myCustomError.statusCode = 404
  }
  

  // return res.status(myCustomError.statusCode).json()
  return res.status(myCustomError.statusCode).json(myCustomError.msg)
}
module.exports = errorHandler