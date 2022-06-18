const expressAsyncHandler = require('express-async-handler');
const { User } = require('../../models/user.model');
const { generateToken } = require('../../utils/generateToken');

module.exports = expressAsyncHandler(async (req, res) => {
  const id = req.query.id;
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('A user already exists with this email.');
  }

  const user = await User.findById(id);
  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.password = password || user.password;

    const updatedUser = await user.save();

    res.status(200);
    res.json({
      _id: updatedUser._id,
      first: updatedUser.fullName,
      lastName: updatedUser.lastName,
      profilePic: updatedUser.profilePic,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error(`User doesn't exist.`);
  }
});
