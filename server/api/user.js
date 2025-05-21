const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req,res) =>{
    let { name, email, password } = req.body;
    name = name.trim(); // Removes whitespace
    email = email.trim();
    password = password.trim();
    if(name == " " || email == "" || password == ""){ //Checks for empty fields.
        res.json({
            status: "FAILED",
            message: "Input field is empty!"
        });
    }
    else if(!/^[a-zA-Z ]*$/.test(name)){ // Validates username.
        res.json({
            status: "FAILED",
            message: "Invalid name entry!"
        })
    }
    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){ // Validates email.
        res.json({
            status: "FAILED",
            message: "Invalid email entry!"
        })
    }
    else if (password.length < 8){// Validates password length.
        res.json({
            status: "FAILED",
            message: "Password needs a minimum of 8 characters!"
        })
    }
    else {
        User.find({ email }).then(result =>{
            if(result.length){
                res.json({
                    status: "FAILED",
                    message: "Invalid email, email already exists!"
                })
            }else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword =>{
                    const newUser = new User({
                        name, 
                        email,
                        password: hashedPassword
                    });
                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "Signup successful!",
                            data: result,
                        })
                    }).catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An error occured while trying to save user!"
                        })
                    })
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Error occured while trying to hash password!"
                    })
                })
            }
        }).catch(err =>{
            console.log(err)
            res.json({
                status: "FAILED",
                message: "Error occured while checking for user!"
            })
        })
    }
})