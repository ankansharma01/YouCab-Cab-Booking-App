const blackListToken_model = require('../Models/blacklistToken_model')
const jwt = require("jsonwebtoken");
const user_model = require('../Models/user_model')
const captain_model = require('../Models/captain_model')

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Authorization failed" });
  }
  const isBlacklisted  = await blackListToken_model.findOne({ token: token });
  if (isBlacklisted) {
    res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await user_model.findById(decoded._id);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  const isBlacklisted = await blackListToken_model.findOne({ token: token });



  if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const captain = await captain_model.findById(decoded._id)
      req.captain = captain;

      return next()
  } catch (err) {
      console.log(err);

      res.status(401).json({ message: 'Unauthorized' });
  }
}
