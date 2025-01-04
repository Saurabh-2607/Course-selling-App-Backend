const { Router } = require('express');
const { admin } = require('../db');
const { course } = require('../db');
const { deletedcourse } = require('../db');
const jwt = require('jsonwebtoken');
const { adminMiddleware } = require('../middlewares/admin');
const adminRouter = Router();
const bcrypt = require('bcrypt');

// admin signup
adminRouter.post('/signup',adminMiddleware, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const search = await admin.findOne({email: email});
    if(search){
        return res.status(400).json({
            message: 'Email already exists'
        });
    }
    else{     
            await admin.create({
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

//admin signin
adminRouter.post('/signin',adminMiddleware, async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    
    const search = await admin.findOne({email: email});
    if(search){
        if(await bcrypt.compare(password, search.password)){
            res.status(200).json({
                token: jwt.sign({email: email}, process.env.ADMIN_SECRET),
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

//to create a course
adminRouter.post('/course',adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageurl = req.body.imageurl;
    const email = jwt.decode(req.headers.authorization, process.env.ADMIN_SECRET);
    const adminDoc = await admin.findOne({ email: email.email });
    const creatorId = adminDoc._id;

    const searchC = await course.findOne({ title: title });
    if (searchC) {
        return res.status(400).json({
            message: 'Course already exists'
        });
    }

    try {
        const create_course = await course.create({
            title: title,
            description: description,
            price: price,
            imageurl: imageurl,
            creatorId: creatorId
        });

        res.status(200).json({
            courseId : create_course._id,
            message: 'Course created successfully'
        });

    } catch (err) {
        res.status(400).json({
            message: 'Error finding admin',
            error: err.message
        });
    }
});

//to update a course
adminRouter.put('/course',adminMiddleware, async (req, res) => {
    const courseId = req.body.courseId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageurl = req.body.imageurl;
    const email = jwt.decode(req.headers.authorization, process.env.ADMIN_SECRET);
    const adminDoc = await admin.findOne({ email: email.email });
    const creatorId = adminDoc._id;

    const searchC = await course.findOne({ _id: courseId });
    if (searchC) {
        try {
            const updateResult = await course.updateOne({ _id: courseId }, {
                title: title,
                description: description,
                price: price,
                imageurl: imageurl,
                creatorId: creatorId
            });
            res.status(200).json({
                message: 'Course updated successfully',
                result: updateResult
            });
        } catch (err) {
            res.status(400).json({
                message: 'Error updating course',
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            message: 'Course not found'
        });
    }
});

//to delete a course and put it in another collection
adminRouter.delete('/course', adminMiddleware, async (req, res) => {
    const courseId = req.body.courseId;
    const email = jwt.decode(req.headers.authorization, process.env.ADMIN_SECRET);
    const adminDoc = await admin.findOne({ email: email.email });
    
    if (!adminDoc) {
        return res.status(400).json({
            message: 'Admin not found'
        });
    }

    const creatorId = adminDoc._id;

    const searchC = await course.findOne({ _id: courseId });
    if (searchC) {
        try {
            // Copy course to deletedcourses collection
            const copyCourse = await deletedcourse.create({
                title: searchC.title,
                description: searchC.description,
                price: searchC.price,
                imageurl: searchC.imageurl,
                deleterId: creatorId
            });

            await course.deleteOne({ _id: courseId });

            res.status(200).json({
                message: 'Course deleted successfully',
                result: copyCourse
            });
        } catch (err) {
            res.status(400).json({
                message: 'Error deleting course',
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            message: 'Course not found'
        });
    }
});

//to get all courses
adminRouter.get('/course/bulk',adminMiddleware, async (req, res) => {
    const email = jwt.decode(req.headers.authorization, process.env.ADMIN_SECRET);
    const adminDoc = await admin.findOne({ email: email.email });
    const creatorId = adminDoc._id;

    const courses = await course.find(
        {creatorId: creatorId}
    )

    res.send(
        courses
    );
});


module.exports = {
    adminRouter: adminRouter
}
