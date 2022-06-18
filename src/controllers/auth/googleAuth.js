const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');
const { User } = require('../../models/user.model');

module.exports = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, profilePic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(200);
    res.json({
      _id: user._id,
      first: user.fullName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    const user = await User.create({
      firstName,
      lastName,
      profilePic: profilePic,
      email,
      password,
    });

    if (user) {
      //sending welcome mail
      //   const [data, error] = welcomeMail({ email: user.email, name: user.fullName });
      res.status(201);
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(500);
      throw new Error('Something went wrong, Please try again');
    }
  }
});
