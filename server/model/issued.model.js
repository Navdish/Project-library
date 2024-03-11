const mongoose = require('mongoose');
const  Book  = require('./book.model');
const User  = require('./user.model');

const Issued = mongoose.Schema({
    bookId: {
        type: String,
        require: true,
        ref: Book
    },
    status : {
        type: String,
        enum: ['ISSUED', 'RETURNED'],
        default: 'ISSUED'
    },
    userId : {
        type: String,
        require: true,
        ref : User
    }
}, {timestamps: true})


const IssuedModel =  mongoose.model('issuedmodel', Issued);
module.exports = IssuedModel;