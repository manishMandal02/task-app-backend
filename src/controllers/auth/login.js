const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');
const { User } = require('../../models/user.model');

module.exports = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('OOPS! You need to register first');
  }

  if (user && (await user.matchPassword(password))) {
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
    res.status(401);
    throw new Error('OOPS! Invalid password.');
  }
});
