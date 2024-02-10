const jwt = require("jsonwebtoken");
const UserModel = require("../schemas/UserSchema");

const secret = "your_jwt_secret"; // Replace with your secret key

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(400).send("Invalid token.");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = authenticate;
