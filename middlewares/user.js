const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const verify = jwt.verify(token, process.env.USER_SECRET);

  if (verify) {
    req.userID = verify.email;
    next();
  }else {
        res.status(401).json({
        message: 'Unauthorized'
    });
  }
}

module.exports = {
    userMiddleware: userMiddleware
};