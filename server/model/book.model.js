const mongoose = require('mongoose')

const Book = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    photos: [{
        type: String,
    }],
    amount : {
        type: Number,
        require: true
    }
}, {timestamps: true})


const Books =  mongoose.model('bookmodel', Book);
module.exports = Books;