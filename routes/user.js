const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../db');
const userRouter = Router();

userRouter.post('/signup',async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const search = await user.findOne({email: email});
    if(search){
        return res.status(400).json({
            message: 'Email already exists'
        });
    }
    else{     
            await user.create({
                email: email,
                password: bcrypt.hashSync(password, 5),
                firstname: firstname,
                lastname: lastname
            });
            res.status(200).json({
                message: 'Admin created successfully'
            });        
    }
});

userRouter.post('/signin', (req, res) => {

});

userRouter.get('/purchases', (req, res) => {

});

module.exports = {
    userRouter: userRouter
}