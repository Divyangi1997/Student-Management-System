const mongoose = require('mongoose');
const User = require('../models/user');
const Department = require('../models/department');
const passport = require('passport');
const lodash = require('lodash'); 

// user implementation
module.exports.register = (req,res,next) => {
    var user = new User();
    user.name = req.body.name;
    user.rollno = req.body.rollno;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save((err, doc) => {
        if(!err) {
            res.send(doc);
        } else {
            if(err.code == 11000){
                res.status(422).send(['Duplicate Roll Number found. Please change the Roll Number']);
            } else {
                return next(err);
            }
        }
    });
}

// department implementation
module.exports.registerDept = (req,res,next) => {
    var dept = new Department();
    dept.rollno = req.body.rollno;
    dept.department = req.body.department;

    dept.save((err, doc) => {
        if(!err) {
            res.send(doc);
        } 
    });
}

// login implementation
module.exports.authenticate = ( req, res, next ) => {
    passport.authenticate('local', ( err, user, info) => {
        if(err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req,res); 
}

// profile implementation
module.exports.profile = (req, res, next) => {
    User.findOne({_id: req._id},
        (err,user) => {
            if(!user){
                return res.status(404).json({ status: false, message: 'User record not found.'})
            } else {
                return res.status(200).json({ status: true, user: lodash.pick(user, ['name','rollno','username']) 
            });
        }
    })
}