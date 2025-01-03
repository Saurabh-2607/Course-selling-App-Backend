const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    _id : schema.Types.ObjectId,
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
});

const adminSchema = new schema({
    _id : schema.Types.ObjectId,
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
});

const courseSchema = new schema({
    _id : schema.Types.ObjectId,
    title : {type : String, required : true},
    description : {type : String, required : true},
    price : {type : Number, required : true},
    imaegurl : {type : String, required : true},
    creatorId : {type : schema.Types.ObjectId, required : true}
});

const purchaseSchema = new schema({
    _id : schema.Types.ObjectId,
    userId : {type : schema.Types.ObjectId, required : true},
    courseId : {type : schema.Types.ObjectId, required : true}
});

const user = mongoose.model('user', userSchema);
const admin = mongoose.model('admin', adminSchema);
const course = mongoose.model('course', courseSchema);
const purchase = mongoose.model('purchase', purchaseSchema);

module.exports = {
    user : user,
    admin : admin,
    course : course,
    purchase : purchase
}
