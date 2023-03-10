const mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({ 

    title: {
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Todo', todoSchema)
