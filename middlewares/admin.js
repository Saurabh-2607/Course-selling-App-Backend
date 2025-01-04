const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const verify = jwt.verify(token, process.env.ADMIN_SECRET);

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
    adminMiddleware: adminMiddleware
};