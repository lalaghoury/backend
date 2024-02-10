const jwt = require('jsonwebtoken');
const UserModel = require('../schemas/UserSchema');
require('dotenv').config();

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(400).send("Invalid token.");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = verifyUser;
