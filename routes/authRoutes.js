const express = require('express');
const Router = express.Router()
const {register, login} = require('../controllers/authControls')


Router.post('/login', login)
Router.post('/register', register)



module.exports = Router