// backend/src/components/middleware/adminMiddleware.js
module.exports = (req, res, next) => {
  // Assumes authMiddleware has already set req.user
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Access forbidden: Admins only' });
  }
};
