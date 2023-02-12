const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new  mongoose.Schema({
  username:{type:String, required:[true, 'Please input name'], maxlength:10,unique:true},
  password:{type:String, required:[true, 'Please provide password'],maxlength:12,
},
},
{timestamps: true})

userSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
 this.password =  await bcrypt.hash(this.password, salt)
})
userSchema.methods.createJWT =  async function(){
const token = jwt.sign({userID:this._id, username:this.username},process.env.JWT_SECRET,{expiresIn:'30d'})
return token
}
userSchema.methods.comparePassword = async function(userPasword){
  const isMatch = await bcrypt.compare(userPasword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', userSchema)