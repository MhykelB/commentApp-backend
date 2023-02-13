class unauthneticatedError extends customError{
  constructor(message){
    super(message)
    this.statusCode = 401
  }
}
module.exports = unauthneticatedError