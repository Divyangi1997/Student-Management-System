const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const db = require('../config/db.config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: 'Name can\'t be empty' 
    },
    rollno: { 
        type: Number, 
        required: 'Roll no can\'t be empty', 
        unique: true 
    },
    username: { 
        type: String, 
        required: 'Username can\'t be empty' 
    },
    password: { 
        type: String, 
        required: 'Password can\'t be empty',
        minlength: [4,'Password must be atleast 4 characters long']
    },
    saltSecret: String
},{
    timestamps: true
});

userSchema.pre('save', function(next){
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Methods
userSchema.methods.verifyPassword = function(password) {
    return bcryptjs.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function() {
    return jwt.sign({_id: this._id}, 
        process.env.JWT_SECRET, 
    {
        expiresIn: process.env.JWT_EXP
    });
}

module.exports = mongoose.model('User', userSchema);