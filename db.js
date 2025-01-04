const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
});

const adminSchema = new schema({
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
});

const courseSchema = new schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    price : {type : Number, required : true},
    imageurl : {type : String, required : true},
    creatorId : {type : schema.Types.ObjectId,required : true, ref : 'admin'}
});

const purchaseSchema = new schema({
    userId : {type : schema.Types.ObjectId, required : true},
    courseId : {type : schema.Types.ObjectId, required : true}
});

const deletedcourseSchema = new schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    price : {type : Number, required : true},
    imageurl : {type : String, required : true},
    deleterId : {type : schema.Types.ObjectId,required : true, ref : 'admin'}
});


const user = mongoose.model('user', userSchema);
const admin = mongoose.model('admin', adminSchema);
const course = mongoose.model('course', courseSchema);
const purchase = mongoose.model('purchase', purchaseSchema);
const deletedcourse = mongoose.model('deletedcourse', deletedcourseSchema);

module.exports = {
    user: user,
    admin: admin,
    course: course,
    purchase: purchase,
    deletedcourse: deletedcourse
};

