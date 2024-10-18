const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true, minlength: 3, maxlength:80},
    email: {type: String, 
            required: true, 
            trim: true, 
            minlength: 5, 
            maxlength: 100, 
            unique: true, 
            index: true, 
            // validate: {validator: (value)=> {
            //      const regex = /¨[A-Za-z0-9._+\-']+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/}}
            },
    password: {type: String}
});

module.exports = mongoose.model("User", userSchema)