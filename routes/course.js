const { Router } = require('express');
const courseRouter = Router();


courseRouter.post('/purchase', (req, res) => {
    const course = req.body.course;
    const user = req.body.user;
    res.json({ success: true });
}
);

courseRouter.get('/preview', (req, res) => {
    const course = req.query.course;
    res.json({ success: true });
});

module.exports = {
    courseRouter: courseRouter
}
