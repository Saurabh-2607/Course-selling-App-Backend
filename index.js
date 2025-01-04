const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const { user } = require('./db')
const { admin } = require('./db')
const { course } = require('./db')
const { purchase } = require('./db')
const { courseRouter } = require('./routes/course')
const { adminRouter } = require('./routes/admin')
const { userRouter } = require('./routes/user')

const app = express();
app.use(express.json());

app.use("/user", userRouter)
app.use("/course", courseRouter)
app.use("/admin", adminRouter)

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("Server running at port 3000");
}

main();
