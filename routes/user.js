const { Router } = require('express');
const bcrypt = require('bcrypt');
const {userMiddleware} = require('../middlewares/user');
const jwt = require('jsonwebtoken');
const { user } = require('../db');
const { purchase } = require('../db');
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
                message: 'user created successfully'
            });        
    }
});

userRouter.post('/signin',async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const search = await user.findOne({email: email});
    if(search){
        if(await bcrypt.compare(password, search.password)){
            res.status(200).json({
                token: jwt.sign({email: email}, process.env.USER_SECRET),
                message: 'Login successful'
            });
        }
        else{
            res.status(400).json({
                message: 'incorrect password'
            });
        }
    }
    else{
        res.status(400).json({
            message: 'Email not found please signup'
        });
    }
});

userRouter.get('/purchases',async (req, res) => {
    const email = jwt.decode(req.headers.authorization, process.env.USER_SECRET);
    const userDoc = await user.findOne({ email: email.email });
    const userID = userDoc._id;

    const courses = await purchase.find(
        {userId: userID}
    )

    res.send(
        courses
    );
});

module.exports = {
    userRouter: userRouter
}