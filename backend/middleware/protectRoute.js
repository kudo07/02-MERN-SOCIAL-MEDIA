// import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    //res.cookie('jwt', token, {

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');
    // get the id from the payload if the user object exist
    // inside the req object pass the user field
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log('Error in signupUser: ', err.message);
  }
};

export default protectRoute;
