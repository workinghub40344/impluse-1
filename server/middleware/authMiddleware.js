const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      // This should technically not be reached if 'protect' middleware is used before this
      return res.status(401).json({ msg: 'Not authorized, user data not found' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: `Forbidden: Your role ('${req.user.role}') does not have permission to access this resource.`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
