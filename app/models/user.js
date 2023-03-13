const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema(
    {
        username: String,
        fullname: String,
        avatar: {
            type: String,
            default: 'http://image.com'
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true
        }
    },
    
    {
        versionKey: false,
    }
)

UserScheme.method.validatePassword = function(password){
    if (this.password === password){
        res.send("Login exitoso")
    }
}

module.exports = mongoose.model('user', UserScheme)