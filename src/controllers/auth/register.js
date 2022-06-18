const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');
const { User } = require('../../models/user.model');

module.exports = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('A user already exists with this email.');
  }

  const user = await User.create({
    firstName,
    lastName,
    profilePic:
      'https://res.cloudinary.com/inskillz/image/upload/v1618675741/inskillz/instructor_default_pic.png',

    email,
    password,
  });

  if (user) {
    //sending welcome mail
    const [data, error] = welcomeMail({ email: user.email, name: user.fullName });
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
});
