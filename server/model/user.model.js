const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['STUDENT', 'LIBRANIAN'],
        default: 'STUDENT'
    }
}, {timestamps: true})


const Users =  mongoose.model('usermodel', User);
module.exports = Users;